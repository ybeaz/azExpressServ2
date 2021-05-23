import mongoose from 'mongoose'

import { Event } from './Event'

// eslint-disable-next-line import/prefer-default-export
export const Analytics = new mongoose.Schema({
  analyticsID: {
    type: String,
    required: true,
    default: undefined,
  },
  dateCreate: {
    type: Number,
    required: true,
    default: undefined,
  },
  dateUpdate: {
    type: Number,
    required: true,
    default: undefined,
  },
  initData: {
    type: Object,
    required: false,
    default: undefined,
  },
  events: {
    type: [Event],
    default: undefined,
  },
})
