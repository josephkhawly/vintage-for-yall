import { getMenu } from '@/lib/shopify'
import { HeaderClient } from './Header-client'

const hardcodedMenu = [
  {
    path: '/shop',
    title: 'Shop',
  },
  {
    path: '/blog',
    title: 'Blog',
  },
  {
    path: '/press',
    title: 'Press',
  },
]

export default async function Header() {
  const menu = await getMenu('main-menu')
  const filteredMenu = menu.filter((item) => item.title.toLowerCase() !== 'shop')

  const items = [
    { path: '/', title: 'Home' },
    ...hardcodedMenu,
    ...filteredMenu,
  ]

  return <HeaderClient items={items} />
}
