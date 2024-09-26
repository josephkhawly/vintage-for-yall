'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Image as ImageType } from '@/lib/shopify/types'

interface ImageGalleryProps {
  images: ImageType[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0])
  return (
    <div className=''>
      <Image
        alt={mainImage.altText}
        src={mainImage.url}
        className='w-full pb-2 aspect-auto max-h-auto'
        width={400}
        height={600}
      />
      <div className='flex gap-x-2 overflow-x-auto pb-2'>
        {images.map((img) => (
          <Image
            key={img.url}
            onClick={() => setMainImage(img)}
            src={img.url}
            alt={img.altText}
            width={100}
            height={400}
            className={`aspect-auto ${mainImage === img ? 'border-2 border-dark-magenta' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
