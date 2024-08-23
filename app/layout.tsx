import type { Metadata } from 'next'
import './globals.css'
import { Poppins } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
  return (
    <html lang='en'>
      <body className={`${poppins.className} text-black`}>
        <Header />
        <main className='min-h-screen p-6 md:p-12 container mx-auto'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
