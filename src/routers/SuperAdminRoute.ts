import { Router } from 'express'
import { GlobalRequest } from '../validation/validation'
import { authenticateJWT } from '../middlewares/Auth'
import { CategoryController } from '../controllers/CategoryController'
import { CityController } from '../controllers/CityController'
import { UserController } from '../controllers/UserController'
import { upload } from '../middlewares/Upload'
import { BannerController } from '../controllers/BannerController'
export class SuperAdminRoute {
  public router: Router

  constructor () {
    this.router = Router()
    this.getRoutes()
  }

  getRoutes () {
    this.router.post(
      '/create-category',
      authenticateJWT,
      GlobalRequest.createCategory(),
      CategoryController.createCategory.bind(CategoryController)
    )
    this.router.get(
      '/all-category',
      authenticateJWT,
      CategoryController.allcategories.bind(CategoryController)
    )
    this.router.get(
      '/category/:id',
      authenticateJWT,
      CategoryController.allcategories.bind(CategoryController)
    )

    //city Routes
    this.router.get('/city-all', CityController.allRecords.bind(CityController))

    //allusers
    this.router.get(
      '/all-users',
      authenticateJWT,
      UserController.allusers.bind(UserController)
    )

    //Upload Banner
    this.router.post(
      '/create',
      authenticateJWT,
      upload.single('banner'),
      BannerController.createBanner.bind(BannerController)
    )
  }
}

export default new SuperAdminRoute().router
