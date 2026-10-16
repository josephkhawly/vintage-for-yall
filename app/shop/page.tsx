import type { Metadata } from 'next'

import { ProductListing, resolveSort } from '@/components/ProductListing'
import { parsePlpFilters } from '@/lib/plp-filters'
import { getPlpListing } from '@/lib/shopify'

export const metadata: Metadata = {
  description: '',
  title: 'Shop | Ugly Cry Vintage',
}

export default async function Shop(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = (await props.searchParams) ?? {}
  const sortParam = typeof searchParams.sort === 'string' ? searchParams.sort : undefined
  const { reverse, sortKey } = resolveSort(sortParam)
  const filters = parsePlpFilters(searchParams)
  const { facets, products } = await getPlpListing({ filters, reverse, sortKey })

  return (
    <ProductListing
      actionPath='/shop'
      facets={facets}
      filters={filters}
      products={products}
      sort={sortParam ?? null}
      title='Everything'
    />
  )
}
