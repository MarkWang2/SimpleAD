import { setLocalStorageItem, getLocalStorageItem } from '@/app/helper/localStorageHelper'

const DEFAULT_DEVICES = ['0x0', '767x0', '1024x0']

class AdModel {
  static getDevices () {
    return getLocalStorageItem('devices') || DEFAULT_DEVICES
  }

  static setDevices (devices) {
    return setLocalStorageItem('devices', devices)
  }
}
export default AdModel