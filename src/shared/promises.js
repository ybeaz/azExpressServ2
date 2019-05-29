const findPromise = (db, sid) => {
  return new Promise((resolve, reject) => {

    db.collection(collection)
      .find({ utAnltSid: sid }, { projection: { _id: 0 } })
      // .sort({ _id: -1 })
      .toArray((errFind, resFind) => {
        errFind
          ? reject(errFind)
          : resolve(resFind)
      })
  })
}

const insertPromise = (db, query) => {
  return new Promise((resolve, reject) => {
    db.collection(collection)
      .insertOne(
        { ...query },
        (errInsert, resInsert) => {
          if (err) {
            console.error(errInsert.message)
            reject(errInsert.message)
          }
          // console.log('inserted record', resInsert.ops[0])
          resolve(resInsert.ops[0])
        })
  })
}

const updatePromise = (db, query) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection(collection)
        .updateOne(
          { utAnltSid: query.utAnltSid },
          { $set: { ...query } },
          { upsert: true },
          (errUpdate, resUpdate) => {
            if (errUpdate) {
              console.error(errUpdate.message)
              reject(errUpdate.message)
            }
            // console.log('saveUserAnalytics (updatePromise) [3]', resUpdate)
            resolve(resUpdate)
          },
        )} catch (errUpdatePromise) {
      console.info('errUpdatePromise: ', errUpdatePromise)
    }
  })
}

module.exports = {
  findPromise,
  insertPromise,
  updatePromise,
}
