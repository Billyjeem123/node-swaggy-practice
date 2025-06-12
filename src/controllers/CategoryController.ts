import { Request, Response, NextFunction } from 'express'
import { handleValidationErrors } from '../Utility/validate'
import { CategoryResource } from '../Resource/CategoryResource'
import { CategoryModel } from '../models/Category'

export class CategoryController {
  static async createCategory (req: Request, res: Response, next: NextFunction) {
    try {
      if (handleValidationErrors(req, res)) return

      const { name } = req.body
      const category = new CategoryModel({
        name,
        user_id: req.user.userId
      })
      await category.save()

      // Equivalent to Laravel's ->load('user')
      const populatedCategory = await CategoryModel.findById(
        category._id
      ).populate('user_id')

      return res.status(201).json({
        success: true,
        message: 'Category created successfully',
        data: CategoryResource.toJson(populatedCategory)
      })
    } catch (error) {
      next(error)
    }
  }

static async allcategories(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    if (id) {
      const category = await CategoryModel.findById(id).populate('user_id');

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found.',
          data: []
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Category fetched successfully.',
        data: CategoryResource.toJson(category),
      });
    }

    const categories = await CategoryModel.find({ user_id: req.user.userId }).populate('user_id');

    return res.status(200).json({
      success: true,
      message: 'All categories fetched successfully.',
      data: CategoryResource.collection(categories),
    });
  } catch (error) {
    next(error); // Pass error to global error handler
  }
}

}
