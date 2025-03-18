import { useState, FormEvent } from 'react'
import { subscribeToNewsletter } from '@/lib/newsletter'

interface UseNewsletterFormProps {
  onSuccess?: () => void
}

export function useNewsletterForm({ onSuccess }: UseNewsletterFormProps = {}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const result = await subscribeToNewsletter(email)

    if (result.success) {
      setStatus('success')
      setEmail('')

      if (onSuccess) {
        onSuccess()
      }
    } else {
      setStatus('error')
      setErrorMessage(result.error || 'Failed to subscribe')
    }
  }

  const resetForm = () => {
    setStatus('idle')
    setEmail('')
    setErrorMessage('')
  }

  return {
    email,
    setEmail,
    status,
    errorMessage,
    handleSubmit,
    resetForm,
  }
}
