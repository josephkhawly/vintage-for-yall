import { Hero } from '@/components/Hero'

export default function Home() {
  return (
    <Hero
      backgroundImage='/newsletter-stock.jpg'
      backgroundImageAlt='Vintage clothing rack'
      cta={{ href: '/shop', label: 'Shop now' }}
      heading='Ugly Cry Vintage'
      supportingText='Curated vintage pieces with stories from the rack.'
    />
  )
}
