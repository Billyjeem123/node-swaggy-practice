import { Request, Response, NextFunction } from 'express'
import { RestaurantModel } from '../models/Restaurant'
import { handleValidationErrors } from '../Utility/validate'
import { RestaurantResource } from '../Resource/RestaurantResource'

export class RestaurantController {
  static async createRestaurant (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (handleValidationErrors(req, res)) return

      const { name, city_id } = req.body
      const auth = (req as any).user // OR cast req with custom type if using TypeScript

     
      const alreadyExists = await RestaurantModel.findOne({
        user_id: auth.userId
      })

      console.log(alreadyExists)

      if (alreadyExists) {
        return res.status(400).json({
          success: false,
          message:
            'Unable to complete request, a restaurant has already been created by you.',
          data: RestaurantResource.toJson(alreadyExists)
        })
      }

       const newRestaurant = await RestaurantController.store({
        name,
        city_id,
        user_id: auth.userId
      })


      return RestaurantController.sendSuccessResponse(res, newRestaurant)
    } catch (error) {
      next(error)
    }
  }

  private static async store ({
    name,
    city_id,
    user_id
  }: {
    name: string
    city_id: string
    user_id: string
  }) {
    const restaurant = new RestaurantModel({ name, city_id: city_id, user_id })
    const savedRestaurant = await restaurant.save()

    return RestaurantModel.findById(savedRestaurant._id)
      .populate('user_id')
      .populate('city_id')
  }

  private static sendSuccessResponse (res: Response, restaurant: any) {
    return res.status(201).json({
      success: true,
      message: 'Restaurant created successfully.',
      data: RestaurantResource.toJson(restaurant)
    })
  }

static async myRestaurant(req: Request, res: Response, next: NextFunction) {
  try {
    const auth = (req as any).user;

    const details = await RestaurantModel.findOne({ user_id: auth.userId })
      .populate('city_id')
      .populate('user_id');

    if (!details) {
      return res.status(404).json({
        success: false,
        message: 'No restaurant found for this user.',
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Record fetched successfully.',
      data: RestaurantResource.toJson(details),
    });
  } catch (error) {
    next(error);
  }
}

static async updateMyRestaurant(req: Request, res: Response, next: NextFunction) {
  try {
    const auth = (req as any).user;

    const restaurant = await RestaurantModel.findOne({ user_id: auth.userId });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'No restaurant found for this user.',
        data: null,
      });
    }

    // Extract possible fields to update
    const { name, city_id } = req.body;

    if (name) restaurant.name = name;
    if (city_id) restaurant.city_id = city_id;

    await restaurant.save();

    const updated = await RestaurantModel.findById(restaurant._id)
      .populate('city_id')
      .populate('user_id');

    return res.status(200).json({
      success: true,
      message: 'Restaurant updated successfully.',
      data: RestaurantResource.toJson(updated),
    });
  } catch (error) {
    next(error);
  }
}


  
}
