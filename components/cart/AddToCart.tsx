'use client'

import clsx from 'clsx'
import { useFormState } from 'react-dom'
import { addItem } from './actions'
import { Product } from '@/lib/shopify/types'

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean
  selectedVariantId?: string | undefined
}) {
  const buttonClasses =
    'relative flex w-full items-center justify-center bg-burnt-orange rounded-md p-4 tracking-wide text-white'
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
  //   const { addCartItem } = useCart()
  //   const { state } = useProduct()
  const [message, formAction] = useFormState(addItem, null)

  //   const variant = variants.find((variant: ProductVariant) =>
  //     variant.selectedOptions.every((option) => option.value === state[option.name.toLowerCase()]),
  //   )
  //   const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined
  //   const selectedVariantId = variant?.id || defaultVariantId
  //   const actionWithVariant = formAction.bind(null, selectedVariantId)
  //   const finalVariant = variants.find((variant) => variant.id === selectedVariantId)!

  return (
    <form>
      <SubmitButton availableForSale={availableForSale} />
      <p aria-live='polite' className='sr-only' role='status'>
        {message}
      </p>
    </form>
  )
}
