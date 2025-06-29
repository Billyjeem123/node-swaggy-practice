import {NextFunction, Request, Response} from 'express'
import {RestaurantModel} from '../models/Restaurant'
import {handleValidationErrors} from '../Utility/validate'
import {RestaurantResource} from '../Resource/RestaurantResource'
import {Redis} from "../Utility/redis";

export class RestaurantController {
    static async createRestaurant(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            if (handleValidationErrors(req, res)) return

            const {name, city_id} = req.body
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

    static async myRestaurant(req: Request, res: Response, next: NextFunction) {
        try {
            const auth = (req as any).user;
            const cacheKey = `user:${auth.userId}:restaurant`;

            // 🔍 1. Try fetching from Redis cache
            const cachedData = await Redis.get(cacheKey);
            if (cachedData) {
                return res.status(200).json({
                    success: true,
                    message: 'Record fetched from cache.',
                    data: cachedData,
                    from_cache: true,
                });
            }

            // 🧑‍🍳 2. Fetch from DB
            const details = await RestaurantModel.findOne({user_id: auth.userId})
                .populate('city_id')
                .populate('user_id');

            if (!details) {
                return res.status(404).json({
                    success: false,
                    message: 'No restaurant found for this user.',
                    data: null,
                    from_cache: false,
                });
            }

            const responseData = RestaurantResource.toJson(details);

            // 📦 3. Save to Redis for future
            await Redis.set(cacheKey, responseData, 3600); // 1 hour

            return res.status(200).json({
                success: true,
                message: 'Record fetched from database.',
                data: responseData,
                from_cache: false,
            });
        } catch (error) {
            next(error);
        }
    }


    static async updateMyRestaurant(req: Request, res: Response, next: NextFunction) {
        try {
            const auth = (req as any).user;
            const cacheKey = `user:${auth.userId}:restaurant`;

            const restaurant = await RestaurantModel.findOne({user_id: auth.userId});

            if (!restaurant) {
                return res.status(404).json({
                    success: false,
                    message: 'No restaurant found for this user.',
                    data: null,
                });
            }

            const {name, city_id} = req.body;

            if (name) restaurant.name = name;
            if (city_id) restaurant.city_id = city_id;

            await restaurant.save();

            const updated = await RestaurantModel.findById(restaurant._id)
                .populate('city_id')
                .populate('user_id');

            const updatedData = RestaurantResource.toJson(updated);

            // ✅ Update the cache with new data
            await Redis.set(cacheKey, updatedData, 3600); // cache for 1 hour

            return res.status(200).json({
                success: true,
                message: 'Restaurant updated successfully.',
                data: updatedData,
                from_cache: false
            });
        } catch (error) {
            next(error);
        }
    }

    private static async store({
                                   name,
                                   city_id,
                                   user_id
                               }: {
        name: string
        city_id: string
        user_id: string
    }) {
        const restaurant = new RestaurantModel({name, city_id: city_id, user_id})
        const savedRestaurant = await restaurant.save()

        return RestaurantModel.findById(savedRestaurant._id)
            .populate('user_id')
            .populate('city_id')
    }

    private static sendSuccessResponse(res: Response, restaurant: any) {
        return res.status(201).json({
            success: true,
            message: 'Restaurant created successfully.',
            data: RestaurantResource.toJson(restaurant)
        })
    }


}
