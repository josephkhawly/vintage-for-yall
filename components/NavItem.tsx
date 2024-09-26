'use client'

import { Menu } from '@/lib/shopify/types'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function NavItem({ item }: { item: Menu }) {
  const pathname = usePathname()
  return (
    <li key={item.title} className='text-md'>
      <Link
        prefetch={true}
        className={`${pathname === item.path ? 'underline' : ''} md:text-lg`}
        href={item.path}
      >
        {item.title}
      </Link>
    </li>
  )
}
