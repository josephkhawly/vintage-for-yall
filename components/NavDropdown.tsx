'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Collection } from '@/lib/shopify/types'
import { HiChevronDown } from 'react-icons/hi'

export default function NavDropdown({ collections }: { collections: Collection[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='text-md flex items-center transition duration-150 ease-in-out focus:outline-none lg:text-lg'
        aria-expanded={isOpen}
      >
        Shop
        <HiChevronDown
          className={`ml-1 size-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className='absolute left-0 z-50 mt-2 max-h-80 w-56 overflow-y-auto rounded-md border border-gray-100 bg-white py-2 shadow-lg'>
          {collections.map((collection) => (
            <Link
              key={collection.handle}
              href={collection.path}
              className='block px-4 py-2 text-sm text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100'
              onClick={() => setIsOpen(false)}
            >
              {collection.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
