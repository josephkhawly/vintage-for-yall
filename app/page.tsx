import { Hero } from '@/components/Hero'
import { ImageBanner } from '@/components/ImageBanner'
import { ProductCarousel } from '@/components/ProductCarousel'
import { getProducts } from '@/lib/shopify'

export default async function Home() {
  const products = await getProducts({ reverse: true, sortKey: 'CREATED_AT' })

  return (
    <>
      <Hero
        backgroundImage='/newsletter-stock.jpg'
        backgroundImageAlt='Vintage clothing rack'
        cta={{ href: '/shop', label: 'Shop now' }}
        heading='Ugly Cry Vintage'
        supportingText='Curated vintage pieces with stories from the rack.'
      />
      <ProductCarousel heading='New arrivals' products={products.slice(0, 12)} />
      <ImageBanner backgroundImage='/newsletter-stock.jpg' />
    </>
  )
}
