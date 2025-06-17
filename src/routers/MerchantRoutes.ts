import { Router } from 'express'
import { GlobalRequest } from '../validation/validation'
import { authenticateMerchant } from '../middlewares/Auth'
import { FoodController } from '../controllers/FoodController'
import { RestaurantController } from '../controllers/RestaurantController'
export class MerchantRoute {
  public router: Router

  constructor () {
    this.router = Router()
    this.getRoutes()
  }

  getRoutes () {
    this.router.post(
      '/create-food',
      authenticateMerchant,
      GlobalRequest.createFood(),
      FoodController.createFood.bind(FoodController)
    )
    this.router.get(
      '/all-foods/:restaurant_id',
      authenticateMerchant,
      FoodController.allRecords.bind(FoodController)
    )
    this.router.delete(
      '/delete-food/:id',
      authenticateMerchant,
      FoodController.deleteFood.bind(FoodController)
    )
    this.router.put(
      '/update-food/:id',
      authenticateMerchant,
      FoodController.updateFood.bind(FoodController)
    )
    //Restaurant Merchant

    this.router.post(
      '/create-restaurant',
      authenticateMerchant,
      GlobalRequest.createRestaurant(),
      RestaurantController.createRestaurant.bind(RestaurantController)
    )
    this.router.get(
      '/my-restaurant',
      authenticateMerchant,
      RestaurantController.myRestaurant.bind(RestaurantController)
    )
    this.router.put(
      '/restaurant/update',
      authenticateMerchant,
      GlobalRequest.updateMyRestaurant(),
      RestaurantController.updateMyRestaurant.bind(RestaurantController)
    )
  }
}

export default new MerchantRoute().router
