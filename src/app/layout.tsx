import React from 'react'
import PageLayout from '@/components/server/page-layout'
import { Providers } from '@/redux/provider'
import type { Metadata } from 'next'
import { HeadlessMantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications';
import '@/styles/customize.css'

export const metadata: Metadata = {
  title: '4ort3x CMS',
  description: ''
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <HeadlessMantineProvider>
            <Notifications />
            <PageLayout>{children}</PageLayout>
          </HeadlessMantineProvider>
        </Providers>
      </body>
    </html>
  )
}
