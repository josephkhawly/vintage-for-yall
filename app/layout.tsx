import type { Metadata } from 'next'
import './globals.css'
import { Poppins } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getCart } from '@/lib/shopify'
import { cookies } from 'next/headers'
import { CartProvider } from '@/components/cart/CartContext'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: "Vintage for Y'all",
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cartId = cookies().get('cartId')?.value
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart(cartId)
  return (
    <html lang='en'>
      <body className={`${poppins.className} text-black`}>
        <CartProvider cartPromise={cart}>
          <Header />
          <main className='min-h-screen p-6 md:p-12 container mx-auto'>{children}</main>
          <Footer />
        </CartProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
