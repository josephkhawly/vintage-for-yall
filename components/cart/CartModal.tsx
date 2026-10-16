'use client'

import { HiOutlineXMark } from 'react-icons/hi2'

import { CartContent } from '@/components/cart/CartLines'
import { useCart } from '@/lib/cart'
import { CART_DRAWER_ID, closeCartDrawer, openCartDrawer } from '@/lib/cart-drawer'
import Link from 'next/link'

export function CartTrigger() {
  const totalQuantity = useCart((state) => state.data.totalQuantity)

  return (
    <Link
      aria-controls={CART_DRAWER_ID}
      aria-haspopup='dialog'
      aria-label='Open cart'
      className='font-subheading flex size-11 cursor-pointer items-center justify-center rounded-full border border-black text-sm md:size-14 md:text-base'
      href='/cart'
      onClick={(event) => {
        event.preventDefault()
        openCartDrawer()
      }}
    >
      {totalQuantity}
    </Link>
  )
}

export function CartDrawer() {
  return (
    <dialog
      aria-labelledby='cart-drawer-title'
      className='cart-drawer bg-teal/50 flex-col border-l border-black text-black backdrop-blur-sm open:flex'
      closedby='any'
      id={CART_DRAWER_ID}
    >
      <div className='flex shrink-0 items-center justify-between gap-4 p-6 pb-2'>
        <h2 className='font-subheading text-xl tracking-wide uppercase' id='cart-drawer-title'>
          Cart
        </h2>
        <button
          aria-label='Close cart'
          className='cursor-pointer p-2 text-black'
          onClick={closeCartDrawer}
          type='button'
        >
          <HiOutlineXMark className='size-8' />
        </button>
      </div>
      <div className='flex min-h-0 flex-1 flex-col overflow-hidden px-6 pb-6'>
        <CartContent variant='drawer' />
      </div>
    </dialog>
  )
}
