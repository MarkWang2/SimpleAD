import React from 'react'
import Body from './Body'

async function getDeviceData () {
  const res = await fetch('http://localhost:3001/api/devices')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getSlotData () {
  const res = await fetch('http://localhost:3001/api/slots')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

const App = async () => {
  const deviceData = await getDeviceData()
  const slotData = await getSlotData()

  const initValues = () => {
    const fieldsData = { slots: [] }
    slotData.slots.forEach(({ name, adUnit, SlotTargeting, SlotSizeMapping }) => {
      let aDSlot = { name, adUnit, slotTargeting: SlotTargeting, sizeMapping: [] }
      deviceData.devices.forEach(({ name }) => {
        aDSlot.sizeMapping.push({
          device: name,
          sizes: SlotSizeMapping.filter(
            (item) => item.device.name === name).map(({ size }) => ({ size })),
        })
      })
      fieldsData['slots'].push(aDSlot)
    })
    return fieldsData
  }

  return (
    <main><Body {...{ deviceData, initValues: initValues() }} /></main>
  )
}
export default App