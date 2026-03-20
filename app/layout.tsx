import type { Metadata } from 'next'
import { DM_Serif_Display, DM_Mono, Inter } from 'next/font/google'
import './globals.css'

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'Emmanuel Oghene — Fullstack Developer',
  description:
    'Fullstack developer specialising in SaaS products — multi-role systems, subscription infrastructure, and real-time features. Next.js, Node, Postgres.',
  openGraph: {
    title: 'Emmanuel Oghene — Fullstack Developer',
    description: 'Building SaaS products that ship.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${dmMono.variable} ${inter.variable}`}>
      <body className="bg-bg text-primary antialiased">{children}</body>
    </html>
  )
}
