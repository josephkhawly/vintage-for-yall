import { HiShoppingCart } from 'react-icons/hi'
import clsx from 'clsx'

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string
  quantity?: number
}) {
  return (
    <div className='relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors'>
      <HiShoppingCart
        className={clsx('h-4 transition-all ease-in-out hover:scale-110', className)}
      />

      {quantity ? (
        <div className='absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white'>
          {quantity}
        </div>
      ) : null}
    </div>
  )
}
