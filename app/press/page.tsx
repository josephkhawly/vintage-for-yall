import { pressClippings } from '@/lib/writingSamples'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Press | Ugly Cry Vintage",
  description: '',
}

export default function Press() {
  return (
    <>
      <div className='lg:flex justify-between items-start'>
        <h1 className='text-6xl lg:text-9xl mb-8 font-frogmore text-espresso tracking-wide'>Published Press</h1>
        <div>
          {pressClippings.map((clipping) => (
            <div key={clipping.url} className='mb-4'>
              <a href={clipping.url} target='_blank' rel='noopener noreferrer'>
                <Image src={clipping.image} alt={clipping.alt} width={600} height={600} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
