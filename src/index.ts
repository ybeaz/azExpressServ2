#!/usr/bin/env node
import express from 'express'
import cors from 'cors'
import methodOverride from 'method-override'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import favicon from 'favicon'
import session from 'express-session'
import nocache from 'nocache'
import path from 'path'
import expressStaticGzip from 'express-static-gzip'

import { ApolloServer } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
// graphql-tools combines a schema string with resolvers.

import { getConnectedMogoose } from './shared/getConnectedMogoose'
import { getAccessData } from './shared/getAccessData'
import { getIp } from './shared/getIp'
import router from './routes/index'
import logging from './shared/logging'
import { typeDefs } from './typeDefs/index'
import { resolvers } from './resolvers/index'

const app = express()
// all environments
// app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'))
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
app.use(
  session({
    secret: 'keyboard abc',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 21600000 },
  })
)
app.use(express.static(path.join(__dirname, 'www')))
app.use(nocache())
// parse various different urlencoded
app.use(
  bodyParser.urlencoded({
    type: 'application/x-www-form-urlencoded',
    extended: true,
  })
)
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/json' }))
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
// parse an HTML body as a string
app.use(bodyParser.text({ type: 'text/*' }))
app.use('/', express.static(path.join(__dirname, 'static')))
getConnectedMogoose()

const context = (headers, secrets) => {
  return {
    headers,
    secrets,
  }
}

// Required: Export the GraphQL.js schema object as "schema"
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const ip = getIp(req)
    return { ip }
  },
})

apolloServer.applyMiddleware({ app, path: '/graphql' })

const { appPort } = getAccessData()
app.listen({ port: appPort }, () => {
  console.log(`Express+Apollo Server on http://localhost:${appPort}/graphql`)
})
