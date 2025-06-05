import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { GlobalRequest } from '../validation/validation'

export class UserRouter {
  public router: Router

  constructor () {
    this.router = Router()
    this.getRoutes()
  }

  getRoutes () {
     this.router.post('/create', GlobalRequest.signup(), UserController.signup.bind(UserController))
     this.router.get('/all', UserController.allusers.bind(UserController))
     this.router.put('/update/:id', UserController.updateUser.bind(UserController));   // Update user by ID
     this.router.delete('/delete/:id', UserController.deleteUser.bind(UserController)); // Delete user by ID
    //  Use the login method, and when you use it, remember it belongs to UserController
  }
}

export default new UserRouter().router
