import Image from 'next/image'

interface ImageBlockProps {
  product: string
  url: string
  price: number
  src: string
  alt: string
  imgWidth?: number
  imgHeight?: number
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
        <a className='underline' href={url} target='_blank' rel='noopener noreferrer'>
          {product}
        </a>{' '}
        ${price}
      </p>
      <p>
        <Image alt={alt} src={src} width={imgWidth ?? 353} height={imgHeight ?? 529} className='mb-3 mx-auto' />
      </p>
      <p className='mb-[15px]'>{description}</p>
    </>
  )
}
