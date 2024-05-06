import slotsConfig from './slotsConfig';

export const getSlotConfigById = (id, page) => {
  return slotsConfig.find(slot => slot.id === id && slot.page === page)
    || slotsConfig.find(slot => slot.id === id) || {};
};