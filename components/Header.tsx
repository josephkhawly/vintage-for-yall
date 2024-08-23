import Image from 'next/image'
import Link from 'next/link'
import logo1 from '../public/logo.png'
import { getMenu } from '@/lib/shopify'
import NavItem from './NavItem'

export default async function Header() {
  const menu = await getMenu('main-menu')
  return (
    <header className='container mx-auto p-6 md:p-12 flex items-center justify-between'>
      <Link href='/'>
        <Image src={logo1} alt='logo' width={150} />
      </Link>
      <nav>
        <ul className='flex gap-4'>
          <li>
            <Link href='/shop'>Shop</Link>
          </li>
          {menu.map((item) => (
            <NavItem key={item.title} item={item} />
          ))}
        </ul>
      </nav>
    </header>
  )
}
