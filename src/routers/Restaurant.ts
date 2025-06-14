import { Router } from 'express'
import { RestaurantController } from '../controllers/RestaurantController'
import { authenticateJWT } from '../middlewares/Auth'
import { GlobalRequest } from '../validation/validation'

export class RestaurantRoute {
  public router: Router

  constructor () {
    this.router = Router()
    this.getRoutes()
  }

  getRoutes () {
     this.router.post('/create', authenticateJWT, GlobalRequest.createRestaurant(),  RestaurantController.createRestaurant.bind(RestaurantController))
      this.router.get('/my-restaurant', authenticateJWT, RestaurantController.myRestaurant.bind(RestaurantController))
       this.router.put('/restaurant/update', authenticateJWT,  GlobalRequest.updateMyRestaurant(),  RestaurantController.updateMyRestaurant.bind(RestaurantController));
  }
}

export default new RestaurantRoute().router
