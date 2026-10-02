import Image from 'next/image'
import Link from 'next/link'
import Price from './Price'
import { Product } from '@/lib/shopify/types'

export default function ProductCard({ product }: { product: Product }) {
  const { availableForSale, featuredImage, handle, images, priceRange, title } = product
  const hoverImage = images.find((image) => image?.url && image.url !== featuredImage.url)

  return (
    <li>
      <Link className='flex flex-col items-start' href={`/product/${handle}`}>
        <div className='group relative mb-2 w-full' style={{ aspectRatio: '3/4' }}>
          <Image
            alt={title}
            src={featuredImage.url}
            fill
            sizes='(max-width: 768px) 100vw, 50vw'
            className='object-cover'
          />
          {hoverImage ? (
            <Image
              alt={hoverImage.altText || title}
              src={hoverImage.url}
              fill
              sizes='(max-width: 768px) 100vw, 50vw'
              className='object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100'
            />
          ) : null}
          {!availableForSale && (
            <div className='absolute inset-0 z-10 flex items-center justify-center bg-white/50 p-1 text-lg'>
              <span className='rounded-full bg-sandy-clay p-3 text-white'>Sold Out</span>
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
