import { getCollections, getMenu } from '@/lib/shopify'
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
  const [collections, menu] = await Promise.all([getCollections(), getMenu('main-menu')])
  const filteredMenu = menu.filter((item) => !excludedTitles.has(item.title.toLowerCase()))

  const items = [...hardcodedMenu, ...filteredMenu]

  return <HeaderClient collections={collections} items={items} />
}
