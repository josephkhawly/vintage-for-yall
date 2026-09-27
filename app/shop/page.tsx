import type { Metadata } from 'next'
import Link from 'next/link'
import { PageContainer } from '@/components/PageContainer'

export const metadata: Metadata = {
  title: "Shop | Ugly Cry Vintage",
  description: '',
}

export default function Shop() {
  return (
    <PageContainer>
      <h1 className='mb-8 font-frogmore text-4xl tracking-wide text-espresso sm:text-6xl'>Coming soon...</h1>
      <div>
        <p>
          We're still working on the shop. In the meantime, you can buy from us on{' '}
          <Link
            className='text-espresso underline underline-offset-2'
            href='https://www.depop.com/uglycryvintage/'
          >
            Depop
          </Link>{' '}
          or{' '}
          <Link
            className='text-espresso underline underline-offset-2'
            href='https://www.etsy.com/shop/UglyCryVintage'
          >
            Etsy
          </Link>
          .
        </p>
      </div>
    </PageContainer>
  )
}
