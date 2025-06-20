import {Router} from 'express'
import {authenticateJWT} from '../middlewares/Auth'
import {PaymentController} from "../controllers/PaymentController";

export class PaymentRoute {
    public router: Router

    constructor() {
        this.router = Router()
        this.getRoutes()
    }

    getRoutes() {

        this.router.post(
            '/create',
            authenticateJWT,
            PaymentController.recordTransaction.bind(PaymentController)
        )
    }
}

export default new PaymentRoute().router
