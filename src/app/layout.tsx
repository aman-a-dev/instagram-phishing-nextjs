import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
   title: 'Instagram Gift Hub',
   description: 'Award a plane of gifts as you are a Instagram user. '
}

export default function RootLayout({
   children
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang='en'>
         <body>
            <Toaster />
            {children}
         </body>
      </html>
   )
}
