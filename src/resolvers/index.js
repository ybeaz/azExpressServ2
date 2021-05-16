const { MongoClient } = require("mongodb");

import { getAccessData } from "../shared/getAccessData";
import { getUserAnalyticsService } from "../services/getUserAnalyticsService";
import { saveUserAnalyticsService } from "../services/saveUserAnalyticsService";

let dbAccessData = getAccessData();
dbAccessData = { ...dbAccessData, MongoClient };

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Mutation: {
    /**
     * @example "query": "mutation SaveUserAnalytics($webAnalyticsInput: WebAnalyticsInput!){saveUserAnalytics(webAnalyticsInput: $webAnalyticsInput){ n }}"
     */
    saveUserAnalytics: (parent, args, context, info) => {
      const { ip } = context;
      const dataInput = { ...args, ip };
      console.info("resolvers->Mutation->saveUserAnalytics [20]", {
        dataInput,
      });
      return saveUserAnalyticsService(dbAccessData, dataInput);
    },
  },
  Query: {
    /**
     * @example {"operationName":false,"variables":{},"query":"{getWebAnalytics(dateFrom:\"2019\/05\/20\",dateTo:\"2019\/05\/30\"){finish,start,initData{width,height,search,pathname,hostname,href,referrer,ip}target{level,name},topics}}"}
     */
    getWebAnalytics: (parent, args, context, info) => {
      const dataInput = { ...args };
      return getUserAnalyticsService(dbAccessData, dataInput);
    },
  },
};

module.exports = resolvers;
