'use client'

import React, { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import classNames from 'classnames'
import { getSlotConfigById } from './helper'

import './ad.scss'

const Ad = (props) => {
  const {
    id, position, isOOP, className, adUnit,
  } = props

  const pathname = usePathname()

  const adSlot = getSlotConfigById(id, pathname)

  const getSizeMapping = () => {
    const sizeMapping = adSlot.sizeMapping
    const adsSizeMapping = googletag.sizeMapping()
    const devices = adSlot.devices
    for (const [key, value] of Object.entries(sizeMapping)) {
      adsSizeMapping.addSize(devices[key],
        value.map((i) => i.split('x').map((v) => Number(v))))
    }
    return adsSizeMapping.build()
  }

  const defineSlot = () => {
    const defaultRequestSize = '330x250'
    const responsiveAdSlot = googletag.defineSlot(adUnit || adSlot.adUnit,
      defaultRequestSize, id).
      addService(googletag.pubads()).
      setTargeting('position', position).
      setCollapseEmptyDiv(true)
    responsiveAdSlot.defineSizeMapping(getSizeMapping())

    adSlot.slotTargeting.forEach(({ name, value }) => {
      responsiveAdSlot.setTargeting(name, value)
    })
    window.SD ||= {}
    window.SD.slots ||= []
    window.SD.slots.push({ [id]: responsiveAdSlot })
    return responsiveAdSlot
  }

  const defineOOP = () => googletag.defineOutOfPageSlot(adUnit, position).
    setTargeting('position', position).
    addService(googletag.pubads())

  const pushAdSlot = () => {
    if (typeof window !== undefined) {
      const { googletag } = window
      googletag.cmd = googletag.cmd || []

      googletag.cmd.push(() => {
        const slot = isOOP ? defineOOP() : defineSlot()
        googletag.pubads().disableInitialLoad()
        googletag.pubads().enableSingleRequest()
        googletag.enableServices()
        googletag.pubads().enableLazyLoad()
        googletag.display(slot)
        googletag.pubads().refresh([slot], { changeCorrelator: false })
      })
    }
  }

  useEffect(pushAdSlot, [])

  return (
    <div
      data-testid={id}
      id={id}
      key={id}
      className={classNames('ad-placeholder', className)}
      data-position={position}>
    </div>
  )
}

export default Ad