import Hashes from 'jshashes'

import { ASSET_MODEL_HASH } from '../constants/assetModelHash'
import { arrReduceObjPropsConsistent } from './arrReduceObjPropsConsistent'

/**
 * @description Function to get SHA256 hash
 * @borrows both server and client
 */
export const getAssetHash = (asset, assetModel = ASSET_MODEL_HASH) => {
  if (!asset) {
    return ''
  }
  const assetModelSorted = assetModel.slice().sort()
  // console.info('getAssetHash [5]', { assetModelSorted })
  const objNormalized = arrReduceObjPropsConsistent(asset, assetModelSorted)
  const hash = new Hashes.SHA256().b64(JSON.stringify(objNormalized))
  return hash
}