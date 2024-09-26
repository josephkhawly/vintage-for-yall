const mediaFragment = /* GraphQL */ `
  fragment mediaFieldsByType on Media {
    ... on MediaImage {
      image {
        url
      }
    }
    ... on Video {
      sources {
        url
        mimeType
        format
        height
        width
      }
    }
  }
`

export default mediaFragment
