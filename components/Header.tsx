import Image from 'next/image'
import Link from 'next/link'
import logo1 from '../public/logo.png'
import { getMenu, getCollections } from '@/lib/shopify'
import NavItem from './NavItem'
// import CartModal from './cart/CartModal'
// import NavDropdown from './NavDropdown'

const hardcodedMenu = [
  {
    title: 'Shop',
    path: '/shop',
  },
  // {
  //   title: 'About',
  //   path: '/about',
  // },
  {
    title: 'Blog',
    path: '/blog',
  },
  {
    title: 'Press',
    path: '/press',
  },
]

// function AnnouncementBanner() {
//   return (
//     <div className='w-full bg-bubblegum-pink text-white py-1 md:py-2 text-center text-xs md:text-base'>
//       Come see us at the Silverlake Flea July 4-6!
//     </div>
//   )
// }

export default async function Header() {
  const menu = await getMenu('main-menu')
  const collections = await getCollections()

  // Filter out any "Shop" items from the menu to avoid duplication
  const filteredMenu = menu.filter((item) => item.title.toLowerCase() !== 'shop')

  return (
    <>
      {/* <AnnouncementBanner /> */}
      <header className='sticky top-0 z-20 border-b border-white/10 bg-teal/50 backdrop-blur-sm'>
        <div className='container mx-auto flex items-center justify-between px-5 py-3 md:px-12 md:py-5'>
          <Link href='/' prefetch={true}>
            <Image src={logo1} alt='logo' className='w-20 md:w-37.5' />
          </Link>
          <nav>
            <ul className='flex gap-4 items-center'>
              <NavItem item={{ title: 'Home', path: '/' }} />
              {hardcodedMenu.map((item) => (
                <NavItem key={item.title} item={item} />
              ))}
              {filteredMenu.map((item) => (
                <NavItem key={item.title} item={item} />
              ))}
              {/* <li className='ml-8'>
                <CartModal />
              </li> */}
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}
