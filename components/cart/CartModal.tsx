'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import Price from '@/components/Price'
import { DEFAULT_OPTION } from '@/lib/constants'
import { createUrl } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useActionState, useEffect, useRef, useState } from 'react'
import { createCartAndSetCookie, redirectToCheckout } from './actions'
import { useCart } from './CartContext'
import { DeleteItemButton } from './DeleteItemButton'
import { HiOutlineShoppingCart, HiOutlineXMark, HiShoppingCart } from 'react-icons/hi2'

type MerchandiseSearchParams = {
  [key: string]: string
}

function OpenCart({ quantity }: { quantity?: number }) {
  return (
    <div className='relative flex h-11 w-11 items-center justify-center text-black transition-colors'>
      <HiShoppingCart className='h-7 w-7' />

      {quantity ? (
        <div className='absolute right-0 top-0 -mr-1 -mt-1 h-4 w-4 rounded-sm bg-burnt-orange text-[11px] font-medium text-white'>
          {quantity}
        </div>
      ) : null}
    </div>
  )
}

function CloseCart() {
  return (
    <div className='relative flex h-11 w-11 items-center justify-center text-black'>
      <HiOutlineXMark className='h-8 w-8' />
    </div>
  )
}

export default function CartModal() {
  const { cart, updateCartItem } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const quantityRef = useRef(cart?.totalQuantity)
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  const [, submitAction, isPending] = useActionState(async () => {
    redirectToCheckout()
  }, null)

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie()
    }
  }, [cart])

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) {
        setIsOpen(true)
      }
      quantityRef.current = cart?.totalQuantity
    }
  }, [isOpen, cart?.totalQuantity, quantityRef])

  return (
    <>
      <button aria-label='Open cart' onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className='relative z-50'>
          <TransitionChild
            as={Fragment}
            enter='transition-all ease-in-out duration-300'
            enterFrom='opacity-0 backdrop-blur-none'
            enterTo='opacity-100 backdrop-blur-[.5px]'
            leave='transition-all ease-in-out duration-200'
            leaveFrom='opacity-100 backdrop-blur-[.5px]'
            leaveTo='opacity-0 backdrop-blur-none'
          >
            <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
          </TransitionChild>
          <TransitionChild
            as={Fragment}
            enter='transition-all ease-in-out duration-300'
            enterFrom='translate-x-full'
            enterTo='translate-x-0'
            leave='transition-all ease-in-out duration-200'
            leaveFrom='translate-x-0'
            leaveTo='translate-x-full'
          >
            <DialogPanel className='fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[500px]'>
              <div className='flex items-center justify-between'>
                <p className='text-lg font-semibold'>My Cart</p>
                <button aria-label='Close cart' onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.lines.length === 0 ? (
                <div className='mt-20 flex w-full flex-col items-center justify-center overflow-hidden'>
                  <HiOutlineShoppingCart className='h-16 w-16' />
                  <p className='mt-6 text-center text-2xl font-bold'>Your cart is empty.</p>
                </div>
              ) : (
                <div className='flex h-full flex-col justify-between overflow-hidden p-1'>
                  <ul className='grow overflow-auto py-4'>
                    {cart.lines
                      .sort((a, b) =>
                        a.merchandise.product.title.localeCompare(b.merchandise.product.title),
                      )
                      .map((item, i) => {
                        const merchandiseSearchParams = {} as MerchandiseSearchParams

                        item.merchandise.selectedOptions.forEach(({ name, value }) => {
                          if (value !== DEFAULT_OPTION) {
                            merchandiseSearchParams[name.toLowerCase()] = value
                          }
                        })

                        const merchandiseUrl = createUrl(
                          `/product/${item.merchandise.product.handle}`,
                          new URLSearchParams(merchandiseSearchParams),
                        )

                        return (
                          <li key={i} className='flex w-full flex-col border-b border-neutral-300'>
                            <div className='flex w-full flex-row justify-between px-1 py-4'>
                              <div className='flex flex-row'>
                                <div className='relative h-24 w-24 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300'>
                                  <Image
                                    className='h-full w-full object-cover'
                                    width={64}
                                    height={64}
                                    alt={
                                      item.merchandise.product.featuredImage.altText ||
                                      item.merchandise.product.title
                                    }
                                    src={item.merchandise.product.featuredImage.url}
                                  />
                                </div>
                                <Link
                                  href={merchandiseUrl}
                                  onClick={closeCart}
                                  className='z-30 ml-2 flex flex-row space-x-5'
                                >
                                  <div className='flex flex-1 flex-col text-base'>
                                    <span className='leading-tight'>
                                      {item.merchandise.product.title}
                                    </span>
                                  </div>
                                </Link>
                              </div>
                              <div className='flex flex-col items-end justify-between'>
                                <Price
                                  className='flex justify-end space-y-2 text-right text-sm'
                                  amount={item.cost.totalAmount.amount}
                                  currencyCode={item.cost.totalAmount.currencyCode}
                                />
                                <DeleteItemButton item={item} optimisticUpdate={updateCartItem} />
                              </div>
                            </div>
                          </li>
                        )
                      })}
                  </ul>
                  <div className='py-4 text-sm text-neutral-500'>
                    <div className='mb-3 flex items-center justify-between pb-1 pt-1'>
                      <p className='text-md'>Subtotal</p>
                      <Price
                        className='text-right text-base text-black'
                        amount={cart.cost.subtotalAmount.amount}
                        currencyCode={cart.cost.subtotalAmount.currencyCode}
                      />
                    </div>
                    <p className='mt-0.5 text-sm text-gray-500'>
                      Shipping and taxes calculated at checkout.
                    </p>
                  </div>
                  <form action={submitAction}>
                    <button
                      className='block w-full rounded-md bg-burnt-orange p-3 text-center text-md tracking-wide text-white hover:opacity-90'
                      type='submit'
                      disabled={isPending}
                    >
                      Proceed to Checkout
                    </button>
                  </form>
                </div>
              )}
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  )
}
