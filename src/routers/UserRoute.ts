import { Router } from 'express'
import { UserController } from '../controllers/UserController'

export class UserRouter {
  public router: Router

  constructor () {
    this.router = Router()
    this.getRoutes()
  }

  getRoutes () {
    this.router.get('/create', UserController.login)
  }
}

export default new UserRouter().router
