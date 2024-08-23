'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import logo1 from '../public/logo.png'

export default function Header() {
  const pathname = usePathname()
  return (
    <header className='container mx-auto p-6 md:p-12 flex items-center justify-between'>
      <Link href='/'>
        <Image src={logo1} alt='logo' width={150} />
      </Link>
      <nav>
        <ul className='flex gap-4'>
          {/* <li>
            <Link href='/'>About</Link>
          </li> */}
          <li>
            <Link className={pathname === '/shop' ? 'underline' : ''} href='/shop'>
              Shop
            </Link>
          </li>
          <li>
            <Link className={pathname === '/writing' ? 'underline' : ''} href='/writing'>
              Writing Samples
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
