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
        className='flex items-center transition duration-150 ease-in-out focus:outline-none text-md lg:text-lg'
        aria-expanded={isOpen}
      >
        Shop
        <HiChevronDown
          className={`h-4 w-4 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className='absolute z-50 left-0 mt-2 py-2 w-56 bg-white rounded-md shadow-lg border border-gray-100 max-h-80 overflow-y-auto'>
          {collections.map((collection) => (
            <Link
              key={collection.handle}
              href={collection.path}
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out'
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
