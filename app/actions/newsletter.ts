'use server'

import { sendNewsletterConfirmationEmail, buildNewsletterConfirmUrl } from '@/lib/newsletter/send-confirmation'
import { createNewsletterConfirmToken } from '@/lib/newsletter/token'
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
    const result = await subscribeEmailToNewsletter(email)

    if (result.status === 'already_subscribed') {
      return {
        status: 'success',
        message: "You're already in. See you at the drop. <3",
      }
    }

    const token = createNewsletterConfirmToken(email, result.customerId)
    await sendNewsletterConfirmationEmail({
      email,
      confirmUrl: buildNewsletterConfirmUrl(token),
    })

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
