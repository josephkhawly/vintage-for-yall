export const newsletterSignupMutation = `
mutation customerCreate($input: CustomerInput!) {
  customerCreate(input: $input) {
    customer {
      id
      email
      emailMarketingConsent {
        marketingState
      }
    }
    userErrors {
      field
      message
    }
  }
}
`
