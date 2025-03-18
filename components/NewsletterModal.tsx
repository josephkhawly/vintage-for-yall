'use client'

import { useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { useNewsletterForm } from '@/lib/hooks/useNewsletterForm'

export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false)

  const { email, setEmail, status, errorMessage, handleSubmit } = useNewsletterForm({
    onSuccess: () => {
      // Close modal after successful submission after a delay
      setTimeout(() => setIsOpen(false), 3000)
    },
  })

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited')
    if (!hasVisited) {
      setIsOpen(true)
      localStorage.setItem('hasVisited', 'true')
    }
  }, [])

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-lg p-8 max-w-lg w-full relative'>
        <button
          onClick={() => setIsOpen(false)}
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
        >
          <IoClose size={24} />
        </button>
        <h2 className='text-3xl font-bold mb-4'>Join Our Newsletter</h2>
        <p className='text-black mb-6 text-2xl'>
          Subscribe to get updates on new arrivals, exclusive offers, and vintage fashion tips!
        </p>

        {status === 'success' ? (
          <div className='text-green-600 p-4 bg-green-50 rounded-md'>
            Thanks for subscribing! We&apos;ve added you to our mailing list.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              className='p-2 border border-gray-300 rounded-md'
              required
              disabled={status === 'loading'}
            />
            {status === 'error' && <div className='text-red-500 text-sm'>{errorMessage}</div>}
            <button
              type='submit'
              className='p-3 bg-dark-magenta text-white rounded-md hover:bg-opacity-90 disabled:bg-opacity-70 disabled:cursor-not-allowed text-lg'
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
