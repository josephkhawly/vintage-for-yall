import { pressClippings, sampleLinks } from '@/lib/writingSamples'
import Image from 'next/image'

export default function Portfolio() {
  return (
    <>
      <h1 className='text-9xl mb-8'>Writing Samples</h1>
      {sampleLinks.map((sample) => (
        <div key={sample.slug} className='mb-4'>
          <a href={`/portfolio/${sample.slug}`}>{sample.title}</a>
        </div>
      ))}
      <div className='flex justify-between'>
        <h1 className='text-9xl mb-8'>Published Press</h1>
        <div>
          {pressClippings.map((clipping) => (
            <div key={clipping.url} className='mb-4'>
              <a href={clipping.url} target='_blank' rel='noopener noreferrer'>
                <Image
                  src={clipping.image}
                  alt={clipping.alt}
                  className='w-96'
                  width={500}
                  height={500}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
