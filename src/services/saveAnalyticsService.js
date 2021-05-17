const moment = require("moment");
import { nanoid } from "nanoid";

import { models } from "../models/index.models";
import { getAssetHash } from "../shared/getAssetHash";
import { getArrToSave } from "../shared/getArrToSave";

// Stopped here

export const saveAnalyticsService = async (dataInput) => {
  let {
    analyticsInput: {
      analyticsID,
      hash256: hash256Input,
      initData,
      topic,
      event,
      target,
    },
  } = dataInput;

  const resFound =
    analyticsID &&
    (await models.analytics.find({ analyticsID }, { _id: 0, __v: 0 }).exec());

  const currentDate = +new Date();
  const hash256 = getAssetHash(dataInput);

  console.info("saveAnalyticsService [10]", {
    dataInput,
    hash256Input,
    hash256,
    analyticsID,
    currentDate,
    resFound,
  });

  /**
   * @description Case I. Initial data request
   */
  if (!analyticsID) {
    analyticsID = analyticsID || nanoid();

    const set = {
      analyticsID,
      initData,
    };
    const resUpdate = await models.analytics
      .updateMany(
        { analyticsID },
        {
          $set: set,
        },
        { upsert: true }
      )
      .exec();
    console.info("saveAnalyticsService [57]", { resUpdate });
  }

  /**
   * @description Case II. Update topics
   */

  /**
   * @description Case III. Update events
   */

  /**
   * @description Case IV. Update targets
   */

  return {
    analyticsID,
    hash256,
    initData,
    topics: [topic],
    events: [event],
    targets: [target],
  };

  // const set = { analyticsID, creationDate };

  // const resUpdate = await models.analytics // .find({}).exec();
  //   .updateMany(
  //     { analyticsID },
  //     {
  //       $set: set,
  //     },
  //     { upsert: true }
  //   )
  //   .exec();

  // console.info("saveAnalyticsService [31]", {
  //   resUpdate,
  //   resFind,
  // });

  // const { MongoClient, dbName, DB_CONNECTION_STRING, collection } =
  //   dbAccessData;

  // const client = await MongoClient.connect(DB_CONNECTION_STRING, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });
  // const db = client.db(dbName);

  // let record10;
  // try {
  //   record10 = await db
  //     .collection("analytics")
  //     .find({})
  //     // .sort({ _id: -1 })
  //     .toArray();
  // } catch (err) {
  //   console.log("saveUserAnalytics->err find [1]", { err });
  // }

  // console.info("saveAnalyticsService [54]", {
  //   record10,
  //   dbName,
  // });

  // const { analytics: data, ip } = dataInput;
  // let utAnltSid = data.utAnltSid;
  // let target = data.target;
  // let record0 = {};
  // let resultUpdate = {};

  // console.info("saveUserAnalytics [20]", { dbName, collection });

  // // Make request to the collection from MongoDB about existing of the entry
  // let record = [];
  // try {
  //   record = await db
  //     .collection(collection)
  //     .find({ utAnltSid }, { projection: { _id: 0 } })
  //     // .sort({ _id: -1 })
  //     .toArray();
  // } catch (err) {
  //   console.log("saveUserAnalytics->err find [1]", { err });
  // }

  // // console.info('saveUserAnalytics [5]', { record, target, data, db, utAnltSid })

  // let dataNext = {
  //   initData: [{ ip: "" }],
  //   topics: [],
  //   target: [],
  // };

  // // Case sessionStart
  // if (record.length === 0) {
  //   dataNext = {
  //     start: moment().format("YYYY/MM/DD HH:mm:ss"),
  //     ...dataNext,
  //     ...data,
  //     finish: moment().format("YYYY/MM/DD HH:mm:ss"),
  //   };
  //   // console.info('saveUserAnalytics [5]', { target, data })
  //   if (dataNext.initData) {
  //     dataNext.initData[0].ip = ip;
  //   }
  // }
  // // Case sessionUpdate
  // else if (record.length > 0) {
  //   // DataNext from record, start with previous version.
  //   record0 = record[0];
  //   delete record0["_id"];

  //   dataNext = {
  //     ...dataNext,
  //     ...record0,
  //     finish: moment().format("YYYY/MM/DD HH:mm:ss"),
  //   };
  // }

  // delete dataNext.optGet;
  // delete dataNext.jsonp;

  // // console.info('saveUserAnalytics [6]', { record, data, dataNext })

  // // Block to process fields
  // const fieldsToSave = [
  //   { name: "topics", mode: "add", prop: "" },
  //   { name: "eventData", mode: "add", prop: "name" },
  //   { name: "target", mode: "max", prop: "" },
  // ];
  // fieldsToSave.forEach((item) => {
  //   const { name, mode, prop } = item;
  //   dataNext[name] = getArrToSave(record0[name], data[name], mode, prop);
  // });

  // // console.info('saveUserAnalytics [7]', { 'dataNext.target': dataNext.target, 'dataNext': dataNext, 'data': data, 'record': record })

  // try {
  //   resultUpdate = await db
  //     .collection(collection)
  //     .updateOne(
  //       { utAnltSid: dataNext.utAnltSid },
  //       { $set: { ...dataNext } },
  //       { upsert: true }
  //     );
  // } catch (err) {
  //   console.log("->err update [1]", { err });
  // }

  // client.close();

  // const { result } = resultUpdate;
  // const { n, nModified, ok, upserted } = result;
  // // console.info('saveUserAnalytics [10]', { n, nModified, ok, upserted, result, data, record })
  // const upsertedLen = upserted ? upserted.length : 0;
  // return { n, nModified, ok, upserted: upsertedLen };
};
