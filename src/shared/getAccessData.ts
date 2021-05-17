export const getAccessData = () => {
  const { APP_PORT, APP_IP, APP_PATH } = process.env
  let appPort
  let DB_CONNECTION_STRING
  let dbName
  let collection

  console.info('getAccessData [8]', { APP_PORT })

  // Setting variables for dev mode
  if (APP_PORT === undefined) {
    appPort = 8082
    DB_CONNECTION_STRING = 'mongodb://127.0.0.1:27017/db?gssapiServiceName=mongodb'
    dbName = 'db'
    collection = 'analytics'
  }
  // Setting variables for prod mode
  else {
    appPort = APP_PORT
    DB_CONNECTION_STRING = 'mongodb://c3550_nd_userto_com:JaBdoDifgowun32@mongo1.c3550.h2,mongo2.c3550.h2,mongo3.c3550.h2/c3550_nd_userto_com?replicaSet=MongoReplica'
    dbName = 'c3550_nd_userto_com'

    // DB_CONNECTION_STRING = 'mongodb://c3550_mdb_sitewindows_com:YeMmoDacnibex39@mongo1.c3550.h2,mongo2.c3550.h2,mongo3.c3550.h2/c3550_mdb_sitewindows_com?replicaSet=MongoReplica'
    // dbName = 'c3550_mdb_sitewindows_com'
    collection = 'analytics'
  }

  console.info('getAccessData [28]', { dbName, DB_CONNECTION_STRING, collection, appPort })
  return { dbName, DB_CONNECTION_STRING, collection, appPort }
}