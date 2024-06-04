import React from 'react'
import LayoutBody from '@/app/components/LayoutBody'
import Script from 'next/script'

export const metadata = {
  title: 'Simple ad Dashboard',
  description: 'Simple ad',
}
export default async function RootLayout ({ children }) {

  return (
    <html lang="en">
    <body>

    <LayoutBody {...{ children }} />
    <Script
      src="http://localhost:3001/slotsConfig.js"
      strategy="beforeInteractive"
    />
    </body>
    </html>
  )
}
