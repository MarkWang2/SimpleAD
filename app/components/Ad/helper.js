import slotsConfig from './slotsConfig';

export const getSlotConfigById = (id) => {
  return slotsConfig?.slots.find(slot => slot?.name === id) || {};
};