import '../styles/globals.css'

import type { Metadata } from 'next'

import { RootProviders } from './providers'

export const metadata: Metadata = {
  title: 'Create Next App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  )
}
