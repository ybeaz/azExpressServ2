const { MongoClient } = require('mongodb')

import { getAnalyticsService } from '../services/getAnalyticsService'
import { saveAnalyticsService } from '../services/saveAnalyticsService'

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Mutation: {
    /**
     * @example "query": "mutation SaveUserAnalytics($analyticsInput: AnalyticsInput!){saveUserAnalytics(analyticsInput: $analyticsInput){ n }}"
     */
    saveAnalytics: (parent, args, context, info) => {
      const { ip } = context
      const dataInput = { ...args, ip }
      return saveAnalyticsService(dataInput)
    },
  },
  Query: {
    /**
     * @example {"operationName":false,"variables":{},"query":"{getAnalytics(dateFrom:\"2019\/05\/20\",dateTo:\"2019\/05\/30\"){finish,start,initData{width,height,search,pathname,hostname,href,referrer,ip}target{level,name},topics}}"}
     */
    getAnalytics: (parent, args, context, info) => {
      const dataInput = { ...args }
      return getAnalyticsService(dataInput)
    },
  },
}

module.exports = resolvers
