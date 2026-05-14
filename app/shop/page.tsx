import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Shop | Ugly Cry Vintage",
  description: '',
}

export default function Shop() {

  return (
    <>
      <h1 className='text-4xl sm:text-6xl mb-8 font-frogmore text-espresso tracking-wide'>Coming soon...</h1>
      <div>
        <p>We're still working on the shop. In the meantime, you can buy from us on{' '}
          <Link
            href="https://www.depop.com/uglycryvintage/"
            className="text-espresso underline underline-offset-2"
          >
            Depop
          </Link>{' '}
          or{' '}
          <Link
            href="https://www.etsy.com/shop/UglyCryVintage"
            className="text-espresso underline underline-offset-2"
          >
            Etsy
          </Link>
          .
        </p>
      </div>
    </>
  )
}