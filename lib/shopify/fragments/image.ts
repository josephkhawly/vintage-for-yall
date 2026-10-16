const mediaFragment = /* GraphQL */ `
  fragment mediaFieldsByType on Media {
    ... on MediaImage {
      image {
        altText
        height
        url
        width
      }
    }
    ... on Video {
      sources {
        format
        height
        mimeType
        url
        width
      }
    }
  }
`

export default mediaFragment
