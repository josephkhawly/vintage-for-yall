import { Hero } from '@/components/Hero'
import { ImageBanner } from '@/components/ImageBanner'
import { ProductCarousel } from '@/components/ProductCarousel'

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

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
