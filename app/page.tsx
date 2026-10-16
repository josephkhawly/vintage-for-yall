import { Hero } from '@/components/Hero'
import { ImageBanner } from '@/components/ImageBanner'
import { ProductCarousel } from '@/components/ProductCarousel'

export default function Home() {
  return (
    <>
      <Hero
        backgroundImage='/hats.gif'
        backgroundImageAlt='Vintage hats'
        href='/shop/new-arrivals'
        objectFit='contain'
        overlayOpacity={0}
      />
      <ProductCarousel collection='new-arrivals' />
    </>
  )
}
