'use client'

import { FaInstagram } from 'react-icons/fa'
import { BsSubstack } from 'react-icons/bs'
import { useNewsletterForm } from '@/lib/hooks/useNewsletterForm'

export default function Footer({ menu }: { menu: Array<{ title: string; path: string }> }) {
  const { email, setEmail, status, errorMessage, handleSubmit, resetForm } = useNewsletterForm({
    onSuccess: () => {
      // Reset success state after 5 seconds
      setTimeout(() => resetForm(), 5000)
    },
  })

  return (
    <footer className='container mx-auto p-6 md:p-12 flex items-center justify-between'>
      <div className='flex flex-col gap-5'>
        <div className='flex items-center gap-5'>
          {menu.map((item) => (
            <a key={item.title} href={item.path} className='text-lg hover:underline'>
              {item.title}
            </a>
          ))}
          <a href='https://www.instagram.com/vintageforyall' target='_blank'>
            <FaInstagram className='text-3xl text-dark-magenta' />
          </a>
          <a href='https://vintageforyall.substack.com' target='_blank'>
            <BsSubstack className='text-3xl text-dark-magenta w-6 h-6' />
          </a>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col md:flex-row items-center gap-3'>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            className='p-2 border border-gray-300 rounded-md'
            required
            disabled={status === 'loading'}
          />
          <button
            type='submit'
            className='p-2 bg-dark-magenta text-white rounded-md disabled:bg-opacity-70'
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
          {status === 'success' && <span className='text-green-600 text-sm ml-2'>Subscribed!</span>}
          {status === 'error' && <span className='text-red-500 text-sm ml-2'>{errorMessage}</span>}
        </form>
      </div>
    </footer>
  )
}
