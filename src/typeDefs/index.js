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

  type Target {
      level: String
      name: String
  }

  type WebAnalytics {
    utAnltSid: String
    finish: String
    start: String
    initData: [InitData]
    target: [Target]
    topics: [String]
  }

  # The "Query" type is for Reading
  type Query {
    getWebAnalytics2(dateFrom: String, dateTo: String): [WebAnalytics]
  }

  type SaveStatus {
    status: Boolean
    utAnltSid: String
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

  input TargetInput {
      level: String
      name: String
  }

  input WebAnalyticsInput {
    utAnltSid: String
    finish: String
    start: String
    initData: [InitDataInput]
    target: [TargetInput]
    topics: [String]
  }

  # A "Mutation" type is for Creating, Updating and Deleting
  type Mutation {
    saveUserAnalytics2(webAnalytics: WebAnalyticsInput): SaveStatus
  }
`
module.exports = typeDefs
