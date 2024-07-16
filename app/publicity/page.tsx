import { ClipSection } from '@/components/ClipSection'
import { digitalPress, video } from '@/lib/publicity'

export default function Portfolio() {
  return (
    <>
      <h1 className='text-center italic mb-7'>
        Click on the icons below to view highlights from various publicity work across entertainment
        and consumer clients
      </h1>
      <ClipSection section={digitalPress} />
      <ClipSection section={video} />
      {/* <ClipSection section={video} /> */}
      {/* <ClipSection section={onSite} /> */}
      {/* <ClipSection section={socialMedia} /> */}
      {/* <ClipSection section={podcasts} /> */}
      {/* <ClipSection section={awards} /> */}
      {/* <ClipSection section={print} /> */}
    </>
  )
}
