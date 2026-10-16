'use client'

import { useActionState, useEffect, useRef } from 'react'
import {
  subscribeToNewsletter,
  type NewsletterFormState,
} from '@/app/actions/newsletter'

const INITIAL_STATE: NewsletterFormState = {
  message: '',
  status: 'idle',
}

interface NewsletterFormProps {
  variant: 'footer' | 'modal'
}

export function NewsletterForm({ variant }: NewsletterFormProps) {
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, INITIAL_STATE)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset()
    }
  }, [state.status])

  const isModal = variant === 'modal'

  return (
    <form
      action={formAction}
      className={
        isModal
          ? 'mt-6 flex w-full max-w-sm flex-col items-center gap-4'
          : 'mt-1 flex w-full flex-wrap items-center gap-2 md:w-auto'
      }
      ref={formRef}
    >
      {isModal ? (
        <p className='font-body text-espresso/80 text-left text-sm'>
          Also check out UCV&apos;s{' '}
          <a
            className='cursor-pointer underline underline-offset-2 hover:opacity-70'
            href='https://uglycryvintage.substack.com/?utm_campaign=profile_chips'
            rel='noopener noreferrer'
            target='_blank'
          >
            Secondhand Hysteria
          </a>{' '}
          on Substack
        </p>
      ) : null}

      <label className='sr-only' htmlFor={isModal ? 'newsletter-modal-email' : 'newsletter-email'}>
        Email address
      </label>
      <input
        aria-describedby={`${variant}-newsletter-message`}
        autoComplete='email'
        className={
          isModal
            ? 'border-espresso/20 text-espresso placeholder:text-espresso/40 w-full rounded-md border bg-white px-4 py-3'
            : 'border-espresso/20 text-espresso placeholder:text-espresso/50 min-w-0 flex-1 rounded-md border bg-white px-3 py-2 md:w-56 md:flex-none'
        }
        disabled={isPending}
        id={isModal ? 'newsletter-modal-email' : 'newsletter-email'}
        name='email'
        placeholder={isModal ? 'Enter your email address' : 'Email'}
        required
        type='email'
      />
      <button
        className={
          isModal
            ? 'border-espresso bg-sandy-clay font-subheading text-espresso cursor-pointer rounded-full border px-10 py-3.5 text-lg tracking-wide uppercase hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60'
            : 'bg-silver text-espresso shrink-0 cursor-pointer rounded-md px-4 py-2 tracking-wide hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60'
        }
        disabled={isPending}
        type='submit'
      >
        {isPending ? 'Subscribing…' : 'Subscribe'}
      </button>
      <p
        aria-live='polite'
        className={
          isModal
            ? 'font-body text-espresso min-h-5 text-sm'
            : 'font-body text-espresso basis-full text-sm'
        }
        id={`${variant}-newsletter-message`}
        role='status'
      >
        {state.message}
      </p>
    </form>
  )
}
