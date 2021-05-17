import mongoose from 'mongoose'

import { Analytics } from './Analytics'

// Add models here
const MODELS = [
  { collection: 'analytics', modelSchema: Analytics },
]

export const models = {}

MODELS.forEach(item => {
  models[item.collection] = mongoose.model(item.collection, item.modelSchema)
})


/* Keep it as an example
const asset = new mongoose.Schema(modelSchemaAsset.schema)
const modelAssets = mongoose.model('assets', asset)
*/
