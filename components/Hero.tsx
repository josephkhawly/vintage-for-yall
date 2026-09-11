import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'

interface HeroProps {
  backgroundImage: StaticImageData | string
  backgroundImageAlt: string
  heading: string
  supportingText?: string
  cta?: {
    href: string
    label: string
  }
}

export function Hero({
  backgroundImage,
  backgroundImageAlt,
  cta,
  heading,
  supportingText,
}: HeroProps) {
  return (
    <section className='relative -mt-31 h-svh overflow-hidden md:-mt-64'>
      <Image
        alt={backgroundImageAlt}
        className='object-cover'
        fill
        priority
        sizes='100vw'
        src={backgroundImage}
      />
      <div className='absolute inset-0 bg-espresso/40' />
      <div className='relative flex h-full flex-col items-center justify-center px-6 text-center md:px-12'>
        <h1 className='max-w-4xl font-frogmore text-5xl tracking-wide md:text-7xl'>{heading}</h1>
        <p className='mt-4 max-w-xl font-body text-lg text-white/90 md:text-xl'>{supportingText}</p>
        {cta && (
          <Link
            className='mt-5 rounded-md bg-silver px-6 py-3 tracking-wide text-espresso hover:opacity-90'
            href={cta.href}
          >
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  )
}
