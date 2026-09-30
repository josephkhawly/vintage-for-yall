import { ReadonlyURLSearchParams } from 'next/navigation'
import { Product } from './shopify/types'

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString()
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`

  return `${pathname}${queryString}`
}

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`

/**
 * Core storefront vars (validated at boot).
 * Newsletter signup additionally needs (see `.env.example`):
 * - SHOPIFY_ADMIN_ACCESS_TOKEN — Admin API token with `write_customers` /
 *   customer email marketing consent permissions
 * - NEWSLETTER_CONFIRM_SECRET — dedicated HMAC secret for confirm tokens
 *   (do not reuse SHOPIFY_REVALIDATION_SECRET)
 * - RESEND_API_KEY — confirmation email delivery
 * - NEXT_PUBLIC_SITE_URL — public site origin used in confirmation links
 * - RESEND_FROM_EMAIL — optional From override
 */
export const validateEnvironmentVariables = () => {
  const requiredEnvironmentVariables = ['SHOPIFY_STORE_DOMAIN', 'SHOPIFY_PUBLIC_ACCESS_TOKEN']
  const missingEnvironmentVariables = [] as string[]

  requiredEnvironmentVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingEnvironmentVariables.push(envVar)
    }
  })

  if (missingEnvironmentVariables.length) {
    throw new Error(
      `The following environment variables are missing. Your site will not work without them. Read more: https://vercel.com/docs/integrations/shopify#configure-environment-variables\n\n${missingEnvironmentVariables.join(
        '\n',
      )}\n`,
    )
  }

  if (
    process.env.SHOPIFY_STORE_DOMAIN?.includes('[') ||
    process.env.SHOPIFY_STORE_DOMAIN?.includes(']')
  ) {
    throw new Error(
      'Your `SHOPIFY_STORE_DOMAIN` environment variable includes brackets (ie. `[` and / or `]`). Your site will not work with them there. Please remove them.',
    )
  }
}

/**
 * Sorts products so that sold-out ones appear last
 */
export function sortProductsByAvailability(products: Product[]): Product[] {
  return [...products].sort((a, b) => {
    if (a.availableForSale && !b.availableForSale) return -1
    if (!a.availableForSale && b.availableForSale) return 1
    return 0
  })
}
