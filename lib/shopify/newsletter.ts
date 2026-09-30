import { ensureStartsWith } from '../utils'

const ADMIN_API_VERSION = '2024-07'

const CUSTOMER_CREATE_MUTATION = /* GraphQL */ `
  mutation customerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`

const CUSTOMER_BY_EMAIL_QUERY = /* GraphQL */ `
  query customerByEmail($query: String!) {
    customers(first: 1, query: $query) {
      edges {
        node {
          id
          email
          emailMarketingConsent {
            marketingState
          }
        }
      }
    }
  }
`

const CUSTOMER_BY_ID_QUERY = /* GraphQL */ `
  query customerById($id: ID!) {
    customer(id: $id) {
      id
      email
      emailMarketingConsent {
        marketingState
      }
    }
  }
`

const CUSTOMER_EMAIL_MARKETING_CONSENT_UPDATE = /* GraphQL */ `
  mutation customerEmailMarketingConsentUpdate(
    $input: CustomerEmailMarketingConsentUpdateInput!
  ) {
    customerEmailMarketingConsentUpdate(input: $input) {
      customer {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`

type AdminGraphqlResponse<T> = {
  data?: T
  errors?: Array<{ message: string }>
}

type CustomerCreateData = {
  customerCreate: {
    customer: { id: string } | null
    userErrors: Array<{ field: string[] | null; message: string }>
  }
}

type CustomerNode = {
  id: string
  email: string | null
  emailMarketingConsent: { marketingState: string } | null
}

type CustomerByEmailData = {
  customers: {
    edges: Array<{
      node: CustomerNode
    }>
  }
}

type CustomerByIdData = {
  customer: CustomerNode | null
}

type ConsentUpdateData = {
  customerEmailMarketingConsentUpdate: {
    customer: { id: string } | null
    userErrors: Array<{ field: string[] | null; message: string }>
  }
}

export type NewsletterSubscribeResult =
  | { status: 'already_subscribed'; customerId: string }
  | { status: 'confirmation_required'; customerId: string }

export type NewsletterConfirmResult =
  | 'confirmed'
  | 'already_subscribed'
  | 'rejected'

const pendingConsent = {
  marketingState: 'PENDING' as const,
  marketingOptInLevel: 'CONFIRMED_OPT_IN' as const,
}

const subscribedConsent = {
  marketingState: 'SUBSCRIBED' as const,
  marketingOptInLevel: 'CONFIRMED_OPT_IN' as const,
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function escapeShopifySearchPhrase(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

function getAdminEndpoint(): string {
  const domain = process.env.SHOPIFY_STORE_DOMAIN
  if (!domain) {
    throw new Error('Newsletter signup is not configured')
  }

  const base = ensureStartsWith(domain, 'https://')
  return `${base}/admin/api/${ADMIN_API_VERSION}/graphql.json`
}

async function adminFetch<T>({
  query,
  variables,
}: {
  query: string
  variables?: Record<string, unknown>
}): Promise<T> {
  const accessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN
  if (!accessToken) {
    throw new Error('Newsletter signup is not configured')
  }

  const response = await fetch(getAdminEndpoint(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  })

  const body = (await response.json()) as AdminGraphqlResponse<T>

  if (!response.ok) {
    console.error('Shopify Admin API HTTP error:', response.status, body)
    throw new Error('Failed to subscribe to newsletter')
  }

  if (body.errors?.length) {
    console.error('Shopify Admin API GraphQL errors:', body.errors)
    throw new Error('Failed to subscribe to newsletter')
  }

  if (!body.data) {
    throw new Error('Failed to subscribe to newsletter')
  }

  return body.data
}

function isEmailTakenError(message: string): boolean {
  const lower = message.toLowerCase()
  return lower.includes('email') && (lower.includes('taken') || lower.includes('already'))
}

function emailsMatch(a: string | null | undefined, b: string): boolean {
  if (!a) return false
  return normalizeEmail(a) === normalizeEmail(b)
}

async function findCustomerByEmail(email: string) {
  const normalized = normalizeEmail(email)
  const lookup = await adminFetch<CustomerByEmailData>({
    query: CUSTOMER_BY_EMAIL_QUERY,
    variables: {
      query: `email:"${escapeShopifySearchPhrase(normalized)}"`,
    },
  })

  const customer = lookup.customers.edges[0]?.node ?? null
  if (!customer || !emailsMatch(customer.email, normalized)) {
    return null
  }

  return customer
}

async function getCustomerById(customerId: string) {
  const lookup = await adminFetch<CustomerByIdData>({
    query: CUSTOMER_BY_ID_QUERY,
    variables: { id: customerId },
  })

  return lookup.customer
}

async function setCustomerConsent(
  customerId: string,
  emailMarketingConsent: typeof pendingConsent | typeof subscribedConsent,
) {
  const update = await adminFetch<ConsentUpdateData>({
    query: CUSTOMER_EMAIL_MARKETING_CONSENT_UPDATE,
    variables: {
      input: {
        customerId,
        emailMarketingConsent,
      },
    },
  })

  const { customer, userErrors } = update.customerEmailMarketingConsentUpdate
  if (userErrors.length > 0 || !customer) {
    console.error('Shopify consent update errors:', userErrors)
    throw new Error('Failed to subscribe to newsletter')
  }
}

async function prepareExistingCustomer(
  email: string,
): Promise<NewsletterSubscribeResult> {
  const customer = await findCustomerByEmail(email)
  if (!customer) {
    throw new Error('Failed to subscribe to newsletter')
  }

  if (customer.emailMarketingConsent?.marketingState === 'SUBSCRIBED') {
    return { status: 'already_subscribed', customerId: customer.id }
  }

  if (customer.emailMarketingConsent?.marketingState !== 'PENDING') {
    await setCustomerConsent(customer.id, pendingConsent)
  }

  return { status: 'confirmation_required', customerId: customer.id }
}

export async function subscribeEmailToNewsletter(
  email: string,
): Promise<NewsletterSubscribeResult> {
  const create = await adminFetch<CustomerCreateData>({
    query: CUSTOMER_CREATE_MUTATION,
    variables: {
      input: {
        email: normalizeEmail(email),
        emailMarketingConsent: pendingConsent,
      },
    },
  })

  const { customer, userErrors } = create.customerCreate

  if (customer && userErrors.length === 0) {
    return { status: 'confirmation_required', customerId: customer.id }
  }

  if (userErrors.some((error) => isEmailTakenError(error.message))) {
    return prepareExistingCustomer(email)
  }

  console.error('Shopify customerCreate errors:', userErrors)
  throw new Error('Failed to subscribe to newsletter')
}

export async function confirmEmailMarketingSubscription(
  customerId: string,
  email: string,
): Promise<NewsletterConfirmResult> {
  const customer = await getCustomerById(customerId)
  if (!customer || !emailsMatch(customer.email, email)) {
    return 'rejected'
  }

  const state = customer.emailMarketingConsent?.marketingState
  if (state === 'SUBSCRIBED') {
    return 'already_subscribed'
  }

  // Only complete double opt-in from PENDING. Refuse UNSUBSCRIBED / other
  // states so an old confirmation link cannot restore withdrawn consent.
  if (state !== 'PENDING') {
    return 'rejected'
  }

  await setCustomerConsent(customerId, subscribedConsent)
  return 'confirmed'
}
