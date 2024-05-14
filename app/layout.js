import React from 'react'
import LayoutBody from '@/app/components/LayoutBody'
export default async function RootLayout ({ children }) {

  return (
    <html lang="en">
    <body>
       <LayoutBody {...{children}} />
    </body>
    </html>
  )
}
