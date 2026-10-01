import type { Metadata } from 'next'
import { getProducts } from '@/lib/shopify'
import { defaultSort } from '@/lib/constants'
import { Product } from '@/lib/shopify/types'
import ProductCard from '@/components/ProductCard'

export const metadata: Metadata = {
  title: "Shop | Ugly Cry Vintage",
  description: '',
}

export default async function Shop() {
  const { sortKey, reverse } = defaultSort
  const products = await getProducts({ sortKey, reverse })

  return (
    <>
      <h1 className='mb-8 pt-16 text-center text-4xl sm:pt-24 sm:text-6xl'>Shop</h1>
      <div>
        <ul className='grid grid-flow-row grid-cols-2 gap-x-0 gap-y-4 md:grid-cols-3 lg:grid-cols-4'>
          {products.map((product: Product) => (
            <ProductCard key={product.handle} product={product} />
          ))}
        </ul>
      </div>
    </>
  )
}
