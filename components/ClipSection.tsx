import Image from 'next/image'

export const ClipSection = ({ section }: any) => {
  return (
    <div className='mt-24 items-start justify-between lg:flex'>
      <h1 className='mb-8 text-6xl lg:w-1/2 xl:text-9xl'>{section.name}</h1>
      <div className='grid gap-4 md:grid-cols-2 lg:w-1/2'>
        {section.clippings.map((clipping: any) => (
          <a key={clipping.alt} href={clipping.url} target='_blank' rel='noopener noreferrer'>
            <Image src={clipping.image} alt={clipping.alt} width={600} height={600} />
          </a>
        ))}
      </div>
    </div>
  )
}
