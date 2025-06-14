import { Request, Response, NextFunction } from 'express'
import { FoodResource } from '../Resource/FoodResource'
import { FoodModel } from '../models/Food'

export class FoodController {
  static async createFood (req: Request, res: Response, next: NextFunction) {
    try {
      const { name, restaurant_id } = req.body

      // 2. Check for duplicate food by name within the same restaurant
      const alreadyExists = await FoodModel.findOne({
        name: name,
        restaurant_id: restaurant_id // ensure it checks under same restaurant
      })

      if (alreadyExists) {
        return res.status(400).json({
          success: false,
          message: 'Food already exists for this restaurant.',
          data: FoodResource.toJson(alreadyExists)
        })
      }

      // 3. Create and return the new food item
      const food = await FoodController.store({
        name,
        restaurant_id
      })

      return FoodController.sendSuccessResponse(res, food)
    } catch (error) {
      next(error)
    }
  }

  private static async store ({
    name,
    restaurant_id
  }: {
    name: string
    restaurant_id: string
  }) {
    const food = new FoodModel({ name, restaurant_id })

    const savedFood = await food.save()

    return FoodModel.findById(savedFood._id).populate('restaurant_id')
  }

  private static sendSuccessResponse (res: Response, restaurant: any) {
    return res.status(201).json({
      success: true,
      message: 'Food item created successfully.',
      data: FoodResource.toJson(restaurant)
    })
  }

  static async allRecords (req: Request, res: Response, next: NextFunction) {
    try {
      const foods = await FoodModel.find() // Fetches all foods from DB

      return res.status(200).json({
        success: true,
        message: 'All foods items  fetched successfully.',
        data: FoodResource.collection(foods)
      })
    } catch (error) {
      next(error) // Pass error to global error handler
    }
  }
}
