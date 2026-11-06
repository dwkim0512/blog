import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Golden Record",
  description: '개발하며 배운 기술과 경험을 기록하는 Golden Record.',
  generator: 'Next.js',
  icons: {
    icon: '/icon.svg',  // app/icon.svg 파일 사용
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
