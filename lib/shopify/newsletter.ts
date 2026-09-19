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
          emailMarketingConsent {
            marketingState
          }
        }
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

type CustomerByEmailData = {
  customers: {
    edges: Array<{
      node: {
        id: string
        emailMarketingConsent: { marketingState: string } | null
      }
    }>
  }
}

type ConsentUpdateData = {
  customerEmailMarketingConsentUpdate: {
    customer: { id: string } | null
    userErrors: Array<{ field: string[] | null; message: string }>
  }
}

const emailMarketingConsent = {
  marketingState: 'SUBSCRIBED' as const,
  marketingOptInLevel: 'SINGLE_OPT_IN' as const,
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
  return (
    lower.includes('email') &&
    (lower.includes('taken') ||
      lower.includes('already') ||
      lower.includes('has already been taken'))
  )
}

async function updateExistingCustomerConsent(email: string): Promise<void> {
  const lookup = await adminFetch<CustomerByEmailData>({
    query: CUSTOMER_BY_EMAIL_QUERY,
    variables: { query: `email:${email}` },
  })

  const customer = lookup.customers.edges[0]?.node
  if (!customer) {
    throw new Error('Failed to subscribe to newsletter')
  }

  if (customer.emailMarketingConsent?.marketingState === 'SUBSCRIBED') {
    return
  }

  const update = await adminFetch<ConsentUpdateData>({
    query: CUSTOMER_EMAIL_MARKETING_CONSENT_UPDATE,
    variables: {
      input: {
        customerId: customer.id,
        emailMarketingConsent,
      },
    },
  })

  const { userErrors } = update.customerEmailMarketingConsentUpdate
  if (userErrors.length > 0) {
    console.error('Shopify consent update errors:', userErrors)
    throw new Error('Failed to subscribe to newsletter')
  }
}

export async function subscribeEmailToNewsletter(email: string): Promise<void> {
  const create = await adminFetch<CustomerCreateData>({
    query: CUSTOMER_CREATE_MUTATION,
    variables: {
      input: {
        email,
        emailMarketingConsent,
      },
    },
  })

  const { customer, userErrors } = create.customerCreate

  if (customer && userErrors.length === 0) {
    return
  }

  if (userErrors.some((error) => isEmailTakenError(error.message))) {
    await updateExistingCustomerConsent(email)
    return
  }

  if (userErrors.length > 0) {
    console.error('Shopify customerCreate errors:', userErrors)
    throw new Error('Failed to subscribe to newsletter')
  }

  throw new Error('Failed to subscribe to newsletter')
}
