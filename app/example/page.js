import React from 'react'
import Script from 'next/script'
import Body from '@/app/example/Body'

export default function Example () {

  return (
    <main>
      <Script
        async
        src="https://www.googletagservices.com/tag/js/gpt.js"
      />

      <Script id="show-banner">
        {` var googletag = googletag || {}; googletag.cmd = googletag.cmd || [];`}
      </Script>
      <Body/>
    </main>
  )
}
