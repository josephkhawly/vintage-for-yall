import Image from 'next/image'

export const ClipSection = ({ section }: any) => {
  return (
    <div className='lg:flex justify-between items-start mt-24'>
      <h1 className='text-6xl lg:text-9xl mb-8'>{section.name}</h1>
      <div>
        {section.clippings.map((clipping: any) => (
          <div key={clipping.url} className='mb-4'>
            <a href={clipping.url} target='_blank' rel='noopener noreferrer'>
              <Image src={clipping.image} alt={clipping.alt} width={600} height={600} />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
