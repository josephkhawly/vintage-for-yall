import Link from 'next/link'
import { confirmEmailMarketingSubscription } from '@/lib/shopify/newsletter'
import { verifyNewsletterConfirmToken } from '@/lib/newsletter/token'

type ConfirmPageProps = {
  searchParams: Promise<{ token?: string }>
}

export default async function NewsletterConfirmPage({
  searchParams,
}: ConfirmPageProps) {
  const { token } = await searchParams

  if (!token) {
    return (
      <ConfirmMessage
        title='Missing confirmation link'
        body='That confirmation link looks incomplete. Try signing up again from the homepage.'
      />
    )
  }

  const payload = verifyNewsletterConfirmToken(token)
  if (!payload) {
    return (
      <ConfirmMessage
        title='Link expired or invalid'
        body='This confirmation link is expired or invalid. Sign up again and we’ll send a fresh one.'
      />
    )
  }

  try {
    await confirmEmailMarketingSubscription(payload.customerId)
  } catch (error) {
    console.error('Newsletter confirmation error:', error)
    return (
      <ConfirmMessage
        title='Something went wrong'
        body='We couldn’t confirm your signup. Please try again in a bit.'
      />
    )
  }

  return (
    <ConfirmMessage
      title="You're in!"
      body='Email confirmed. You’ll get first dibs on drops and that welcome discount. <3'
    />
  )
}

function ConfirmMessage({ title, body }: { title: string; body: string }) {
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
