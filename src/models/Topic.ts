import mongoose from 'mongoose'

// eslint-disable-next-line import/prefer-default-export
export const Topic = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pathname: {
    type: String,
    required: true,
  },
})
