import Image from 'next/image'
import Link from 'next/link'
import Price from './Price'
import { Product } from '@/lib/shopify/types'

export default function ProductCard({ product }: { product: Product }) {
  const { title, handle, featuredImage, priceRange, availableForSale } = product
  return (
    <li>
      <Link
        prefetch={true}
        className='flex flex-col items-center justify-between'
        href={`/shop/${handle}`}
      >
        <div className='relative'>
          <Image
            alt={title}
            src={featuredImage?.url}
            width={353}
            height={353}
            className='mb-4 w-full aspect-auto'
          />
          {!availableForSale && (
            <div className='absolute top-0 right-0 bg-white bg-opacity-50 text-black text-lg p-1 w-full h-full flex items-center justify-center'>
              Sold Out
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
