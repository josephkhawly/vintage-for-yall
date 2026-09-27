import { BsSubstack } from 'react-icons/bs'
import { FaInstagram } from 'react-icons/fa'
import { NewsletterForm } from '@/components/newsletter/NewsletterForm'
import { getMenu } from '@/lib/shopify'

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
      <div className='flex flex-col gap-2'>
        <h2 className='font-frogmore text-5xl tracking-wide text-espresso'>Join the list</h2>
        <p className='max-w-xs font-body text-sm text-espresso/80'>
          New drops, shop updates, and stories from the rack.
        </p>
        <NewsletterForm variant='footer' />
      </div>
    </footer>
  )
}
