import Image from 'next/image'
import Link from 'next/link'
import logo1 from '../public/logo.png'
import { getMenu } from '@/lib/shopify'
import NavItem from './NavItem'
import CartModal from './cart/CartModal'

export default async function Header() {
  const menu = await getMenu('main-menu')
  return (
    <header className='container mx-auto p-6 md:p-12 flex items-center justify-between'>
      <Link href='/' prefetch={true}>
        <Image src={logo1} alt='logo' width={150} />
      </Link>
      <nav>
        <ul className='flex gap-4 items-center'>
          <li>
            <Link prefetch={true} href='/shop'>
              Shop
            </Link>
          </li>
          {menu.map((item) => (
            <NavItem key={item.title} item={item} />
          ))}
          <li>
            <CartModal />
          </li>
        </ul>
      </nav>
    </header>
  )
}
