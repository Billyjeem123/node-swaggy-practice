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
       this.router.get('/all/:restaurant_id', FoodController.allRecords.bind(FoodController))
     this.router.delete('/delete/:id', FoodController.deleteFood.bind(FoodController))
       this.router.put('/update/:id', FoodController.updateFood.bind(FoodController));



  }
}

export default new FoodRoute().router
