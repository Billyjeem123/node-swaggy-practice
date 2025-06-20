import {Router} from 'express'
import {authenticateJWT} from '../middlewares/Auth'
import {PaymentController} from "../controllers/PaymentController";
import { GlobalRequest } from '../validation/validation';

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
            GlobalRequest.createPayment(),
            PaymentController.recordTransaction.bind(PaymentController)
        )

         this.router.get(
            '/call-back',
            PaymentController.paymentCallBack.bind(PaymentController)
        )
    }
}

export default new PaymentRoute().router
