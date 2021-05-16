import mongoose from 'mongoose'

import { WebAnalytics } from './WebAnalytics'

// Add models here
const MODELS = [
  { collection: 'WebAnalytics', modelSchema: WebAnalytics },
]

export const models = {}

MODELS.forEach(item => {
  models[item.collection] = mongoose.model(item.collection, item.modelSchema)
})

/* Keep it as an example
const asset = new mongoose.Schema(modelSchemaAsset.schema)
const modelAssets = mongoose.model('assets', asset)
*/
