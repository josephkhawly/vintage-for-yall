'use client'

import clsx from 'clsx'
import { useFormState } from 'react-dom'
import { addItem } from './actions'
import { Product, ProductVariant } from '@/lib/shopify/types'
import { useCart } from './CartContext'
import { useProduct } from '../ProductContext'

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean
  selectedVariantId: string | undefined
}) {
  const buttonClasses =
    'relative flex w-full md:w-1/2 items-center mx-auto justify-center bg-burnt-orange rounded-md p-4 tracking-wide text-white text-md'
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60'

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    )
  }

  return (
    <button
      aria-label='Add to cart'
      className={clsx(buttonClasses, {
        'hover:opacity-90': true,
      })}
    >
      Add To Cart
    </button>
  )
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product
  const { addCartItem } = useCart()
  const { state } = useProduct()
  const [message, formAction] = useFormState(addItem, null)

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every((option) => option.value === state[option.name.toLowerCase()]),
  )
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined
  const selectedVariantId = variant?.id || defaultVariantId
  console.log('??? defaultVariantId', defaultVariantId, 'selectedVariantId', selectedVariantId)
  const actionWithVariant = formAction.bind(null, selectedVariantId)
  const finalVariant = variants.find((variant) => variant.id === selectedVariantId)!

  // console.log('??? cart', cart)

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product)
        await actionWithVariant()
      }}
    >
      <SubmitButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} />
      <p aria-live='polite' className='sr-only' role='status'>
        {message}
      </p>
    </form>
  )
}
