import mongoose from 'mongoose'

import { Analytics } from './Analytics'
interface IMODEL {
  collection: string
  modelSchema: any
}

// Add models here
const MODELS: IMODEL[] = [
  { collection: 'analytics', modelSchema: Analytics },
]

export const models = MODELS.reduce((res: any, item: IMODEL) => {
  return { ...res, [item.collection]: mongoose.model(item.collection, item.modelSchema) }
}, {})


/* Keep it as an example
const asset = new mongoose.Schema(modelSchemaAsset.schema)
const modelAssets = mongoose.model('assets', asset)
*/
