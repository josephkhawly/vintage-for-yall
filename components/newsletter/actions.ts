'use server'

const KLAVIYO_API_REVISION = '2026-07-15'
const KLAVIYO_SUBSCRIBE_URL = 'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs'

export interface NewsletterActionState {
  message: string
  status: 'error' | 'idle' | 'success'
}

function isValidEmail(email: string) {
  return email.length <= 320 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function subscribeNewsletterAction(
  _previousState: NewsletterActionState,
  formData: FormData,
): Promise<NewsletterActionState> {
  const emailValue = formData.get('email')
  const email = typeof emailValue === 'string' ? emailValue.trim() : ''

  if (!isValidEmail(email)) {
    return {
      message: 'Enter a valid email address.',
      status: 'error',
    }
  }

  const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY
  const listId = process.env.KLAVIYO_NEWSLETTER_LIST_ID

  if (!apiKey || !listId) {
    console.error('Klaviyo newsletter environment variables are not configured')
    return {
      message: 'Newsletter signup is temporarily unavailable. Please try again later.',
      status: 'error',
    }
  }

  try {
    const response = await fetch(KLAVIYO_SUBSCRIBE_URL, {
      body: JSON.stringify({
        data: {
          attributes: {
            profiles: {
              data: [
                {
                  attributes: {
                    email,
                    subscriptions: {
                      email: {
                        marketing: {
                          consent: 'SUBSCRIBED',
                        },
                      },
                    },
                  },
                  type: 'profile',
                },
              ],
            },
          },
          relationships: {
            list: {
              data: {
                id: listId,
                type: 'list',
              },
            },
          },
          type: 'profile-subscription-bulk-create-job',
        },
      }),
      cache: 'no-store',
      headers: {
        accept: 'application/vnd.api+json',
        authorization: `Klaviyo-API-Key ${apiKey}`,
        'content-type': 'application/vnd.api+json',
        revision: KLAVIYO_API_REVISION,
      },
      method: 'POST',
    })

    if (response.status !== 202) {
      console.error('Klaviyo newsletter signup failed', {
        requestId: response.headers.get('x-request-id'),
        status: response.status,
      })
      return {
        message: 'We could not complete your signup. Please try again.',
        status: 'error',
      }
    }

    return {
      message: 'Thanks! Your signup was received.',
      status: 'success',
    }
  } catch (error) {
    console.error('Klaviyo newsletter request failed', error)
    return {
      message: 'We could not complete your signup. Please try again.',
      status: 'error',
    }
  }
}
