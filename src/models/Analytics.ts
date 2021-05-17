import mongoose from 'mongoose'

import { Event } from './Event'
import { Target } from './Target'

// eslint-disable-next-line import/prefer-default-export
export const Analytics = new mongoose.Schema({
  analyticsID: {
    type: String,
    required: true,
    default: undefined
  },
  creationDate: {
    type: Number,
    required: true,
    default: undefined
  },
  updateDate: {
    type: Number,
    required: true,
    default: undefined
  },
  initData: {
    type: Object,
    required: false,
    default: undefined
  },
  topics: {
    type: [String],
    default: undefined
  },
  events: {
    type: [Event],
    default: undefined
  },
  targets: {
    type: [Target],
    default: undefined
  },
})
