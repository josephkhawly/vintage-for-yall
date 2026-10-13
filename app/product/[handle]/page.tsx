import { AddToCart } from '@/components/cart/AddToCart'
import { ImageGallery } from '@/components/ImageGallery'
import Price from '@/components/Price'
import { ProductAccordions } from '@/components/ProductAccordions'
import { ProductProvider } from '@/components/ProductContext'
import Prose from '@/components/Prose'
import { HIDDEN_PRODUCT_TAG } from '@/lib/constants'
import { getProduct } from '@/lib/shopify'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

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
      <div className='container mx-auto grid grid-cols-1 grid-flow-row items-start gap-6 px-6 pb-12 pt-16 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-8 md:px-12 sm:pt-24'>
        <div className='min-w-0 w-full'>
          <ImageGallery images={product.images} />
        </div>
        <div className='min-w-0 w-full font-subheading'>
          <h1 className='mb-2 font-body text-[1.75rem] tracking-wide lg:text-[2.125rem]'>
            {product.title}
          </h1>
          <Price
            amount={priceRange.minVariantPrice.amount}
            currencyCode={priceRange.minVariantPrice.currencyCode}
            className='mb-6 text-sm text-espresso lg:text-base'
          />
          <div className='flex flex-col-reverse md:flex-col'>
            {product.descriptionHtml ? (
              <Prose
                className='mb-6 mt-6 font-subheading text-md leading-tight md:mt-0'
                html={product.descriptionHtml}
              />
            ) : null}
            <AddToCart product={product} />
          </div>
          <ProductAccordions
            condition={product.condition}
            materials={product.materials}
            measurements={product.measurements}
            notes={product.notes}
          />
        </div>
      </div>
    </ProductProvider>
  )
}
