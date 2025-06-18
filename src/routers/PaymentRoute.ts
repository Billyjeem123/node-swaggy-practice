import { Router } from 'express'
import { GlobalRequest } from '../validation/validation'
import { authenticateJWT } from '../middlewares/Auth'
export class PaymentRoute {
    public router: Router

    constructor () {
        this.router = Router()
        this.getRoutes()
    }

    getRoutes(){
        
        
    }
}

export default new PaymentRoute().router
