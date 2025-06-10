import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Easy Task Manager',
  description: 'Created By Fikri Anwar',
  generator: 'Fikri Anwar',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}