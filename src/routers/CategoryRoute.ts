import { Router } from 'express'
import { GlobalRequest } from '../validation/validation'
import { authenticateJWT } from '../middlewares/Auth'
import { CategoryController } from '../controllers/CategoryController'
export class CategoryRoute {
  public router: Router

  constructor () {
    this.router = Router()
    this.getRoutes()
  }

  getRoutes () {
     this.router.post('/create',authenticateJWT, GlobalRequest.createCategory(), CategoryController.createCategory.bind(CategoryController))
     this.router.get('/all', authenticateJWT, CategoryController.allcategories.bind(CategoryController));
     this.router.get('/all/:id', authenticateJWT, CategoryController.allcategories.bind(CategoryController));


  }
}

export default new CategoryRoute().router
