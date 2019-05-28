
const express = require('express')
const cors = require('cors')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const favicon = require('favicon')
const session = require('express-session')
const nocache = require('nocache')
const path = require('path')

// const { MongoClient } = require('mongodb') 
const { ApolloServer, gql } = require('apollo-server-express')
// graphql-tools combines a schema string with resolvers.
const { makeExecutableSchema } = require('graphql-tools')

const router = require('./src/routes/index')
const logging = require('./src/shared/logging')

const app = express()
// all environments
// app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'pug')

/**
 * @description Enable CORS for ExpressJS
 * @link https://stackoverflow.com/a/38500226/4791116
 */
//
app.use(cors({ origin: true }))
app.options('*', cors())

app.use(logging.logger)
app.use(logging.logErrors)
app.use(router)
app.use(logging.clientErrorHandler)
app.use(logging.errorHandler)
app.use(methodOverride())
app.use(cookieParser())
app.use(session({
  secret: 'keyboard abc',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 21600000 },
}))
app.use(express.static(path.join(__dirname, 'www')))
app.use(nocache())
// parse various different urlencoded
app.use(bodyParser.urlencoded({ type: 'application/x-www-form-urlencoded', extended: true }))
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/json' }))
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
// parse an HTML body as a string
app.use(bodyParser.text({ type: 'text/*' }))
app.use('/', express.static(path.join(__dirname, 'static')))

const { APP_PORT, APP_IP, APP_PATH } = process.env
let appPort
let DB_CONNECTION_STRING
let dbName

// Setting variables for dev mode
if (APP_PORT === undefined) {
  appPort = 8082
  DB_CONNECTION_STRING = 'mongodb://127.0.0.1:27017/db?gssapiServiceName=mongodb'
  dbName = 'db'
}
// Setting variables for prod mode
else {
  appPort = APP_PORT
  DB_CONNECTION_STRING = 'mongodb://c3550_mdb_sitewindows_com:YeMmoDacnibex39@mongo1.c3550.h2,mongo2.c3550.h2,mongo3.c3550.h2/c3550_mdb_sitewindows_com?replicaSet=MongoReplica'
  dbName = 'c3550_mdb_sitewindows_com'
}



// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const dataSource = {
  books: [
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
      genre: 'Fantasy',
      year: 2011,
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
      genre: 'Fiction',
      year: 2005,
    },
    {
      title: 'A Brief History of Humankind Sapiens',
      author: 'Yuval Harari',
      genre: 'Science',
      year: 2014,
    },
  ],
  users: [
    {
      firstname: 'Dave',
      secondname: 'Davids',
      id: 1,
    },
    {
      firstame: 'Robin',
      secondname: 'Wieruch',
      id: 2,
    },
    {
      firstname: 'John',
      secondname: 'Smith',
      id: 3,
    },
  ],
}

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String!
    author: String
    genre: String
    year: Int
  }

  type User {
    firstname: String!
    secondname: String
    username: String
    id: ID!
  }

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

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    webAnalytics: [WebAnalytics]
    booksAll: [Book]
    books(genre: String, yearFrom: Int, yearTo: Int): [Book]
    users: [User]
  }
`
// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    webAnalytics: () => {
      return [{
        utAnltSid: "11111111111111",
        finish: "2019/05/10 22:50:07",
        start: "2019/05/10 21:27:55",
        initData: [
          {
            width: "1366",
            height: "271",
            search: "",
            pathname: "/",
            hostname: "127.0.0.1",
            href: "http://127.0.0.1:3401/",
            referrer: "http://127.0.0.1:3401/",
            ip: "::ffff:127.0.0.1"
          },
        ],
        target: [
          {
            level: "1",
            name: "11111"
          },
        ],
        topics: [
          "abc_2",
          "abc_3"
        ],
      }]
    },
    /**
     * @example {
        booksAll {
          title,
          author,
          genre,
          year,
        }
      }
     */
    booksAll: () => {
      return dataSource.books
    },
    /**
     * @example {
        books(genre: "Fiction", yearFrom: 2011, yearTo: 2015 ) {
          title,
          genre,
          year,
        }
      }
     */
    books: (parent, args, context, info) => {
      const { books } = dataSource
      console.info('Query->books: ', { books, parent, args })

      const { genre, yearFrom, yearTo } = args
      let booksFiltered = books
      if (genre) {
        booksFiltered = booksFiltered.filter(item => item.genre === genre)
      }

      if (yearFrom) {
        booksFiltered = booksFiltered.filter(item => item.year >= yearFrom)
      }

      if (yearTo) {
        booksFiltered = booksFiltered.filter(item => item.year <= yearTo)
      }

      return booksFiltered
    },
    users: () => {
      return dataSource.users
    },
  },

  User: {
    username: (parent, args, { me }) => {
      const { firstname, secondname } = parent
      console.info('User: ', { parent, args, me })
      return `${firstname} ${secondname}`
    },
  },
}

// Required: Export the GraphQL.js schema object as "schema"
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const context = (headers, secrets) => {
  return {
    headers,
    secrets,
  }
}

const apolloServer = new ApolloServer({
  schema,
  context: { ...context, me: { firstname: 'Programmer', secondname: 'Roman' } },
})

apolloServer.applyMiddleware({ app, path: '/graphql' })

app.listen({ port: appPort }, () => {
  console.log(`Express+Apollo Server on http://localhost:${appPort}/graphql`)
})
