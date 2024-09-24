import Image from 'next/image'
import Link from 'next/link'
import logo1 from '../public/logo.png'
import { getMenu } from '@/lib/shopify'
import NavItem from './NavItem'
import CartModal from './cart/CartModal'

export default async function Header() {
  const menu = await getMenu('main-menu')
  return (
    <header className='container mx-auto p-5 md:p-12 flex items-center justify-between'>
      <Link href='/' prefetch={true}>
        <Image src={logo1} alt='logo' className='w-28 md:w-[180px]' />
      </Link>
      <nav>
        <ul className='flex gap-4 items-center'>
          <li>
            <Link prefetch={true} href='/shop'>
              Shop
            </Link>
          </li>
          <li>
            <Link prefetch={true} href='/about'>
              About
            </Link>
          </li>
          {menu.map((item) => (
            <NavItem key={item.title} item={item} />
          ))}
          <li className='ml-8'>
            <CartModal />
          </li>
        </ul>
      </nav>
    </header>
  )
}
