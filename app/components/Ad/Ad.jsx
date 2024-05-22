'use client'

import React, { useEffect } from 'react'
import classNames from 'classnames'
import { getSlotConfigById } from './helper'

import './ad.scss'

const Ad = (props) => {
  const {
    id, position, isOOP, className, adUnit, pageType,
  } = props

  const adSlot = getSlotConfigById(id)
  const prebidUnits = []

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

    return responsiveAdSlot
  }

  const defineOOP = () => googletag.defineOutOfPageSlot(adUnit, position).
    setTargeting('position', position).
    addService(googletag.pubads())

  const refreshWithBid = (slot) => {
    pbjs.que.push(() => {
      pbjs.addAdUnits(prebidUnits)
      pbjs.requestBids({
        timeout: 2000,
        bidsBackHandler () {
          googletag.cmd.push(() => {
            pbjs.que.push(() => {
              pbjs.setTargetingForGPTAsync()
              googletag.pubads().refresh([slot], { changeCorrelator: false })
            })
          })
        },
      })
    })
  }

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
        // setPrebidConfig();
        googletag.display(slot)
        if (adSlot?.isBid) {
          refreshWithBid(slot)
        } else googletag.pubads().refresh([slot], { changeCorrelator: false })
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