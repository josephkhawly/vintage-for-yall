import { BsSubstack } from 'react-icons/bs'
import { FaInstagram } from 'react-icons/fa'
import { NewsletterForm } from '@/components/newsletter/NewsletterForm'
import { getMenu } from '@/lib/shopify'

export default async function Footer() {
  const menu = await getMenu('footer')
  const year = new Date().getFullYear()

  return (
    <footer className='container mx-auto flex flex-col gap-6 p-6 md:flex-row md:items-stretch md:justify-between md:p-12'>
      <div className='contents md:flex md:flex-col md:justify-between md:gap-6'>
        <div className='order-1 flex flex-col items-start gap-3 md:order-none md:flex-row md:items-center md:gap-5'>
          {menu.map((item) => (
            <a
              key={item.title}
              href={item.path}
              className='font-subheading text-lg hover:underline'
            >
              {item.title}
            </a>
          ))}
          <div className='flex items-center gap-5'>
            <a href='https://www.instagram.com/uglycryvintage' target='_blank'>
              <FaInstagram className='text-espresso text-3xl' />
            </a>
            <a href='https://uglycryvintage.substack.com/' target='_blank'>
              <BsSubstack className='text-espresso size-6 text-3xl' />
            </a>
          </div>
        </div>
        <p className='font-body text-espresso/60 order-3 text-xs md:order-none'>
          © {year} Ugly Cry Vintage
        </p>
      </div>
      <div className='order-2 flex flex-col gap-2 md:order-none'>
        <h2 className='font-frogmore text-espresso text-5xl tracking-wide'>Join the list</h2>
        <p className='font-body text-espresso/80 max-w-xs text-sm'>
          New drops, shop updates, and stories from the rack.
        </p>
        <NewsletterForm variant='footer' />
      </div>
    </footer>
  )
}
