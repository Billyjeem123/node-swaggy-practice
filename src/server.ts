import * as express from 'express'
import connectDB from './config/db'
import UserRoute from './routers/UserRoute'
import * as bodyParser from 'body-parser'
import { errorHandler } from './Exception/Handler'

export class Server {
  public app = express()

  constructor () {
    this.setConfigs()
    this.setRoutes() //if an error is called in  our routes here if it is not a 404, handle erros will see to it
    this.error404Handler()
    this.handleErrors()
  }

  setConfigs () {
    connectDB()
    this.configureBodyParser()
  }

  setRoutes () {
    this.app.use('/api/user', UserRoute) //middleware to build router for routes
  }


configureBodyParser () {
  this.app.use(bodyParser.urlencoded({ extended: true }));
  this.app.use(bodyParser.json());
}


  error404Handler () {
    this.app.use((req, res) => {
      res.status(404).json({
        message: 'Not found',
        status_code: 404
      })
    })
  }

  handleErrors () {
    //Hey Express, whenever something goes wrong in the app and an error is passed, use this function to catch it and send a clean response.”
    this.app.use((error, req, res, next) => {
      const errorStatus = error.status || 500 // 👈 use error.status instead of req.errorStatus
      res.status(errorStatus).json({
        message: error.message || 'Something went wrong. Please try again!',
        status_code: errorStatus
      })
    })
  }
}
