const { gql } = require('apollo-server-express')

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  type InitData {
    width: String
    height: String
    search: String
    pathname: String
    hostname: String
    href: String
    referrer: String
    ip: String
  }

  type Topic {
    name: String
    pathname: String
  }

  type Event {
    type: String
    name: String
    value: String
    pathname: String
  }

  type Target {
    level: String
    name: String
    pathname: String
  }

  type Analytics {
    analyticsID: String
    hash256: String
    dateCreate: Float
    dateUpdate: Float
    initData: InitData
    topics: [Topic]
    events: [Event]
    targets: [Target]
  }

  # The "Query" type is for Reading
  type Query {
    getAnalytics(dateFrom: Float, dateTo: Float): [Analytics]
  }

  type SaveStatus {
    n: Int
    nModified: Int
    ok: Int
    upserted: Int
  }

  input InitDataInput {
    width: Int
    height: Int
    search: String
    pathname: String
    hostname: String
    href: String
    referrer: String
  }

  input TopicInput {
    name: String
    pathname: String
  }

  input EventInput {
    type: String
    name: String
    value: String
    pathname: String
  }

  input TargetInput {
    level: Int
    name: String
    pathname: String
  }

  input AnalyticsInput {
    analyticsID: String
    hash256: String
    initData: InitDataInput
    topic: TopicInput
    event: EventInput
    target: TargetInput
  }

  # A "Mutation" type is for Creating, Updating and Deleting
  type Mutation {
    saveAnalytics(analyticsInput: AnalyticsInput): Analytics
  }
`
module.exports = typeDefs