'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { HiChevronDown } from 'react-icons/hi2'

import type { ProductDetail } from '@/lib/shopify/types'

interface ProductAccordionsProps {
  details: ProductDetail[]
}

export function ProductAccordions({ details }: ProductAccordionsProps) {
  if (details.length === 0) return null

  return (
    <div className='divide-espresso/15 border-espresso/15 mt-8 divide-y border-y'>
      {details.map((detail) => (
        <Disclosure as='div' key={detail.key}>
          <DisclosureButton className='group text-espresso flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left font-medium tracking-wide'>
            <span>{detail.title}</span>
            <HiChevronDown className='size-5 shrink-0 transition group-data-[open]:rotate-180' />
          </DisclosureButton>
          <DisclosurePanel className='text-espresso/80 overflow-hidden pb-4 text-sm leading-relaxed break-words whitespace-pre-wrap'>
            {detail.value}
          </DisclosurePanel>
        </Disclosure>
      ))}
    </div>
  )
}
