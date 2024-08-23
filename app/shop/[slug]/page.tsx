import Image from 'next/image'

export async function generateMetadata({ params }: { params: { slug: number } }) {
  const product = await fetch(`https://fakestoreapi.com/products/${params.slug}/`).then((res) =>
    res.json(),
  )

  return {
    title: `${product.title} | Vintage for Y'all`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: { slug: number } }) {
  const product = await fetch(`https://fakestoreapi.com/products/${params.slug}/`).then((res) =>
    res.json(),
  )

  return (
    <div className='grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2'>
      <div className='flex justify-center'>
        <Image alt={product.title} src={product.image} width={353} height={453} className='mb-3' />
      </div>
      <div>
        <h1 className='text-4xl lg:text-6xl mb-8'>{product.title}</h1>
        <p className='text-dark-magenta'>${product.price.toFixed(2)}</p>
        <p className='mt-5 mb-[15px]'>{product.description}</p>
      </div>
    </div>
  )
}
