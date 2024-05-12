'use client'

import React, { useEffect } from 'react'
import classNames from 'classnames'
import { getSlotConfigById } from './helper'

import './ad.scss'
import AdModel from '@/app/models/adModel'
import { devices } from '@/app/components/Ad/devices'

const Ad = (props) => {
  const {
    id, position, isOOP, className, adUnit, pageType,
  } = props
  const buildSlot = () => {
    const configSlot = getSlotConfigById(id, pageType)
    return configSlot || {}
  }

  const adSlot = buildSlot()
  const prebidUnits = []

  const getSizeMapping = () => {
    const dataSlots = {
      'slots': [
        {
          'name': 'sdf',
          'adUnit': 'sdf',
          'sizeMapping': {
            'sm': [
              '300x50',
              '320x50',
            ],
            'md': [
              '300x50',
              '320x50',
            ],
            'lg': [],
          },
        },
        null,
      ],
    }

    const sizeMapping = dataSlots.slots[0].sizeMapping
    const adsSizeMapping = googletag.sizeMapping()
   const devices = { sm: [0, 0], md: [767, 0], lg: [1024, 0] }
    for (const [key, value] of Object.entries(sizeMapping)) {
      if(value.length) {
        adsSizeMapping.addSize(devices[key],
          value.map((i) => i.split('x').map((v) => Number(v))))
      }
    }
    return adsSizeMapping.build()
  }

  const defineSlot = () => {
    const defaultRequestSize = '330x250'
    const responsiveAdSlot = googletag.defineSlot(adUnit, defaultRequestSize, id).
      addService(googletag.pubads()).
      setTargeting('position', position).
      setCollapseEmptyDiv(true)
    responsiveAdSlot.defineSizeMapping(getSizeMapping(adSlot))

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