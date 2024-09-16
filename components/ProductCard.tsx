import Image from 'next/image'
import Link from 'next/link'
import Price from './Price'
import { Product } from '@/lib/shopify/types'

export default function ProductCard({ product }: { product: Product }) {
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
