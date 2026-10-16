import { pressClippings } from '@/lib/writingSamples'
import Image from 'next/image'
import type { Metadata } from 'next'
import { PageContainer } from '@/components/PageContainer'

export const metadata: Metadata = {
  title: "Press | Ugly Cry Vintage",
  description: '',
}

export default function Press() {
  return (
    <PageContainer>
      <div className='items-start justify-between lg:flex'>
        <h1 className='mb-8 font-frogmore text-6xl tracking-wide text-espresso lg:text-9xl'>
          Published Press
        </h1>
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
    </PageContainer>
  )
}
