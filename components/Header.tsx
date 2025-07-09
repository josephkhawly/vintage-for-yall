import Image from 'next/image'
import Link from 'next/link'
import logo1 from '../public/logo.png'
import { getMenu, getCollections } from '@/lib/shopify'
import NavItem from './NavItem'
import CartModal from './cart/CartModal'
import NavDropdown from './NavDropdown'

const hardcodedMenu = [
  {
    title: 'About',
    path: '/about',
  },
]

function AnnouncementBanner() {
  return (
    <div className='w-full bg-bubblegum-pink text-white py-1 md:py-2 text-center text-xs md:text-base'>
      Come see us at the Silverlake Flea July 4-6!
    </div>
  )
}

export default async function Header() {
  const menu = await getMenu('main-menu')
  const collections = await getCollections()

  // Filter out any "Shop" items from the menu to avoid duplication
  const filteredMenu = menu.filter((item) => item.title.toLowerCase() !== 'shop')

  return (
    <>
      {/* <AnnouncementBanner /> */}
      <header className='container mx-auto p-5 md:p-12 flex items-center justify-between'>
        <Link href='/' prefetch={true}>
          <Image src={logo1} alt='logo' className='w-28 md:w-[180px]' />
        </Link>
        <nav>
          <ul className='flex gap-4 items-center'>
            <li>
              <NavDropdown collections={collections} />
            </li>
            {hardcodedMenu.map((item) => (
              <NavItem key={item.title} item={item} />
            ))}
            {filteredMenu.map((item) => (
              <NavItem key={item.title} item={item} />
            ))}
            <li className='ml-8'>
              <CartModal />
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}
