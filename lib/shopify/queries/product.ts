import { gql } from '@shopify/hydrogen'

import { categoryAttributesFragment } from '../category-attributes'
import { productFragment } from '../fragments/product'

export const getProductQuery = gql(
  `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
      ...categoryAttributes
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
  [categoryAttributesFragment, productFragment],
)

export const getProductsQuery = gql(
  `
  query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
    products(sortKey: $sortKey, reverse: $reverse, first: 100, query: $query) {
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
