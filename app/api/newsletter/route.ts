import { NextRequest, NextResponse } from 'next/server'
import { shopifyFetch } from '@/lib/shopify'
import { newsletterSignupMutation } from '@/lib/shopify/mutations/newsletter'
import { ShopifyAdminAddCustomerOperation } from '@/lib/shopify/types'

// TODO: set up with ADMIN API key

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const res = await shopifyFetch<ShopifyAdminAddCustomerOperation>({
      query: newsletterSignupMutation,
      variables: {
        input: {
          email,
          emailMarketingConsent: {
            marketingState: 'SUBSCRIBED',
            marketingOptInLevel: 'SINGLE_OPT_IN',
            consentUpdatedAt: new Date().toISOString(),
          },
        },
      },
    })

    const { customer, userErrors } = res.body.data.customerCreate

    if (userErrors.length > 0) {
      return NextResponse.json({ error: userErrors[0].message }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      data: customer.emailMarketingConsent.marketingState,
    })
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json({ error: 'Failed to subscribe to newsletter' }, { status: 500 })
  }
}
