import { Router } from 'express'
import { GlobalRequest } from '../validation/validation'
import { authenticateJWT } from '../middlewares/Auth'
import { BannerController } from '../controllers/BannerController'
import { upload } from '../middlewares/Upload';
export class BannerRoute {
  public router: Router

  constructor () {
    this.router = Router()
    this.getRoutes()
  }

  getRoutes () {
     this.router.post('/create',authenticateJWT, upload.single('banner'), BannerController.createBanner.bind(BannerController))
  }
}

export default new BannerRoute().router
