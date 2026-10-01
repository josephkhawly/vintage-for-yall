import {
  ConfirmMessage,
  NewsletterConfirmForm,
} from '@/components/NewsletterConfirmForm'
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

  return <NewsletterConfirmForm token={token} />
}
