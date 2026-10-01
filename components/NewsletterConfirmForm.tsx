'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import {
  confirmNewsletterSubscription,
  type NewsletterConfirmFormState,
} from '@/app/actions/newsletter'

const initialState: NewsletterConfirmFormState = {
  status: 'idle',
  title: '',
  message: '',
}

export function ConfirmMessage({ title, body }: { title: string; body: string }) {
  return (
    <div className='flex min-h-[70vh] items-center justify-center px-6'>
      <article className='w-full max-w-xl text-left font-body text-lg leading-relaxed italic md:text-xl md:leading-relaxed'>
        <h1 className='mb-4 not-italic text-2xl text-espresso'>{title}</h1>
        <p className='mb-8'>{body}</p>
        <p>
          <Link
            href='/'
            className='underline underline-offset-4 transition-colors hover:text-espresso'
          >
            Back home
          </Link>
        </p>
      </article>
    </div>
  )
}

export function NewsletterConfirmForm({ token }: { token: string }) {
  const [state, formAction, pending] = useActionState(
    confirmNewsletterSubscription,
    initialState,
  )

  if (state.status === 'success' || state.status === 'error') {
    return <ConfirmMessage title={state.title} body={state.message} />
  }

  return (
    <div className='flex min-h-[70vh] items-center justify-center px-6'>
      <article className='w-full max-w-xl text-left font-body text-lg leading-relaxed italic md:text-xl md:leading-relaxed'>
        <h1 className='mb-4 not-italic text-2xl text-espresso'>Confirm your signup</h1>
        <p className='mb-8'>
          One click to finish — we&apos;ll only email when it matters.
        </p>
        <form action={formAction}>
          <input type='hidden' name='token' value={token} />
          <button
            type='submit'
            disabled={pending}
            className='bg-espresso px-6 py-3 not-italic text-white transition hover:bg-espresso/85 disabled:cursor-not-allowed disabled:opacity-70'
          >
            {pending ? 'Confirming…' : 'Confirm email'}
          </button>
        </form>
      </article>
    </div>
  )
}
