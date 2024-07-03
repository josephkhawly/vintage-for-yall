import { sampleLinks } from '@/lib/writingSamples'

export default function Portfolio() {
  return (
    <>
      <h1 className='text-8xl mb-8'>Writing Samples</h1>
      {sampleLinks.map((sample) => (
        <div key={sample.slug} className='mb-4'>
          <a href={`/portfolio/${sample.slug}`}>{sample.title}</a>
        </div>
      ))}
      <h1 className='text-8xl mb-8'>Published Press</h1>
    </>
  )
}
