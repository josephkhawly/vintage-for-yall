import { gql } from '@shopify/hydrogen'

export type ProductColor = {
  hex: string | null
  label: string
}

export type ShopifyCategoryMetafield = {
  references?: {
    nodes: Array<{
      fields: Array<{
        key: string
        value: string
      }>
    } | null>
  } | null
} | null

export const categoryAttributesFragment = gql(`
  fragment categoryAttributes on Product {
    color: metafield(namespace: "shopify", key: "color-pattern") {
      references(first: 10) {
        nodes {
          ... on Metaobject {
            fields {
              key
              value
            }
          }
        }
      }
    }
    size: metafield(namespace: "shopify", key: "size") {
      references(first: 10) {
        nodes {
          ... on Metaobject {
            fields {
              key
              value
            }
          }
        }
      }
    }
  }
`)

function fieldMap(fields: Array<{ key: string; value: string }>) {
  return Object.fromEntries(fields.map((field) => [field.key, field.value]))
}

function metaobjectFields(metafield?: ShopifyCategoryMetafield) {
  return (metafield?.references?.nodes ?? []).flatMap((node) =>
    node ? [fieldMap(node.fields)] : [],
  )
}

export function reshapeColors(metafield?: ShopifyCategoryMetafield): ProductColor[] {
  return metaobjectFields(metafield).flatMap((fields) => {
    const label = fields.label?.trim()
    if (!label) return []
    return [{ hex: fields.color?.trim() || null, label }]
  })
}

export function reshapeSizes(metafield?: ShopifyCategoryMetafield): string[] {
  return metaobjectFields(metafield).flatMap((fields) => {
    const label = fields.label?.trim()
    return label ? [label] : []
  })
}
