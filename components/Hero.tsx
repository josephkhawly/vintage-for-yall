import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'

interface HeroProps {
  backgroundImage: StaticImageData | string
  backgroundImageAlt: string
  cta?: {
    href: string
    label: string
  }
  heading?: string
  objectFit?: 'contain' | 'cover'
  overlayOpacity?: number
  supportingText?: string
}

export function Hero({
  backgroundImage,
  backgroundImageAlt,
  cta,
  heading,
  objectFit = 'cover',
  overlayOpacity = 0.4,
  supportingText,
}: HeroProps) {
  return (
    <section className='relative -mt-31 h-svh overflow-hidden md:-mt-64'>
      <Image
        alt={backgroundImageAlt}
        className='data-[object-fit=contain]:object-contain data-[object-fit=cover]:object-cover'
        data-object-fit={objectFit}
        fill
        priority
        sizes='100vw'
        src={backgroundImage}
      />
      {overlayOpacity > 0 ? (
        <div className='absolute inset-0 bg-espresso' style={{ opacity: overlayOpacity }} />
      ) : null}
      <div className='relative flex h-full flex-col items-center justify-center px-6 text-center md:px-12'>
        {heading ? (
          <h1 className='max-w-4xl font-frogmore text-5xl tracking-wide text-white md:text-7xl'>
            {heading}
          </h1>
        ) : null}
        {supportingText ? (
          <p className='mt-4 max-w-xl font-body text-lg text-white/90 md:text-xl'>{supportingText}</p>
        ) : null}
        {cta ? (
          <Link
            className='mt-5 cursor-pointer rounded-md bg-silver px-6 py-3 tracking-wide text-espresso hover:opacity-90'
            href={cta.href}
          >
            {cta.label}
          </Link>
        ) : null}
      </div>
    </section>
  )
}
