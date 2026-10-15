import { gql } from '@shopify/hydrogen'

import { productFragment } from '../fragments/product'

export const getProductQuery = gql(
  `
  query getProduct($handle: String!, $identifiers: [HasMetafieldsIdentifier!]!) {
    product(handle: $handle) {
      ...product
      metafields(identifiers: $identifiers) {
        key
        value
      }
    }
  }
`,
  [productFragment],
)

export const getProductsQuery = gql(
  `
  query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
    products(sortKey: $sortKey, reverse: $reverse, first: 250, query: $query) {
      edges {
        node {
          ...product
        }
      }
    }
  }
`,
  [productFragment],
)

export const getProductRecommendationsQuery = gql(
  `
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
`,
  [productFragment],
)
