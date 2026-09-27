'use client'

import { useActionState, useEffect, useRef } from 'react'
import { subscribeNewsletterAction } from '@/components/newsletter/actions'

const INITIAL_STATE = {
  message: '',
  status: 'idle' as const,
}

interface NewsletterFormProps {
  variant: 'footer' | 'modal'
}

export function NewsletterForm({ variant }: NewsletterFormProps) {
  const [state, formAction, isPending] = useActionState(
    subscribeNewsletterAction,
    INITIAL_STATE,
  )
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
        <label
          className='flex cursor-pointer items-start gap-3 text-left font-body text-sm text-espresso/80'
          htmlFor='newsletter-modal-substack'
        >
          <input
            className='mt-0.5 size-4 shrink-0 cursor-pointer accent-espresso'
            id='newsletter-modal-substack'
            name='substack'
            type='checkbox'
            value='1'
          />
          <span>
            Also sign me up for UCV&apos;s{' '}
            <a
              className='cursor-pointer underline underline-offset-2 hover:opacity-70'
              href='https://uglycryvintage.substack.com/?utm_campaign=profile_chips'
              rel='noopener noreferrer'
              target='_blank'
            >
              Secondhand Hysteria
            </a>{' '}
            on Substack
          </span>
        </label>
      ) : null}

      <label className='sr-only' htmlFor={isModal ? 'newsletter-modal-email' : 'newsletter-email'}>
        Email address
      </label>
      <input
        aria-describedby={`${variant}-newsletter-message`}
        autoComplete='email'
        className={
          isModal
            ? 'w-full rounded-md border border-espresso/20 bg-white px-4 py-3 text-espresso placeholder:text-espresso/40'
            : 'min-w-0 flex-1 rounded-md border border-espresso/20 bg-white px-3 py-2 text-espresso placeholder:text-espresso/50 md:w-56 md:flex-none'
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
            ? 'cursor-pointer rounded-full border border-espresso bg-sandy-clay px-10 py-3.5 text-lg tracking-wide text-espresso uppercase hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60'
            : 'shrink-0 cursor-pointer rounded-md bg-silver px-4 py-2 tracking-wide text-espresso hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60'
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
            ? 'min-h-5 font-body text-sm text-espresso'
            : 'basis-full font-body text-sm text-espresso'
        }
        id={`${variant}-newsletter-message`}
        role='status'
      >
        {state.message}
      </p>
    </form>
  )
}
