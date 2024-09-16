import Image from 'next/image'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getProducts } from '@/lib/shopify'
import { defaultSort } from '@/lib/constants'
import { Product } from '@/lib/shopify/types'
import Price from '@/components/Price'

export const metadata: Metadata = {
  title: "Shop | Vintage for Y'all",
  description: '',
}

function ProductCard({ product }: { product: Product }) {
  const { title, handle, featuredImage, priceRange } = product
  return (
    <li className='aspect-square'>
      <Link
        prefetch={true}
        className='flex flex-col items-center justify-between'
        href={`/shop/${handle}`}
      >
        <Image
          alt={title}
          src={featuredImage?.url}
          width={353}
          height={353}
          className='mb-4 w-full'
        />
        <p className='mb-2 text-center'>{title}</p>
        <Price
          amount={priceRange?.minVariantPrice.amount}
          currencyCode={priceRange?.minVariantPrice.currencyCode}
          className='font-semibold'
        />
      </Link>
    </li>
  )
}

export default async function Shop() {
  const { sortKey, reverse } = defaultSort
  const products = await getProducts({ sortKey, reverse })

  return (
    <>
      <h1 className='text-4xl sm:text-6xl mb-8'>Shop</h1>
      <div>
        <ul className='grid grid-flow-row gap-4 md:gap-10 grid-cols-2 lg:grid-cols-3'>
          {products.map((product: Product) => (
            <ProductCard key={product.handle} product={product} />
          ))}
        </ul>
      </div>
    </>
  )
}
