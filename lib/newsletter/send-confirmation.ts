import { Resend } from 'resend'

function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  }

  // Never use request Host / X-Forwarded-* — client-supplied hosts can poison
  // confirmation links. On preview/dev, prefer this deployment's VERCEL_URL so
  // links stay on the same environment (not production).
  const vercelEnv = process.env.VERCEL_ENV
  if (vercelEnv && vercelEnv !== 'production' && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, '')}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, '')}`
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, '')}`
  }

  throw new Error('Newsletter signup is not configured')
}

function assertPublicSiteUrl(url: string): void {
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    throw new Error('Newsletter signup is not configured')
  }

  if (parsed.protocol !== 'https:') {
    throw new Error('Newsletter signup is not configured')
  }

  const host = parsed.hostname.toLowerCase()
  if (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '::1' ||
    host.endsWith('.local')
  ) {
    throw new Error('Newsletter signup is not configured')
  }
}

function getFromAddress(): string {
  return (
    process.env.RESEND_FROM_EMAIL ||
    'Ugly Cry Vintage <hello@uglycryvintage.com>'
  )
}

function isIdempotencyConflict(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false
  const record = error as { name?: string; message?: string; statusCode?: number }
  const message = (record.message ?? '').toLowerCase()
  return (
    record.name === 'invalid_idempotent_request' ||
    record.statusCode === 409 ||
    message.includes('idempotency') ||
    message.includes('idempotent')
  )
}

export async function sendNewsletterConfirmationEmail({
  email,
  confirmUrl,
}: {
  email: string
  confirmUrl: string
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('Newsletter signup is not configured')
  }

  const resend = new Resend(apiKey)
  const subject = 'One last thing...'
  const previewText = 'Finish signing up to Ugly Cry'
  const text = [
    'Sooo,',
    '',
    `To confirm you want vintage sent to your inbox, click HERE: ${confirmUrl}`,
    "Don't worry—we only share the important stuff.",
    '',
    'XO,',
    'Ariel',
  ].join('\n')

  const html = `
    <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
      ${previewText}
    </div>
    <div style="font-family: Georgia, 'Times New Roman', serif; color: #301b05; line-height: 1.6; max-width: 520px;">
      <p style="font-style: italic;">Sooo,</p>
      <p style="font-style: italic;">
        To confirm you want vintage sent to your inbox, click
        <a href="${confirmUrl}" style="color: #301b05; text-decoration: underline;">HERE</a>.
      </p>
      <p style="font-style: italic;">
        Don't worry—we only share the important stuff.
      </p>
      <p style="font-style: italic;">
        XO,<br />
        Ariel
      </p>
    </div>
  `

  // Deduplicate rapid repeat signups for the same address within a 5-minute window.
  // Retries mint a new token/body; if Resend rejects the reused key, the first
  // confirmation email already went out — treat that as success.
  const idempotencyKey = `newsletter-confirm/${email}/${Math.floor(Date.now() / (1000 * 60 * 5))}`

  const { error } = await resend.emails.send(
    {
      from: getFromAddress(),
      to: [email],
      subject,
      text,
      html,
    },
    {
      idempotencyKey,
    },
  )

  if (error) {
    if (isIdempotencyConflict(error)) {
      return
    }
    console.error('Resend confirmation email error:', error)
    throw new Error('Failed to send confirmation email')
  }
}

export function buildNewsletterConfirmUrl(token: string): string {
  const siteUrl = getSiteUrl()
  assertPublicSiteUrl(siteUrl)
  return `${siteUrl}/newsletter/confirm?token=${encodeURIComponent(token)}`
}
