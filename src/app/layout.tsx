import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { MSWProvider } from './msw-provider'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Bookshelf',
  description: 'A bookshelf for your favorite books',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MSWProvider>{children}</MSWProvider>
      </body>
    </html>
  )
}
