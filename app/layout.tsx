import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/contexts/auth-context'
import './globals.css'

const nunito = Nunito({
  subsets: ["latin"],
  variable: '--font-nunito',
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: 'PolytoonEnglish - Master TOEIC & Vocabulary',
  description: 'Your ultimate platform for TOEIC practice and English vocabulary learning. Master all 7 parts of the TOEIC test with comprehensive exercises.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
