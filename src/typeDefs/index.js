const { gql } = require('apollo-server-express')

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`

  type InitData {
    width: String,
    height: String,
    search: String,
    pathname: String,
    hostname: String,
    href: String,
    referrer: String,
    ip: String
  }

  type EventData {
    type: String
    name: String
    level: String
  }

  type Target {
      level: String
      name: String
  }

  type WebAnalytics {
    utAnltSid: String
    finish: String
    start: String
    initData: [InitData]
    topics: [String]
    eventData: [EventData]
    target: [Target]
  }

  # The "Query" type is for Reading
  type Query {
    getWebAnalytics2(dateFrom: String, dateTo: String): [WebAnalytics]
  }

  type SaveStatus {
    n: Int
    nModified: Int
    ok: Int
    upserted: Int
  }

  input InitDataInput {
    width: String,
    height: String,
    search: String,
    pathname: String,
    hostname: String,
    href: String,
    referrer: String,
    ip: String
  }

  input EventDataInput {
    type: String
    name: String
    level: String
  }

  input TargetInput {
      level: String
      name: String
  }

  input WebAnalyticsInput {
    utAnltSid: String
    finish: String
    start: String
    initData: [InitDataInput]
    topics: [String]
    eventData: [EventDataInput]
    target: [TargetInput]
  }

  # A "Mutation" type is for Creating, Updating and Deleting
  type Mutation {
    saveUserAnalytics2(webAnalytics: WebAnalyticsInput): SaveStatus
  }
`
module.exports = typeDefs
