import { BsSubstack } from 'react-icons/bs'
import { FaInstagram } from 'react-icons/fa'
import { getMenu } from '@/lib/shopify'

async function subscribeNewsletterAction(_formData: FormData) {
  'use server'
}

export default async function Footer() {
  const menu = await getMenu('footer')
  return (
    <footer className='container mx-auto flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-12'>
      <div className='flex items-center gap-5'>
        {menu.map((item) => (
          <a key={item.title} href={item.path} className='text-lg hover:underline'>
            {item.title}
          </a>
        ))}
        <a href='https://www.instagram.com/uglycryvintage' target='_blank'>
          <FaInstagram className='text-3xl text-espresso' />
        </a>
        <a href='https://uglycryvintage.substack.com/' target='_blank'>
          <BsSubstack className='text-3xl text-espresso size-6' />
        </a>
      </div>
      <form action={subscribeNewsletterAction} className='flex items-center gap-2'>
        <label htmlFor='newsletter-email' className='sr-only'>
          Email address
        </label>
        <input
          autoComplete='email'
          className='min-w-0 flex-1 rounded-md border border-espresso/20 bg-white px-3 py-2 text-espresso placeholder:text-espresso/50 md:w-56 md:flex-none'
          id='newsletter-email'
          name='email'
          placeholder='Email'
          required
          type='email'
        />
        <button
          className='shrink-0 rounded-md bg-silver px-4 py-2 tracking-wide text-espresso hover:opacity-90'
          type='submit'
        >
          Subscribe
        </button>
      </form>
    </footer>
  )
}
