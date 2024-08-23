import Image from 'next/image'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Shop | Vintage for Y'all",
  description: '',
}

function ProductCard({ product }: any) {
  return (
    <li className='aspect-square'>
      <Link
        className='flex flex-col items-center justify-between'
        href={`/shop/${product.id}`}
      >
        <Image alt={product.title} src={product.image} width={353} height={353} className='mb-3' />
        <p className='mt-5 mb-[15px]'>{product.title}</p>
        <p>${product.price.toFixed(2)}</p>
      </Link>
    </li>
  )
}

export default async function Shop() {
  const products = await fetch('https://fakestoreapi.com/products').then((res) => res.json())

  return (
    <>
      <h1 className='text-6xl lg:text-9xl mb-8'>Shop</h1>
      <div>
        <ul className='grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </>
  )
}
