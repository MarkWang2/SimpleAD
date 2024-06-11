import slotsConfig from './slotsConfig'

export const getSlotConfigById = (id, pageName) => {
    const {slots, devices} = slotsConfig

    return {devices, ...slots.find(slot => slot?.name === id && slot?.pageName === pageName?.substring(1)) || slots.find(slot => slot?.name === id) || {}}
}