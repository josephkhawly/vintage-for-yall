import ProductCard from '@/components/ProductCard'
import { defaultSort, sorting } from '@/lib/constants'
import { getCollection, getCollectionProducts } from '@/lib/shopify'
import { Product } from '@/lib/shopify/types'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>
}): Promise<Metadata> {
  const params = await props.params
  const collection = await getCollection(params.collection)

  if (!collection) return notFound()

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`,
  }
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sort } = searchParams as { [key: string]: string }
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort
  const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse })

  return (
    <section>
      {products.length === 0 ? (
        <p className='py-3 text-lg'>{`No products found in this collection`}</p>
      ) : (
        <div>
          <ul className='grid grid-flow-row gap-4 md:gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {products.map((product: Product) => (
              <ProductCard key={product.handle} product={product} />
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
