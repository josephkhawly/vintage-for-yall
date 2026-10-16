import Image, { type StaticImageData } from 'next/image'
import { PageContainer } from '@/components/PageContainer'

interface ImageGridProps {
  images: [StaticImageData | string, StaticImageData | string, StaticImageData | string]
}

export function ImageGrid({ images }: ImageGridProps) {
  return (
    <section aria-hidden className='py-12 md:py-16'>
      <PageContainer>
        <div className='grid grid-cols-3 gap-3 md:gap-6'>
          {images.map((src, index) => (
            <div className='relative aspect-2/3 overflow-hidden' key={index}>
              <Image alt='' className='object-cover' fill sizes='33vw' src={src} />
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
