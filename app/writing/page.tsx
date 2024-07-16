import { pressClippings, sampleLinks } from '@/lib/writingSamples'
import Image from 'next/image'
import Link from 'next/link'

export default function Portfolio() {
  return (
    <>
      <div className='lg:flex justify-between items-center mb-40'>
        <h1 className='text-6xl lg:text-9xl mb-8'>Writing Samples</h1>
        <div>
          {sampleLinks.map((sample) => (
            <div key={sample.slug} className='mb-4'>
              <Link href={`/writing/${sample.slug}`} className='underline'>
                {sample.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className='lg:flex justify-between items-start'>
        <h1 className='text-6xl lg:text-9xl mb-8'>Published Press</h1>
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
