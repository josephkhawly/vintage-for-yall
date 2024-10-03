import Image from 'next/image'
import Link from 'next/link'
import Price from './Price'
import { Product } from '@/lib/shopify/types'

export default function ProductCard({ product }: { product: Product }) {
  const { title, handle, featuredImage, priceRange, availableForSale } = product
  return (
    <li>
      <Link className='flex flex-col items-center justify-between' href={`/shop/${handle}`}>
        <div className='relative mb-4 w-full' style={{ aspectRatio: '3/4' }}>
          <Image
            alt={title}
            src={featuredImage.url}
            fill
            className='rounded-md'
          />
          {!availableForSale && (
            <div className='absolute top-0 right-0 bg-white bg-opacity-50 text-black text-lg p-1 w-full h-full flex items-center justify-center'>
              <span className='p-3 rounded-full bg-burnt-orange text-white'>Sold Out</span>
            </div>
          )}
        </div>
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
