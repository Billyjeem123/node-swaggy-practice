import {Router} from 'express'
import {GlobalRequest} from '../validation/validation'
import {authenticateJWT} from '../middlewares/Auth'
import {OrderController} from '../controllers/OrderController'

export class OrderRoute {
    public router: Router

    constructor() {
        this.router = Router()
        this.getRoutes()
    }

    getRoutes() {
        this.router.post(
            '/create',
            authenticateJWT,
            GlobalRequest.createOrder(),
            OrderController.createOrder.bind(OrderController)
        )

        this.router.get(
            '/customer-order',
            authenticateJWT,
            OrderController.CustomerOrder.bind(OrderController)
        )

        this.router.get(
            '/customer-paid-order',
            authenticateJWT,
            OrderController.CustomerPaidOrder.bind(OrderController)
        )

        this.router.get(
            '/merchant-order',
            authenticateJWT,
            OrderController.allRecords.bind(OrderController)
        )


        this.router.get(
            '/my-order',
            authenticateJWT,
            OrderController.allRecords.bind(OrderController)
        )

    }
}

export default new OrderRoute().router
