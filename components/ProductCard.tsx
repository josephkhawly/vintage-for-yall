import Image from 'next/image'
import Link from 'next/link'
import Price from './Price'
import { ProductCardQuickAdd } from './ProductCard-client'
import { Product } from '@/lib/shopify/types'

export default function ProductCard({ product }: { product: Product }) {
  const { availableForSale, featuredImage, handle, images, priceRange, sizes, title, variants } =
    product
  const hoverImage = images.find((image) => image?.url && image.url !== featuredImage.url)
  const size = sizes[0]
  const variantId = variants[0]?.id

  return (
    <li>
      <div className='flex flex-col items-start'>
        <div className='group relative mb-2 w-full overflow-hidden' style={{ aspectRatio: '3/4' }}>
          <Link className='absolute inset-0' href={`/product/${handle}`}>
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
          </Link>
          {!availableForSale ? (
            <div className='absolute inset-0 z-10 flex items-center justify-center bg-white/50 p-1 text-lg'>
              <span className='rounded-full bg-sandy-clay p-3 text-white'>Sold Out</span>
            </div>
          ) : variantId ? (
            <ProductCardQuickAdd size={size} variantId={variantId} />
          ) : null}
        </div>
        <Link className='flex flex-col items-start' href={`/product/${handle}`}>
          <p className='text-left text-md'>{title}</p>
          <Price
            amount={priceRange?.minVariantPrice.amount}
            currencyCode={priceRange?.minVariantPrice.currencyCode}
            className='text-sm font-semibold'
          />
        </Link>
      </div>
    </li>
  )
}
