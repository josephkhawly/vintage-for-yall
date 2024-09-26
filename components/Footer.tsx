import { FaInstagram } from 'react-icons/fa'
import { BsSubstack } from 'react-icons/bs'
import { getMenu } from '@/lib/shopify'

export default async function Footer() {
  const menu = await getMenu('footer')
  return (
    <footer className='container mx-auto p-6 md:p-12 flex items-center justify-between'>
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
      {/* <p className='text-sm text-center'>
            &copy; {new Date().getFullYear()} Vintage for Y'all
        </p> */}
    </footer>
  )
}
