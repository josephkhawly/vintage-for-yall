import Image from 'next/image'

interface ImageBlockProps {
  product: string
  url: string
  price: number
  src: string
  alt: string
  imgWidth: number
  imgHeight: number
  description: string
}

export default function ImageBlock({
  product,
  url,
  price,
  src,
  alt,
  imgWidth,
  imgHeight,
  description,
}: ImageBlockProps) {
  return (
    <>
      <p className='mt-5 mb-[15px]'>
        <a className='underline' href={url}>
          {product}
        </a>{' '}
        ${price}
      </p>
      <p>
        <Image alt={alt} src={src} width={imgWidth} height={imgHeight} className='mb-3 mx-auto' />
      </p>
      <p className='mb-[15px]'>{description}</p>
    </>
  )
}
