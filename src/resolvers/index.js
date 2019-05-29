
const { MongoClient } = require('mongodb')

const serviceFunc = require('../shared/serviceFunc')
const getUserAnalytics2 = require('../controllers/getUserAnalytics2')
const saveUserAnalytics2 = require('../controllers/saveUserAnalytics2')

let dbAccessData = serviceFunc.getAccessData()
dbAccessData = { ...dbAccessData, MongoClient }

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Mutation: {
    /**
     * @example {"query":"mutation{saveUserAnalytics2(webAnalytics:\"abc\"){status utAnltSid}}"}
     */
    saveUserAnalytics2: (parent, args, context, info) => {
      const data = { ...args }
      const req = {}
      const res = {}
      saveUserAnalytics2(req, res, dbAccessData, data)

      console.info('resolvers->Mutation', { data })


      return { status: true, utAnltSid: '55555' } // { status: true, utAnltSid: 'string' }
    },
  },
  Query: {
    /**
     * @example {"operationName":false,"variables":{},"query":"{getWebAnalytics2(dateFrom:\"2019\/05\/20\",dateTo:\"2019\/05\/30\"){utAnltSid,finish,start,initData{width,height,search,pathname,hostname,href,referrer,ip}target{level,name},topics}}"}
     */
    getWebAnalytics2: (parent, args, context, info) => {
      const data = { ...args }
      return getUserAnalytics2(dbAccessData, data)
    },
  },
}

module.exports = resolvers
