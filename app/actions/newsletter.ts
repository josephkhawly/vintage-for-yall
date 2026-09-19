'use server'

import { subscribeEmailToNewsletter } from '@/lib/shopify/newsletter'

export type NewsletterFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function subscribeToNewsletter(
  _prevState: NewsletterFormState,
  formData: FormData,
): Promise<NewsletterFormState> {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase()

  if (!email) {
    return { status: 'error', message: 'Please enter your email.' }
  }

  if (!EMAIL_REGEX.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' }
  }

  try {
    await subscribeEmailToNewsletter(email)
    return {
      status: 'success',
      message: "You're in! Check your inbox to verify signup. <3",
    }
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return {
      status: 'error',
      message: 'Something went wrong. Please try again.',
    }
  }
}
