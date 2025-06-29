import {NextFunction, Request, Response} from 'express'
import {OrderModel} from "../models/Order";
import {OrderResource} from "../Resource/OrderResource";
import {PaymentModel} from "../models/Payment";
import {PaymentResource} from "../Resource/PaymentResource";

export class OrderController {
    static async createOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const {restaurant_id, food_id, amount} = req.body

            const user_id = req.user.userId;

            // 2. Check for duplicate food by name within the same restaurant
            const alreadyExists = await OrderModel.findOne({
                food_id: food_id,
                user_id: user_id,
                restaurant_id: restaurant_id // ensure it checks under same restaurant
            })

            if (alreadyExists) {
                return res.status(400).json({
                    success: false,
                    message: 'Order already exists in your cart',
                    data: OrderResource.toJson(alreadyExists)
                })
            }

            // 3. Create and return the new food item
            const food = await OrderController.store({
                food_id: food_id,
                user_id: user_id,
                restaurant_id: restaurant_id,
                amount
            })

            return OrderController.sendSuccessResponse(res, food)
        } catch (error) {
            next(error)
        }
    }

    static async allRecords(req: Request, res: Response, next: NextFunction) {
        try {
            const {restaurant_id} = req.params;

            if (!restaurant_id) {
                return res.status(400).json({
                    success: false,
                    message: 'restaurant_id is required as a query parameter.',
                    data: null
                });
            }


            const foods = await OrderModel.find({restaurant_id})
                .populate('restaurant_id'); // optional, to load full restaurant info

            return res.status(200).json({
                success: true,
                message: 'All food items fetched successfully.',
                data: OrderResource.collection(foods)
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteFood(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Food ID is required in the URL.',
                    data: null
                });
            }

            const deleted = await OrderModel.findByIdAndDelete(id);

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
            const {id} = req.params;
            const {name, restaurant_id} = req.body;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Food ID is required in the URL.',
                    data: null,
                });
            }

            const updatedFood = await OrderModel.findByIdAndUpdate(
                id,
                {name, restaurant_id},
                {new: true} // return the updated document
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
                data: OrderResource.toJson(updatedFood),
            });
        } catch (error) {
            next(error);
        }
    }

    static async CustomerOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = req.user.userId;

            const orders = await OrderModel.find({user_id})
                .populate('restaurant_id food_id user_id');

            return res.status(200).json({
                success: true,
                message: 'Customer orders fetched successfully',
                data: OrderResource.collection(orders)
            });
        } catch (error) {
            next(error);
        }
    }

    static async CustomerPaidOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = req.user.userId;

            const orders = await PaymentModel.find({
                user_id,
                status: "success"
            })
                .populate('restaurant_id')
                .populate('user_id')
                .populate({
                    path: 'order_id',
                    populate: {
                        path: 'food_id'
                    }
                });


            return res.status(200).json({
                success: true,
                message: 'Payment transaction orders fetched successfully',
                data: PaymentResource.collection(orders)
            });
        } catch (error) {
            next(error);
        }
    }


    static async MerchantPaidOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const {restaurant_id} = req.params;

            if (!restaurant_id) {
                return res.status(400).json({
                    success: false,
                    message: 'restaurant_id is required in the URL path.',
                    data: null
                });
            }

            const orders = await PaymentModel.find({
                restaurant_id,
                status: "success"
            })
                .populate('restaurant_id')
                .populate('user_id')
                .populate({
                    path: 'order_id',
                    populate: {
                        path: 'food_id'
                    }
                });


            return res.status(200).json({
                success: true,
                message: 'Payment transaction orders fetched successfully',
                data: PaymentResource.collection(orders)
            });
        } catch (error) {
            next(error);
        }
    }

    private static async store({
                                   food_id: food_id,
                                   user_id: user_id,
                                   restaurant_id: restaurant_id,
                                   amount
                               }: {
        food_id: string
        user_id: string,
        restaurant_id: string
        amount: number
    }) {
        const order = new OrderModel({food_id, user_id, restaurant_id, amount})
        const savedOrder = await order.save()
        return OrderModel.findById(savedOrder._id).populate('restaurant_id food_id  user_id')
    }

    private static sendSuccessResponse(res: Response, restaurant: any) {
        return res.status(201).json({
            success: true,
            message: 'Order item created successfully.',
            data: OrderResource.toJson(restaurant)
        })
    }

}
