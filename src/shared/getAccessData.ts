import { config } from 'dotenv'
import { cwd } from 'process'
import { resolve } from 'path'

config({
  path: resolve(cwd(), `.env.${process.env.NODE_ENV}`),
})

/**
 * @description Function to return object with access data
 */
export const getAccessData: Function = (): any => {
  const {
    APP_IP,
    APP_PORT,
    DB_CONNECTION_STRING,
    DBUSER,
    DBPASS,
    DBHOST,
    DBNAME,
    HOME,
    PATH,
    APP_PATH,
    NODE_ENV,
    SECRET_WEB_TOKEN,
  } = process.env

  return {
    APP_IP,
    APP_PORT,
    DB_CONNECTION_STRING,
    DBUSER,
    DBPASS,
    DBHOST,
    DBNAME,
    HOME,
    PATH,
    APP_PATH,
    NODE_ENV,
    SECRET_WEB_TOKEN,
  }
}
