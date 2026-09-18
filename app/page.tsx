import NewsletterSignup from '@/components/NewsletterSignup'

export default function Home() {
  return (
    <div className='flex min-h-[70vh] items-center justify-center'>
      <article className='w-full max-w-xl text-left font-body text-lg leading-relaxed md:text-xl md:leading-relaxed'>
        <p className='mb-6 italic'>To my vintage-loving baddies,</p>

        <p className='mb-4 italic'>
          Our first drop goes live <span className='font-bold'>October 2 at 12:00PM PST</span>.
          <br />
          Sign up below to get first dibs on this and future pieces, plus an exclusive
          welcome discount.
        </p>

        <div className='my-8'>
          <NewsletterSignup />
        </div>

        <p className='mb-6 italic'>
          In the meantime, you can still buy from us on{' '}
          <a
            href='https://www.depop.com/uglycryvintage/'
            target='_blank'
            rel='noopener noreferrer'
            className='underline underline-offset-4 transition-colors hover:text-espresso'
          >
            Depop
          </a>{' '}
          and{' '}
          <a
            href='https://www.etsy.com/shop/UglyCryVintage'
            target='_blank'
            rel='noopener noreferrer'
            className='underline underline-offset-4 transition-colors hover:text-espresso'
          >
            Etsy
          </a>
          .
        </p>

        <p className='mb-6 italic'>Can&apos;t wait to share more with you!</p>

        <p className='mb-8 italic'>
          XO,
          <br />
          Ariel
        </p>

        <p className='text-base md:text-lg opacity-90 italic'>
          P.S. If you want to keep up with fashion world controversies, what to shop
          secondhand right now (with links!), and vintage in pop culture/current trends, you
          should sign up for UCV&apos;s{' '}
          <a
            href='https://uglycryvintage.substack.com/?utm_campaign=profile_chips'
            target='_blank'
            rel='noopener noreferrer'
            className='underline underline-offset-4 transition-colors hover:text-espresso'
          >
            Secondhand Hysteria
          </a>{' '}
          on Substack.
        </p>
      </article>
    </div>
  )
}
