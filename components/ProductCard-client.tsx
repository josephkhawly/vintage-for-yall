'use client'

import { useCartForm } from '@/lib/cart'
import { openCartDrawer } from '@/lib/cart-drawer'

interface ProductCardQuickAddProps {
  size?: string
  variantId: string
}

export function ProductCardQuickAdd({ size, variantId }: ProductCardQuickAddProps) {
  const { formProps, register } = useCartForm()

  return (
    <div className='absolute inset-x-0 bottom-0 z-10 flex h-12 translate-y-full items-center justify-between gap-3 bg-teal/50 px-3 text-sm text-espresso backdrop-blur-sm transition-transform duration-300 ease-out group-hover:translate-y-0'>
      {size ? <span>Size {size}</span> : <span />}
      <form
        {...formProps({
          afterSubmit: () => {
            openCartDrawer()
          },
        })}
      >
        <input type='hidden' {...register('merchandiseId', { value: variantId })} />
        <input type='hidden' {...register('quantity', { value: 1 })} />
        <button
          aria-label='Quick add to cart'
          className='cursor-pointer underline'
          type='submit'
          {...register('add')}
        >
          Quick Add
        </button>
      </form>
    </div>
  )
}
