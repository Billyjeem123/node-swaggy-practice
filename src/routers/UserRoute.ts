import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { GlobalRequest } from '../validation/validation'
import { authenticateJWT } from '../middlewares/Auth'
export class UserRouter {
  public router: Router

  constructor () {
    this.router = Router()
    this.getRoutes()
  }

  getRoutes () {
     this.router.post('/signup', ...GlobalRequest.signup(), UserController.signup.bind(UserController))
       this.router.post('/login', ...GlobalRequest.login(), UserController.login.bind(UserController))
       this.router.get('/my-profile', authenticateJWT, UserController.myProfile.bind(UserController))
     this.router.get('/all0', authenticateJWT, UserController.allusers.bind(UserController))
     this.router.put('/update/:id', UserController.updateUser.bind(UserController));   // Update user by ID
     this.router.delete('/delete/:id', UserController.deleteUser.bind(UserController)); // Delete user by ID
    //  Use the login method, and when you use it, remember it belongs to UserController
  }
}

export default new UserRouter().router
