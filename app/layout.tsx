import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BiomysticY Blog',
  description: 'Kişisel blog ve düşünceler',
  keywords: ['blog', 'yazılar', 'kişisel'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}