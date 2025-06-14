import { Router } from 'express'
import { GlobalRequest } from '../validation/validation'
import { authenticateJWT } from '../middlewares/Auth'
import { FoodController } from '../controllers/FoodController'
export class FoodRoute {
  public router: Router

  constructor () {
    this.router = Router()
    this.getRoutes()
  }

  getRoutes () {
     this.router.post('/create',authenticateJWT, GlobalRequest.createFood(), FoodController.createFood.bind(FoodController))


  }
}

export default new FoodRoute().router
