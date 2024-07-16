import { ClipSection } from '@/components/ClipSection'
import { digitalPress } from '@/lib/publicity'

export default function Portfolio() {
  return (
    <>
      <h1 className='text-center italic mb-7'>
        Click on the icons below to view highlights from various publicity work across entertainment
        and consumer clients
      </h1>
      <ClipSection section={digitalPress} />
    </>
  )
}
