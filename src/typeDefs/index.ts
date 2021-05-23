const { gql } = require('apollo-server-express')

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
export const typeDefs = gql`
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

  type Event {
    dateCreate: Float
    type: String
    name: String
    value: String
    level: Int
    pathname: String
  }

  type Analytics {
    analyticsID: String
    hash256: String
    dateCreate: Float
    dateUpdate: Float
    initData: InitData
    events: [Event]
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

  input EventInput {
    type: String
    name: String
    value: String
    level: Int
    pathname: String
  }

  input AnalyticsInput {
    analyticsID: String
    hash256: String
    initData: InitDataInput
    event: EventInput
  }

  # A "Mutation" type is for Creating, Updating and Deleting
  type Mutation {
    saveAnalytics(analyticsInput: AnalyticsInput): Analytics
  }
`
