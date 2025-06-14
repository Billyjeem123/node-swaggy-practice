import { Router } from 'express'
import { CityController } from '../controllers/CityController';
export class BannerRoute {
  public router: Router

  constructor () {
    this.router = Router()
    this.getRoutes()
  }

  getRoutes () {
     this.router.post('/all-records', CityController.allRecords.bind(CityController))
  }
}

export default new BannerRoute().router
