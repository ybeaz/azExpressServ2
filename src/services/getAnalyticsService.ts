import { models } from '../models/index.models'
import { mockResponse } from './mockRepsonse'

// eslint-disable-next-line import/prefer-default-export
export const getAnalyticsService = async dataInput => {
  const { dateFrom, dateTo } = dataInput

  // I stopped here
  console.info('getAnalyticsService [7]', { dateFrom, dateTo })

  return [...mockResponse]

  // // console.log('getUserAnalytics->find [0]', { dateFrom, dateTo, dateFromStr, dateToStr, data })
  // const { MongoClient, dbName, DB_CONNECTION_STRING, collection } =
  //   dbAccessData;
  // let resultNext = [];

  // const client = await MongoClient.connect(DB_CONNECTION_STRING, {
  //   useNewUrlParser: true,
  // });
  // const db = client.db(dbName);

  // try {
  //   const result = await db
  //     .collection(collection)
  //     .find({}, { projection: { _id: 0 } })
  //     // .sort({ _id: -1 })
  //     .toArray();

  //   result.forEach((item) => {
  //     const itemNext = item;
  //     resultNext.push(itemNext);
  //   });

  //   resultNext = resultNext.filter((item) => {
  //     let dateFilter = false;

  //     let dateFrom = 631134000000;
  //     if (Date.parse(dateFromStr) === parseInt(Date.parse(dateFromStr), 10)) {
  //       dateFrom = Date.parse(dateFromStr);
  //     }
  //     let dateTo = 32503662000000;
  //     if (Date.parse(dateToStr) === parseInt(Date.parse(dateToStr), 10)) {
  //       dateTo = Date.parse(dateToStr);
  //     }

  //     const { start, finish } = item;
  //     const startFrom = Date.parse(start);
  //     const finishTo = Date.parse(finish);
  //     // console.log('getUserAnalytics->find [5]', { dateFrom, startFrom, dateTo, finishTo, s1990: Date.parse('1990/01/01'), f3000: Date.parse('3000/01/01') })
  //     if (startFrom >= dateFrom && finishTo <= dateTo) {
  //       dateFilter = true;
  //     }
  //     return dateFilter;
  //   });

  //   // console.log('getUserAnalytics->find [10]', { resultNext })
  // } catch (err) {
  //   console.log("getUserAnalytics->err [10]", { err });
  // } finally {
  //   client.close();
  // }
  // return resultNext;
}
