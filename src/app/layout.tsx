import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/redux/provider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'זמני היום',
  description: 'אפילקציית זמני היום עבור בתי כנסת',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body 
          
      className={inter.className}>
        <Providers>
          {children}
        </Providers>
        </body>
    </html>
  )
}
