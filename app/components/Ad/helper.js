import slotsConfig from './slotsConfig'

export const getSlotConfigById = (id) => {
  const { slots, devices } = slotsConfig

  return { devices, ...slots.find(slot => slot?.name === id) }
}