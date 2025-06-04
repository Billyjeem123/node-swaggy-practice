import { Router } from 'express'
import { UserController } from '../controllers/UserController'

export class UserRouter {
  public router: Router

  constructor () {
    this.router = Router()
    this.getRoutes()
  }

  getRoutes () {
     this.router.post('/create', UserController.signup.bind(UserController))
    //  Use the login method, and when you use it, remember it belongs to UserController
  }
}

export default new UserRouter().router
