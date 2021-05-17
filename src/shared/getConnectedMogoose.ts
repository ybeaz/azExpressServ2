import mongoose from 'mongoose'

import { getAccessData } from './getAccessData'
import { getErrorInfo } from './getErrorInfo'

/**
 * @description Function to connect MongoDB
 * @returns
 */
export const getConnectedMogoose = async () => {
  try {
    const { DB_CONNECTION_STRING } = getAccessData()

    const mongooseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }

    // mongoose.set('useNewUrlParser', true)
    // mongoose.set('useFindAndModify', false)
    // mongoose.set('useCreateIndex', true)
    // mongoose.set('useUnifiedTopology', true)

    mongoose
      .connect(DB_CONNECTION_STRING, mongooseOptions)
      .then(res => console.log('Connected to mongoDB'))
  } catch (error) {
    const errorInfo = getErrorInfo(error)
    return console.log({
      status: 'DB connection unsuccessful',
      data: errorInfo,
    })
  }
}