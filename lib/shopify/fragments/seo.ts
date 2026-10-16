import { gql } from '@shopify/hydrogen'

export const seoFragment = gql(`
  fragment seo on SEO {
    description
    title
  }
`)
