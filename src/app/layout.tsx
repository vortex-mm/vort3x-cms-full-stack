import React from 'react'
import PageLayout from '@/components/server/page-layout'
import { Providers } from '@/redux/provider'
import type { Metadata } from 'next'
import { MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@/styles/customize.css'

export const metadata: Metadata = {
  title: '4ort3x CMS',
  description: ''
}

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <MantineProvider theme={theme}>
            <Notifications />
            <PageLayout>{children}</PageLayout>
          </MantineProvider>
        </Providers>
      </body>
    </html>
  )
}
