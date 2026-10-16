import { ProductCarouselClient } from '@/components/ProductCarousel-client'
import { getCollection, getCollectionProducts } from '@/lib/shopify'

interface ProductCarouselProps {
  collection: string
}

export async function ProductCarousel({ collection }: ProductCarouselProps) {
  const [collectionData, products] = await Promise.all([
    getCollection(collection),
    getCollectionProducts({ collection }),
  ])

  if (!collectionData) return null

  return (
    <ProductCarouselClient heading={collectionData.title} products={products.slice(0, 12)} />
  )
}
