import { getCollectionProducts, getProducts } from '@/lib/shopify'
import { defaultSort } from '@/lib/constants'
import { Product } from '@/lib/shopify/types'
import ProductCard from '@/components/ProductCard'

export default async function Home() {
  const { sortKey, reverse } = defaultSort
  const products = await getCollectionProducts({ collection: 'new-arrivals', sortKey, reverse })

  return (
    <>
      <h1 className='text-4xl sm:text-6xl mb-8'>New Arrivals</h1>
      <div>
        <ul className='grid grid-flow-row gap-4 md:gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {products.map((product: Product) => (
            <ProductCard key={product.handle} product={product} />
          ))}
        </ul>
      </div>
    </>
  )
}
