import React from 'react'
import LayoutBody from '@/app/components/LayoutBody'
export const metadata = {
  title: 'Acme Dashboard',
  description: 'The official Next.js Course Dashboard, built with App Router.',
  'ad-targeting':  ['mark', 'dd'],
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
export default async function RootLayout ({ children }) {

  return (
    <html lang="en">
    <body>
       <LayoutBody {...{children}} />
    </body>
    </html>
  )
}
