'use client'

import Ad from '@/app/components/Ad'
import useInit from '@/app/components/Ad/hooks/useInit'
import React, { useEffect } from 'react'
import Script from 'next/script'

export default function Example () {
  const { setPageTargeting } = useInit()

  useEffect(() => {
    setPageTargeting('Mark', 'wang')
  }, [])

  return (
    <main>
      <Script
        async
        src="https://www.googletagservices.com/tag/js/gpt.js"
      />
      <Script id="show-banner">
        {` var googletag = googletag || {}; googletag.cmd = googletag.cmd || [];`}
      </Script>
      <meta name="ad-targeting" content="google-ad-targeting"
            data-channel="nochannel" data-subchannel="nosubchannel"
            data-feature="content" data-subfeature1="activecom_home"
            data-subfeature2="nosubfeature2" data-searchkw="na" data-age="na"
            data-gender="na" data-distance="na" data-skill="na" data-cat="na"
            data-meta="na" data-eventid="na" data-country="na" data-state="na"
            data-city="na" data-zip="na" data-dest_dma="na" data-assetid="na"
            data-change_view="true" data-topic="na" data-subtopic1="na"
            data-subtopic2="na" data-subtopic3="na"/>
      <Ad id="lead2" position="lead2" adUnit="/21719121593/ACT/Homepage"/>
    </main>
  )
}
