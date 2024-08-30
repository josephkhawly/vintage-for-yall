import { AddToCart } from '@/components/cart/AddToCart'
import Price from '@/components/Price'
import Prose from '@/components/Prose'
import { HIDDEN_PRODUCT_TAG } from '@/lib/constants'
import { getProduct } from '@/lib/shopify'
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface PageProps {
  params: { handle: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProduct(params.handle)

  if (!product) return notFound()

  const { url, width, height, altText: alt } = product.featuredImage || {}
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG)

  return {
    title: `${product.seo.title || product.title} | Vintage for Y'all`,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProduct(params.handle)

  if (!product) return notFound()

  const { priceRange, featuredImage } = product

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: priceRange.minVariantPrice.currencyCode,
      highPrice: priceRange.maxVariantPrice.amount,
      lowPrice: priceRange.minVariantPrice.amount,
    },
  }

  return (
    <div className='grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div className='flex justify-center'>
        <Image
          alt={product.title}
          src={featuredImage.url}
          width={featuredImage.width}
          height={featuredImage.height}
          className='mb-3'
        />
      </div>
      <div>
        <h1 className='text-4xl lg:text-6xl mb-8'>{product.title}</h1>
        <Price
          amount={priceRange.minVariantPrice.amount}
          currencyCode={priceRange.minVariantPrice.currencyCode}
        />
        {product.descriptionHtml ? (
          <Prose className='mb-6 text-sm leading-tight' html={product.descriptionHtml} />
        ) : null}
        <AddToCart product={product} />
      </div>
    </div>
  )
}
