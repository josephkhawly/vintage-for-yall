import Image from 'next/image'
import Link from 'next/link'
import Price from './Price'
import { Product } from '@/lib/shopify/types'

export default function ProductCard({ product }: { product: Product }) {
  const { title, handle, featuredImage, priceRange, availableForSale } = product
  return (
    <li>
      <Link className='flex flex-col items-start' href={`/product/${handle}`}>
        <div className='relative mb-2 w-full' style={{ aspectRatio: '3/4' }}>
          <Image
            alt={title}
            src={featuredImage.url}
            fill
            sizes='(max-width: 768px) 100vw, 50vw'
            className='object-cover'
          />
          {!availableForSale && (
            <div className='absolute top-0 right-0 bg-white/50 text-lg p-1 w-full h-full flex items-center justify-center'>
              <span className='p-3 rounded-full bg-sandy-clay text-white'>Sold Out</span>
            </div>
          )}
        </div>
        <p className='mb-1 px-2 text-left text-sm'>{title}</p>
        <Price
          amount={priceRange?.minVariantPrice.amount}
          currencyCode={priceRange?.minVariantPrice.currencyCode}
          className='px-2 text-sm font-semibold'
        />
      </Link>
    </li>
  )
}
