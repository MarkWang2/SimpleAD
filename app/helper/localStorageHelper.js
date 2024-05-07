export const getLocalStorageItem = (key) => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem(key))
  }
}

export const setLocalStorageItem = (key, value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
}


