import { gql } from '@shopify/hydrogen'

import { productFragment } from '../fragments/product'

export const getProductQuery = gql(
  `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
      condition: metafield(namespace: "custom", key: "condition") {
        value
      }
      materials: metafield(namespace: "custom", key: "materials") {
        value
      }
      measurements: metafield(namespace: "custom", key: "measurements") {
        value
      }
      notes: metafield(namespace: "custom", key: "notes") {
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
