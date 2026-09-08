'use client'

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'
import { HiOutlineXMark } from 'react-icons/hi2'
import { subscribeNewsletterAction } from '@/components/newsletter/actions'

const STORAGE_KEY = 'newsletter-modal-dismissed'

export function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return
    setIsOpen(true)
  }, [])

  function closeModal() {
    localStorage.setItem(STORAGE_KEY, '1')
    setIsOpen(false)
  }

  return (
    <Transition show={isOpen}>
      <Dialog className='relative z-50' onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div aria-hidden='true' className='fixed inset-0 bg-black/40' />
        </TransitionChild>

        <div className='fixed inset-0 flex items-center justify-center p-4 md:p-6'>
          <TransitionChild
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <DialogPanel className='relative grid w-full max-w-3xl overflow-hidden rounded-2xl bg-white text-espresso shadow-lg md:grid-cols-2'>
              <div className='relative h-48 md:min-h-104'>
                <Image
                  alt=''
                  className='object-cover'
                  fill
                  priority
                  sizes='(min-width: 768px) 50vw, 100vw'
                  src='/newsletter-stock.jpg'
                />
              </div>

              <div className='relative flex flex-col items-center justify-center px-8 py-14 text-center md:px-10 md:py-16'>
                <button
                  aria-label='Close newsletter signup'
                  className='absolute right-3 top-3 text-espresso hover:opacity-70'
                  onClick={closeModal}
                  type='button'
                >
                  <HiOutlineXMark className='size-6' />
                </button>

                <DialogTitle className='font-frogmore text-5xl tracking-wide md:text-6xl'>
                  Join the list
                </DialogTitle>
                <p className='mt-4 max-w-sm font-body text-base text-espresso/80'>
                  Be first to know about new vintage drops, shop updates, and the occasional story
                  from the rack.
                </p>

                <form
                  action={subscribeNewsletterAction}
                  className='mt-8 flex w-full max-w-sm flex-col items-center gap-4'
                >
                  <label className='sr-only' htmlFor='newsletter-modal-email'>
                    Email address
                  </label>
                  <input
                    autoComplete='email'
                    className='w-full rounded-md border border-espresso/20 bg-white px-4 py-3 text-espresso placeholder:text-espresso/40'
                    id='newsletter-modal-email'
                    name='email'
                    placeholder='Enter your email address'
                    required
                    type='email'
                  />
                  <button
                    className='rounded-full border border-espresso bg-sandy-clay px-8 py-2.5 text-sm tracking-wide text-espresso uppercase hover:opacity-90'
                    type='submit'
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}
