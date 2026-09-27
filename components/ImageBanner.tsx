import Image, { type StaticImageData } from 'next/image'

interface ImageBannerProps {
  backgroundImage: StaticImageData | string
}

export function ImageBanner({ backgroundImage }: ImageBannerProps) {
  return (
    <section aria-hidden className='relative h-64 overflow-hidden md:h-[28rem]'>
      <Image
        alt=''
        className='object-cover'
        fill
        sizes='100vw'
        src={backgroundImage}
      />
    </section>
  )
}
