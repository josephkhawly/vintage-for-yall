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
]

const excludedTitles = new Set(['home', 'press', 'shop'])

export default async function Header() {
  const [menu, shopItems] = await Promise.all([getMenu('main-menu'), getMenu('shop-dropdown')])
  const filteredMenu = menu.filter((item) => !excludedTitles.has(item.title.toLowerCase()))

  const items = [...hardcodedMenu, ...filteredMenu]

  return <HeaderClient items={items} shopItems={shopItems} />
}
