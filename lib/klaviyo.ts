const KLAVIYO_API_URL =
  'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/'
const KLAVIYO_REVISION = '2024-10-15'

export async function subscribeEmailToNewsletter(email: string): Promise<void> {
  const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY
  const listId = process.env.KLAVIYO_NEWSLETTER_LIST_ID

  if (!apiKey || !listId) {
    throw new Error('Newsletter signup is not configured')
  }

  const response = await fetch(KLAVIYO_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Klaviyo-API-Key ${apiKey}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      revision: KLAVIYO_REVISION,
    },
    body: JSON.stringify({
      data: {
        type: 'profile-subscription-bulk-create-job',
        attributes: {
          custom_source: 'Ugly Cry Vintage Website',
          profiles: {
            data: [
              {
                type: 'profile',
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
              },
            ],
          },
        },
        relationships: {
          list: {
            data: {
              type: 'list',
              id: listId,
            },
          },
        },
      },
    }),
  })

  // 202 Accepted is the expected success response from Klaviyo
  if (!response.ok && response.status !== 202) {
    const errorBody = await response.text()
    console.error('Klaviyo subscribe error:', response.status, errorBody)
    throw new Error('Failed to subscribe to newsletter')
  }
}
