type ProductDetailMetafield = {
  key: string
  namespace: string
  title: string
}

export const PRODUCT_DETAIL_METAFIELDS: ProductDetailMetafield[] = [
  { key: 'materials', namespace: 'custom', title: 'Materials' },
  { key: 'measurements', namespace: 'custom', title: 'Measurements' },
  { key: 'condition', namespace: 'custom', title: 'Condition' },
  { key: 'notes', namespace: 'custom', title: "Ariel's Notes" },
]

export const PRODUCT_DETAIL_METAFIELD_IDENTIFIERS = PRODUCT_DETAIL_METAFIELDS.map(
  ({ key, namespace }) => ({ key, namespace }),
)
