import mongoose from 'mongoose'

// eslint-disable-next-line import/prefer-default-export
export const Event = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
  },
  level: {
    type: String,
    required: true,
  },
  pathname: {
    type: String,
    required: true,
  },
})
