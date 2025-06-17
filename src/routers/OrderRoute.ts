import { Router } from 'express'
import { GlobalRequest } from '../validation/validation'
import { authenticateJWT } from '../middlewares/Auth'
import { OrderController } from '../controllers/OrderController'
export class OrderRoute {
  public router: Router

  constructor () {
    this.router = Router()
    this.getRoutes()
  }

 getRoutes(){
this.router.post(
      '/create',
      authenticateJWT,
      GlobalRequest.createFood(),
      OrderController.createFood.bind(OrderController)
    )
    this.router.get(
      '/my-order',
      authenticateJWT,
      OrderController.allRecords.bind(OrderController)
    )

 }
}

export default new OrderRoute().router
