// import slotsConfig from './slotsConfig'

export const getSlotConfigById = (id) => {
  const { slots, devices } = window.slotsConfig

  return { devices, ...slots.find(slot => slot?.name === id) }
}