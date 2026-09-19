'use client'

import { useActionState } from 'react'
import {
  subscribeToNewsletter,
  type NewsletterFormState,
} from '@/app/actions/newsletter'

const initialState: NewsletterFormState = {
  status: 'idle',
  message: '',
}

export default function NewsletterSignup() {
  const [state, formAction, pending] = useActionState(
    subscribeToNewsletter,
    initialState,
  )

  if (state.status === 'success') {
    return (
      <p className='py-3 text-espresso' role='status' aria-live='polite'>
        {state.message}
      </p>
    )
  }

  return (
    <form action={formAction} className='flex flex-col gap-3'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-stretch'>
        <label htmlFor='newsletter-email' className='sr-only'>
          Email address
        </label>
        <input
          id='newsletter-email'
          name='email'
          type='email'
          required
          autoComplete='email'
          placeholder='your@email.com'
          disabled={pending}
          className='w-full flex-1 border border-white/40 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 outline-none transition focus:border-espresso focus:bg-white/15 disabled:opacity-70'
        />
        <button
          type='submit'
          disabled={pending}
          className='shrink-0 bg-espresso px-6 py-3 text-white transition hover:bg-espresso/85 disabled:cursor-not-allowed disabled:opacity-70'
        >
          {pending ? 'Signing up…' : 'Sign up'}
        </button>
      </div>
      {state.status === 'error' && (
        <p className='text-sm text-espresso' role='alert' aria-live='polite'>
          {state.message}
        </p>
      )}
    </form>
  )
}
