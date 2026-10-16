import { gql } from '@shopify/hydrogen'

import { categoryAttributesFragment } from '../category-attributes'
import { mediaFragment } from './image'
import { seoFragment } from './seo'

export const productFragment = gql(
  `
  fragment product on Product {
    id
    handle
    title
    description
    descriptionHtml
    availableForSale
    productType
    ...categoryAttributes
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      url
      altText
      width
      height
    }
    media(first: 10) {
      edges {
        node {
          alt
          ...mediaFieldsByType
        }
      }
    }
    seo {
      ...seo
    }
    tags
    updatedAt
  }
`,
  [categoryAttributesFragment, mediaFragment, seoFragment],
)
