import { Request, Response, NextFunction } from 'express'
import { FoodResource } from '../Resource/FoodResource'
import { FoodModel } from '../models/Food'

export class OrderController {
  static async createFood (req: Request, res: Response, next: NextFunction) {
    try {
      const { name, restaurant_id, price } = req.body

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
      const food = await OrderController.store({
        name,
        price,
        restaurant_id
      })

      return OrderController.sendSuccessResponse(res, food)
    } catch (error) {
      next(error)
    }
  }

  private static async store ({
    name,
    price,
    restaurant_id
  }: {
    name: string
    price:number,
    restaurant_id: string
  }) {
    const food = new FoodModel({ name, price, restaurant_id })
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

  static async allRecords(req: Request, res: Response, next: NextFunction) {
  try {
    const { restaurant_id } = req.params;

    if (!restaurant_id) {
      return res.status(400).json({
        success: false,
        message: 'restaurant_id is required as a query parameter.',
        data: null
      });
    }

    
    const foods = await FoodModel.find({ restaurant_id })
      .populate('restaurant_id'); // optional, to load full restaurant info

    return res.status(200).json({
      success: true,
      message: 'All food items fetched successfully.',
      data: FoodResource.collection(foods)
    });
  } catch (error) {
    next(error);
  }
}

static async deleteFood(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Food ID is required in the URL.',
        data: null
      });
    }

    const deleted = await FoodModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Food item not found.',
        data: null
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Food item deleted successfully.',
      data: null
    });
  } catch (error) {
    next(error);
  }
}

static async updateFood(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { name, restaurant_id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Food ID is required in the URL.',
        data: null,
      });
    }

    const updatedFood = await FoodModel.findByIdAndUpdate(
      id,
      { name, restaurant_id },
      { new: true } // return the updated document
    ).populate('restaurant_id');

    if (!updatedFood) {
      return res.status(404).json({
        success: false,
        message: 'Food item not found.',
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Food item updated successfully.',
      data: FoodResource.toJson(updatedFood),
    });
  } catch (error) {
    next(error);
  }
}


}
