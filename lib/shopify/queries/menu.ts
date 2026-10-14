import { gql } from '@shopify/hydrogen'

export const getMenuQuery = gql(`
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        title
        type
        url
      }
    }
  }
`)
