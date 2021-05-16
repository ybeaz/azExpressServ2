import mongoose from 'mongoose'

// eslint-disable-next-line import/prefer-default-export
export const Target = new mongoose.Schema({
  level: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})
