interface SubscribeResult {
  success: boolean
  error?: string
  status: 'loading' | 'success' | 'error' | 'idle'
}

export async function subscribeToNewsletter(email: string): Promise<SubscribeResult> {
  try {
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Failed to subscribe',
        status: 'error',
      }
    }

    return {
      success: true,
      status: 'success',
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to subscribe',
      status: 'error',
    }
  }
}
