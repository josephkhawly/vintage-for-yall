import 'server-only'

import { createCartServerHandlers, gql } from '@shopify/hydrogen'

import { categoryAttributesFragment } from './shopify/category-attributes'

const cartFragment = gql(
  `
  fragment CartFragment on Cart {
    lines(first: 250) {
      nodes {
        merchandise {
          ... on ProductVariant {
            product {
              ...categoryAttributes
            }
          }
        }
      }
    }
  }
`,
  [categoryAttributesFragment],
)

export const cartHandlers = createCartServerHandlers({ fragment: cartFragment })
