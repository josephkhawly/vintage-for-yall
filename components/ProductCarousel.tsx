'use client'

import { useRef } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import ProductCard from '@/components/ProductCard'
import { PageContainer } from '@/components/PageContainer'
import type { Product } from '@/lib/shopify/types'

interface ProductCarouselProps {
  heading: string
  products: Product[]
}

export function ProductCarousel({ heading, products }: ProductCarouselProps) {
  const scrollerRef = useRef<HTMLUListElement>(null)

  function scroll(direction: -1 | 1) {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ behavior: 'smooth', left: direction * el.clientWidth * 0.75 })
  }

  if (products.length === 0) return null

  return (
    <section className="bg-[url('/background-texture.jpg')] bg-cover bg-center bg-no-repeat py-12 md:py-16">
      <PageContainer>
        <div className='mb-6 flex items-center justify-between gap-4 md:mb-8'>
          <h2 className='font-frogmore text-3xl tracking-wide text-espresso md:text-5xl'>
            {heading}
          </h2>
          <div className='flex shrink-0 gap-2'>
            <button
              aria-label='Scroll products left'
              className='p-2 text-espresso'
              onClick={() => scroll(-1)}
              type='button'
            >
              <HiChevronLeft className='size-5' />
            </button>
            <button
              aria-label='Scroll products right'
              className='p-2 text-espresso'
              onClick={() => scroll(1)}
              type='button'
            >
              <HiChevronRight className='size-5' />
            </button>
          </div>
        </div>
        <ul
          className='flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] scrollbar-none md:gap-6 [&::-webkit-scrollbar]:hidden [&_li]:w-44 [&_li]:shrink-0 [&_li]:snap-start md:[&_li]:w-56'
          ref={scrollerRef}
        >
          {products.map((product) => (
            <ProductCard key={product.handle} product={product} />
          ))}
        </ul>
      </PageContainer>
    </section>
  )
}
