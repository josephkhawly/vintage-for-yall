'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { HiChevronDown } from 'react-icons/hi2'

interface ProductAccordionsProps {
  condition: string | null
  materials: string | null
  measurements: string | null
  notes: string | null
}

export function ProductAccordions({
  condition,
  materials,
  measurements,
  notes,
}: ProductAccordionsProps) {
  const sections = [
    { body: materials, title: 'Materials' },
    { body: measurements, title: 'Measurements' },
    { body: condition, title: 'Condition' },
    { body: notes, title: 'Notes' },
  ].filter((section) => section.body)

  if (sections.length === 0) return null

  return (
    <div className='mt-8 divide-y divide-espresso/15 border-y border-espresso/15'>
      {sections.map((section) => (
        <Disclosure as='div' key={section.title}>
          <DisclosureButton className='group flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left font-medium tracking-wide text-espresso'>
            <span>{section.title}</span>
            <HiChevronDown className='size-5 shrink-0 transition group-data-[open]:rotate-180' />
          </DisclosureButton>
          <DisclosurePanel className='pb-4 whitespace-pre-wrap text-sm leading-relaxed text-espresso/80'>
            {section.body}
          </DisclosurePanel>
        </Disclosure>
      ))}
    </div>
  )
}
