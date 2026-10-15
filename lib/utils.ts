import { ReadonlyURLSearchParams } from 'next/navigation'
import { Product } from './shopify/types'

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString()
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`

  return `${pathname}${queryString}`
}

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`

export const validateEnvironmentVariables = () => {
  const storeDomain = process.env.PUBLIC_STORE_DOMAIN ?? process.env.SHOPIFY_STORE_DOMAIN
  const storefrontToken =
    process.env.PUBLIC_STOREFRONT_API_TOKEN ??
    process.env.PRIVATE_STOREFRONT_API_TOKEN ??
    process.env.SHOPIFY_PUBLIC_ACCESS_TOKEN

  const missingEnvironmentVariables = [] as string[]

  if (!storeDomain) {
    missingEnvironmentVariables.push('PUBLIC_STORE_DOMAIN (or SHOPIFY_STORE_DOMAIN)')
  }

  if (!storefrontToken) {
    missingEnvironmentVariables.push(
      'PUBLIC_STOREFRONT_API_TOKEN / PRIVATE_STOREFRONT_API_TOKEN (or SHOPIFY_PUBLIC_ACCESS_TOKEN)',
    )
  }

  if (missingEnvironmentVariables.length) {
    throw new Error(
      `The following environment variables are missing. Your site will not work without them. Read more: https://vercel.com/docs/integrations/shopify#configure-environment-variables\n\n${missingEnvironmentVariables.join(
        '\n',
      )}\n`,
    )
  }

  if (storeDomain?.includes('[') || storeDomain?.includes(']')) {
    throw new Error(
      'Your store domain environment variable includes brackets (ie. `[` and / or `]`). Your site will not work with them there. Please remove them.',
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
