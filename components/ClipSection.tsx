import Image from 'next/image'

export const ClipSection = ({ section }: any) => {
  return (
    <div className='lg:flex justify-between items-start mt-24'>
      <h1 className='text-6xl xl:text-9xl mb-8 lg:w-1/2'>{section.name}</h1>
      <div className='grid md:grid-cols-2 gap-4 lg:w-1/2'>
        {section.clippings.map((clipping: any) => (
          <a key={clipping.alt} href={clipping.url} target='_blank' rel='noopener noreferrer'>
            <Image src={clipping.image} alt={clipping.alt} width={600} height={600} />
          </a>
        ))}
      </div>
    </div>
  )
}
