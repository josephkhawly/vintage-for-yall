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
      <p>
        <a href={url}>{product}</a> ${price}
      </p>
      <p>
        <Image alt={alt} src={src} width={imgWidth} height={imgHeight} />
      </p>
      <p>{description}</p>
    </>
  )
}
