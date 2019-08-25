const moment = require('moment')

const serviceFunc = require('../shared/serviceFunc')

const saveUserAnalytics2 = async (
  dbAccessData, dataInput) => {

  const { MongoClient, dbName, DB_CONNECTION_STRING, collection } = dbAccessData

  // console.info('saveUserAnalytics2 [0]', { dataInput })

  const client = await MongoClient.connect(DB_CONNECTION_STRING, { useNewUrlParser: true })
  const db = client.db(dbName)

  const { webAnalytics: data, ip } = dataInput
  let utAnltSid = data.utAnltSid
  let target = data.target
  let record0 = {}
  let resultUpdate = {}

  // Make request to the collection from MongoDB about existing of the entry
  let record = []
  try {
    record = await db.collection(collection)
      .find({ utAnltSid }, { projection: { _id: 0 } })
      // .sort({ _id: -1 })
      .toArray()
  }
  catch (err) {
    console.log('saveUserAnalytics2->err find [1]', { err })
  }

  // console.info('saveUserAnalytics [5]', { record, target, data, db, utAnltSid })

  let dataNext = {
    initData: [{ ip: '' }],
    topics: [],
    target: [],
  }

  // Case sessionStart
  if (record.length === 0) {

    dataNext = {
      start: moment().format('YYYY/MM/DD HH:mm:ss'),
      ...dataNext,
      ...data,
      finish: moment().format('YYYY/MM/DD HH:mm:ss'),
    }
    // console.info('saveUserAnalytics [5]', { target, data })
    if (dataNext.initData) {
      dataNext.initData[0].ip = ip
    }
  }
  // Case sessionUpdate
  else if (record.length > 0) {
    // DataNext from record, start with previous version.
    record0 = record[0]
    delete record0['_id']

    dataNext = {
      ...dataNext,
      ...record0,
      finish: moment().format('YYYY/MM/DD HH:mm:ss'),
    }

  }

  delete dataNext.optGet
  delete dataNext.jsonp

  // console.info('saveUserAnalytics [6]', { record, data, dataNext })

  // Block to process fields
  const fieldsToSave = [
    { name: 'topics', mode: 'add', prop: '' },
    { name: 'eventData', mode: 'add', prop: 'name' },
    { name: 'target', mode: 'max', prop: '' },
  ]
  fieldsToSave.forEach(item => {
    const { name, mode, prop } = item
    dataNext[name] = serviceFunc.getArrToSave2(record0[name], data[name], mode, prop)
  })

  // console.info('saveUserAnalytics [7]', { 'dataNext.target': dataNext.target, 'dataNext': dataNext, 'data': data, 'record': record })

  try {
    resultUpdate = await db.collection(collection)
      .updateOne(
        { utAnltSid: dataNext.utAnltSid },
        { $set: { ...dataNext } },
        { upsert: true },
      )
  }
  catch (err) {
    console.log('saveUserAnalytics2->err update [1]', { err })
  }

  client.close()

  const { result } = resultUpdate
  const { n, nModified, ok, upserted } = result
  // console.info('saveUserAnalytics [10]', { n, nModified, ok, upserted, result, data, record })
  const upsertedLen = upserted ? upserted.length : 0
  return { n, nModified, ok, upserted: upsertedLen }

}

module.exports = saveUserAnalytics2
