import mediaFragment from './image'
import seoFragment from './seo'

const productFragment = /* GraphQL */ `
  fragment product on Product {
    id
    handle
    title
    description
    descriptionHtml
    availableForSale
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
    variants(first: 2) {
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
  ${mediaFragment}
  ${seoFragment}
`

export default productFragment
