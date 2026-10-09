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
import { HiOutlineXMark } from 'react-icons/hi2'

type MerchandiseSearchParams = {
  [key: string]: string
}

function OpenCart({ quantity }: { quantity?: number }) {
  return (
    <div className='flex h-11 items-center gap-2 rounded-full border border-black bg-teal/50 pr-1.5 pl-4 font-subheading text-sm uppercase tracking-wide text-black backdrop-blur-sm md:h-14 md:pr-2 md:pl-5 md:text-base'>
      <span>Cart</span>
      <span className='flex size-8 items-center justify-center rounded-full border border-black text-xs md:size-10 md:text-sm'>
        {quantity ?? 0}
      </span>
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
      <button aria-label='Open cart' className='cursor-pointer' onClick={openCart} type='button'>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog className='relative z-50' onClose={closeCart}>
          <TransitionChild
            as={Fragment}
            enter='transition-all ease-in-out duration-300'
            enterFrom='opacity-0 backdrop-blur-none'
            enterTo='opacity-100 backdrop-blur-[.5px]'
            leave='transition-all ease-in-out duration-200'
            leaveFrom='opacity-100 backdrop-blur-[.5px]'
            leaveTo='opacity-0 backdrop-blur-none'
          >
            <div aria-hidden='true' className='fixed inset-0 bg-black/30' />
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
            <DialogPanel className='fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-black bg-teal/50 p-6 text-black backdrop-blur-sm md:w-[500px]'>
              <div className='flex justify-end'>
                <button
                  aria-label='Close cart'
                  className='cursor-pointer p-2 text-black'
                  onClick={closeCart}
                  type='button'
                >
                  <HiOutlineXMark className='size-8' />
                </button>
              </div>

              {!cart || cart.lines.length === 0 ? (
                <div className='mt-20 flex w-full flex-col items-center justify-center overflow-hidden'>
                  <p className='text-center text-2xl font-bold'>Your cart is empty.</p>
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
                      className='block w-full cursor-pointer rounded-md bg-burnt-orange p-3 text-center text-md tracking-wide text-white hover:opacity-90 disabled:cursor-not-allowed'
                      disabled={isPending}
                      type='submit'
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
