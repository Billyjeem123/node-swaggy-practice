import { Router } from 'express'
import { CityController } from '../controllers/CityController';
export class BannerRoute {
  public router: Router

  constructor () {
    this.router = Router()
    this.getRoutes()
  }

  getRoutes () {
     this.router.get('/all', CityController.allRecords.bind(CityController))
  }
}

export default new BannerRoute().router
