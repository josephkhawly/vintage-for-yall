import type { Metadata } from 'next'
import './globals.css'
import { Roboto, Kameron } from 'next/font/google'
import localFont from 'next/font/local'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { NewsletterModal } from '@/components/NewsletterModal'
import { getCart } from '@/lib/shopify'
import { cookies } from 'next/headers'
import { CartProvider } from '@/components/cart/CartContext'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
})

const frogmore = localFont({
  src: '../public/ED-Frogmore-Regular.otf',
  display: 'swap',
  variable: '--font-frogmore',
})

const kameron = Kameron({
  weight: ['400'],
  subsets: ['latin'],
  style: ['normal'],
  variable: '--font-kameron',
})

export const metadata: Metadata = {
  title: "Ugly Cry Vintage",
  description: '',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const cartId = cookieStore.get('cartId')?.value
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart(cartId)
  return (
    <html className='overflow-x-clip' lang='en'>
      <body
        className={`${roboto.variable} ${kameron.variable} ${frogmore.variable} overflow-x-clip bg-teal font-body text-white`}
      >
        <CartProvider cartPromise={cart}>
          <Header />
          <main className='min-h-svh'>{children}</main>
          <Footer />
          <NewsletterModal />
        </CartProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
