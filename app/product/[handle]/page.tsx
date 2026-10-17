import { AddToCart } from '@/components/cart/AddToCart'
import { ImageGallery } from '@/components/ImageGallery'
import Price from '@/components/Price'
import { ProductAccordions } from '@/components/ProductAccordions'
import { ProductAttributes } from '@/components/ProductAttributes'
import { ProductProvider } from '@/components/ProductContext'
import Prose from '@/components/Prose'
import { HIDDEN_PRODUCT_TAG } from '@/lib/constants'
import { getProduct } from '@/lib/shopify'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

interface PageProps {
  params: Promise<{ handle: string }>
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const product = await getProduct(params.handle)

  if (!product) return notFound()

  const { url, width, height, altText: alt } = product.featuredImage || {}
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG)

  return {
    title: `${product.seo.title || product.title} | Ugly Cry Vintage`,
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

export default async function ProductPage(props: PageProps) {
  const params = await props.params
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
    <ProductProvider>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div className='container mx-auto grid grid-flow-row grid-cols-1 items-start gap-6 px-6 pt-16 pb-12 sm:pt-24 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-8 md:px-12'>
        <div className='w-full min-w-0'>
          <ImageGallery images={product.images} />
        </div>
        <div className='font-subheading w-full min-w-0'>
          <h1 className='font-body mb-1 text-[1.75rem] tracking-wide lg:text-[2.125rem]'>
            {product.title}
          </h1>
          <Price
            amount={priceRange.minVariantPrice.amount}
            currencyCode={priceRange.minVariantPrice.currencyCode}
            className='text-espresso mb-3 text-sm lg:text-base'
          />
          <ProductAttributes colors={product.colors} sizes={product.sizes} />
          <div className='flex flex-col-reverse md:flex-col'>
            {product.descriptionHtml ? (
              <Prose
                className='font-subheading text-md mt-6 mb-6 leading-tight md:mt-0'
                html={product.descriptionHtml}
              />
            ) : null}
            <AddToCart product={product} />
          </div>
          <ProductAccordions details={product.details} />
        </div>
      </div>
    </ProductProvider>
  )
}
