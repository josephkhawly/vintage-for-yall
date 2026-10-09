'use client'

import type { Collection, Menu } from '@/lib/shopify/types'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { HiChevronDown, HiMagnifyingGlass, HiOutlineBars3 } from 'react-icons/hi2'
import logo from '../public/logo.png'
import { AnnouncementBar } from './AnnouncementBar'
import CartModal from './cart/CartModal'

type Panel = 'menu' | 'search'

interface HeaderClientProps {
  collections: Collection[]
  items: Menu[]
}

export function HeaderClient({ collections, items }: HeaderClientProps) {
  const [panel, setPanel] = useState<Panel | null>(null)
  const [content, setContent] = useState<Panel | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [query, setQuery] = useState('')
  const [shopOpen, setShopOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const panelRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  function close() {
    setPanel(null)
    setExpanded(false)
    setShopOpen(false)
  }

  function open(next: Panel) {
    setContent(next)
    setPanel(next)
    if (next !== 'menu') setShopOpen(false)
    if (expanded) return
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setExpanded(true))
    })
  }

  function toggleMenu() {
    if (panel === 'menu') close()
    else open('menu')
  }

  function toggleSearch() {
    if (panel === 'search') close()
    else open('search')
  }

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = query.trim()
    close()
    setQuery('')
    router.push(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : '/shop')
  }

  function onDrawerTransitionEnd(event: React.TransitionEvent<HTMLDivElement>) {
    if (event.propertyName !== 'grid-template-rows') return
    if (!expanded) setContent(null)
  }

  useEffect(() => {
    if (!expanded) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') close()
    }

    function onPointerDown(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        close()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [expanded])

  useEffect(() => {
    if (panel === 'search' && expanded) searchInputRef.current?.focus()
  }, [expanded, panel])

  return (
    <header className='sticky top-0 z-20'>
      <AnnouncementBar />
      <div className='px-3 pt-3 md:px-6 md:pt-5'>
        <div className='relative'>
          <div className='relative mx-auto w-full max-w-130'>
            {/* Reserves collapsed height so expansion overlays instead of pushing the page */}
            <div
              aria-hidden='true'
              className='invisible grid grid-cols-3 items-center border border-transparent px-3 py-2 md:px-5 md:py-2.5'
            >
              <span className='flex size-11 md:size-14' />
              <span className='mx-auto h-10 md:h-14' />
              <span className='flex size-11 justify-self-end md:size-14' />
            </div>

            <div
              className={clsx(
                'absolute inset-x-0 top-0 overflow-hidden rounded-[50px] border border-black bg-teal/50 text-black backdrop-blur-sm',
                content && 'z-30',
              )}
              ref={panelRef}
            >
              <div className='grid grid-cols-3 items-center px-3 py-2 md:px-5 md:py-2.5'>
                <button
                  aria-expanded={panel === 'menu'}
                  aria-label={panel === 'menu' ? 'Close menu' : 'Open menu'}
                  className='flex cursor-pointer items-center gap-2 justify-self-start'
                  onClick={toggleMenu}
                  type='button'
                >
                  <span
                    className={clsx(
                      'flex size-11 items-center justify-center rounded-full border border-black transition-colors duration-300 md:size-14',
                      panel === 'menu' && 'bg-white',
                    )}
                  >
                    <HiOutlineBars3 className='size-6 md:size-7' />
                  </span>
                </button>

                <Link className='justify-self-center' href='/' onClick={close} prefetch={true}>
                  <Image
                    alt='Ugly Cry Vintage'
                    className='h-10 w-auto md:h-20'
                    priority
                    src={logo}
                  />
                </Link>

                <button
                  aria-expanded={panel === 'search'}
                  aria-label={panel === 'search' ? 'Close search' : 'Open search'}
                  className='flex cursor-pointer items-center gap-2 justify-self-end'
                  onClick={toggleSearch}
                  type='button'
                >
                  <span
                    className={clsx(
                      'flex size-11 items-center justify-center rounded-full border border-black transition-colors duration-300 md:size-14',
                      panel === 'search' && 'bg-white',
                    )}
                  >
                    <HiMagnifyingGlass className='size-6 md:size-7' />
                  </span>
                </button>
              </div>

              <div
                className={clsx(
                  'grid transition-[grid-template-rows] duration-300 ease-out',
                  expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
                onTransitionEnd={onDrawerTransitionEnd}
              >
                <div className='min-h-0 overflow-hidden'>
                  {content === 'menu' ? (
                    <nav aria-label='Primary'>
                      <ul>
                        {items.map((item) => {
                          if (item.title.toLowerCase() === 'shop') {
                            return (
                              <li className='border-t border-black' key={item.title}>
                                <button
                                  aria-expanded={shopOpen}
                                  className='flex w-full cursor-pointer items-center justify-center gap-2 py-4 font-subheading text-2xl italic tracking-wide transition-colors hover:text-espresso md:text-3xl'
                                  onClick={() => setShopOpen((open) => !open)}
                                  type='button'
                                >
                                  {item.title}
                                  <HiChevronDown
                                    className={clsx(
                                      'size-5 transition-transform duration-200 md:size-6',
                                      shopOpen && 'rotate-180',
                                    )}
                                  />
                                </button>
                                <div
                                  className={clsx(
                                    'grid transition-[grid-template-rows] duration-300 ease-out',
                                    shopOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                                  )}
                                >
                                  <ul className='min-h-0 overflow-hidden'>
                                    {collections.map((collection) => (
                                      <li key={collection.handle || 'all'}>
                                        <Link
                                          className='block py-1.5 text-center font-subheading text-lg italic tracking-wide transition-colors hover:text-white data-[active=true]:text-espresso md:text-xl'
                                          data-active={pathname === collection.path}
                                          href={collection.path}
                                          onClick={close}
                                          prefetch={true}
                                        >
                                          {collection.title}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </li>
                            )
                          }

                          return (
                            <li className='border-t border-black' key={item.title}>
                              <Link
                                className='block py-4 text-center font-subheading text-2xl italic tracking-wide transition-colors hover:text-espresso data-[active=true]:text-espresso md:text-3xl'
                                data-active={pathname === item.path}
                                href={item.path}
                                onClick={close}
                                prefetch={true}
                              >
                                {item.title}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                      <div className='flex items-center justify-end border-t border-black px-5 py-4'>
                        <a
                          className='font-subheading text-sm uppercase transition-colors hover:text-espresso'
                          href='https://uglycryvintage.substack.com/'
                          rel='noopener noreferrer'
                          target='_blank'
                        >
                          Subscribe
                        </a>
                      </div>
                    </nav>
                  ) : null}

                  {content === 'search' ? (
                    <form
                      className='flex items-center gap-4 border-t border-black px-5 py-4'
                      onSubmit={submitSearch}
                    >
                      <input
                        className='w-full bg-transparent font-subheading text-sm uppercase outline-none placeholder:text-black/40'
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder='Type to search'
                        ref={searchInputRef}
                        type='search'
                        value={query}
                      />
                      <button
                        className='shrink-0 font-subheading text-sm uppercase text-black/40 transition-colors hover:text-black'
                        onClick={() => setQuery('')}
                        type='button'
                      >
                        Clear
                      </button>
                    </form>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className='absolute inset-y-0 right-0 z-30 flex items-center'>
            <CartModal />
          </div>
        </div>
      </div>
    </header>
  )
}
