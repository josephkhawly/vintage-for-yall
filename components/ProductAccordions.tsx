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
    <div className='mt-8 divide-y divide-espresso/15 border-y border-espresso/15'>
      {details.map((detail) => (
        <Disclosure as='div' key={detail.key}>
          <DisclosureButton className='group flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left font-medium tracking-wide text-espresso'>
            <span>{detail.title}</span>
            <HiChevronDown className='size-5 shrink-0 transition group-data-[open]:rotate-180' />
          </DisclosureButton>
          <DisclosurePanel className='overflow-hidden pb-4 whitespace-pre-wrap break-words text-sm leading-relaxed text-espresso/80'>
            {detail.value}
          </DisclosurePanel>
        </Disclosure>
      ))}
    </div>
  )
}
