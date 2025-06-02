import * as express from 'express'
import connectDB from './config/db'
import UserRoute from './routers/UserRoute'

export class Server {
  public app = express()

  constructor () {
    this.setConfigs()
    this.setRoutes()
  }
  setConfigs () {
   connectDB()
  }

  setRoutes () {
    this.app.use('/api/user', UserRoute) //middleware to build router for routes
  }
}
