'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import Price from '@/components/Price'
import { DEFAULT_OPTION } from '@/lib/constants'
import { createUrl } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { createCartAndSetCookie, redirectToCheckout } from './actions'
import { useCart } from './CartContext'
import { DeleteItemButton } from './DeleteItemButton'
import OpenCart from './OpenCart'
import CloseCart from './CloseCart'
import { HiOutlineShoppingCart } from 'react-icons/hi2'

type MerchandiseSearchParams = {
  [key: string]: string
}

export default function CartModal() {
  const { cart, updateCartItem } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const quantityRef = useRef(cart?.totalQuantity)
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

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
            <DialogPanel className='fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[390px]'>
              <div className='flex items-center justify-between'>
                <p className='text-lg font-semibold'>My Cart</p>
                <button aria-label='Close cart' onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.lines.length === 0 ? (
                <div className='mt-20 flex w-full flex-col items-center justify-center overflow-hidden'>
                  <HiOutlineShoppingCart className='h-16' />
                  <p className='mt-6 text-center text-2xl font-bold'>Your cart is empty.</p>
                </div>
              ) : (
                <div className='flex h-full flex-col justify-between overflow-hidden p-1'>
                  <ul className='flex-grow overflow-auto py-4'>
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
                            <div className='relative flex w-full flex-row justify-between px-1 py-4'>
                              <div className='absolute z-40 -ml-1 -mt-2'>
                                <DeleteItemButton item={item} optimisticUpdate={updateCartItem} />
                              </div>
                              <div className='flex flex-row'>
                                <div className='relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300'>
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
                                  className='z-30 ml-2 flex flex-row space-x-4'
                                >
                                  <div className='flex flex-1 flex-col text-base'>
                                    <span className='leading-tight'>
                                      {item.merchandise.product.title}
                                    </span>
                                    {item.merchandise.title !== DEFAULT_OPTION ? (
                                      <p className='text-sm text-neutral-500'>
                                        {item.merchandise.title}
                                      </p>
                                    ) : null}
                                  </div>
                                </Link>
                              </div>
                              <div className='flex h-16 flex-col justify-between'>
                                <Price
                                  className='flex justify-end space-y-2 text-right text-sm'
                                  amount={item.cost.totalAmount.amount}
                                  currencyCode={item.cost.totalAmount.currencyCode}
                                />
                              </div>
                            </div>
                          </li>
                        )
                      })}
                  </ul>
                  <div className='py-4 text-sm text-neutral-500'>
                    <div className='mb-3 flex items-center justify-between border-b border-neutral-200 pb-1'>
                      <p>Taxes</p>
                      <Price
                        className='text-right text-base text-black'
                        amount={cart.cost.totalTaxAmount.amount}
                        currencyCode={cart.cost.totalTaxAmount.currencyCode}
                      />
                    </div>
                    <div className='mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1'>
                      <p>Shipping</p>
                      <p className='text-right'>Calculated at checkout</p>
                    </div>
                    <div className='mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1'>
                      <p>Total</p>
                      <Price
                        className='text-right text-base text-black'
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </div>
                  </div>
                  <form action={redirectToCheckout}>
                    <CheckoutButton />
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

function CheckoutButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className='block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100'
      type='submit'
      disabled={pending}
    >
      Proceed to Checkout
    </button>
  )
}
