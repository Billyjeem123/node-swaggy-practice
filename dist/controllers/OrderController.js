"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const Order_1 = require("../models/Order");
const OrderResource_1 = require("../Resource/OrderResource");
class OrderController {
    static createOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { restaurant_id, food_id, amount } = req.body;
                const user_id = req.user.userId;
                // 2. Check for duplicate food by name within the same restaurant
                const alreadyExists = yield Order_1.OrderModel.findOne({
                    food_id: food_id,
                    user_id: user_id,
                    restaurant_id: restaurant_id // ensure it checks under same restaurant
                });
                if (alreadyExists) {
                    return res.status(400).json({
                        success: false,
                        message: 'Order already exists in your cart',
                        data: OrderResource_1.OrderResource.toJson(alreadyExists)
                    });
                }
                // 3. Create and return the new food item
                const food = yield OrderController.store({
                    food_id: food_id,
                    user_id: user_id,
                    restaurant_id: restaurant_id,
                    amount
                });
                return OrderController.sendSuccessResponse(res, food);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static store(_a) {
        return __awaiter(this, arguments, void 0, function* ({ food_id: food_id, user_id: user_id, restaurant_id: restaurant_id, amount }) {
            const order = new Order_1.OrderModel({ food_id, user_id, restaurant_id, amount });
            const savedOrder = yield order.save();
            return Order_1.OrderModel.findById(savedOrder._id).populate('restaurant_id food_id  user_id');
        });
    }
    static sendSuccessResponse(res, restaurant) {
        return res.status(201).json({
            success: true,
            message: 'Order item created successfully.',
            data: OrderResource_1.OrderResource.toJson(restaurant)
        });
    }
    static allRecords(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { restaurant_id } = req.params;
                if (!restaurant_id) {
                    return res.status(400).json({
                        success: false,
                        message: 'restaurant_id is required as a query parameter.',
                        data: null
                    });
                }
                const foods = yield Order_1.OrderModel.find({ restaurant_id })
                    .populate('restaurant_id'); // optional, to load full restaurant info
                return res.status(200).json({
                    success: true,
                    message: 'All food items fetched successfully.',
                    data: OrderResource_1.OrderResource.collection(foods)
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteFood(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    return res.status(400).json({
                        success: false,
                        message: 'Food ID is required in the URL.',
                        data: null
                    });
                }
                const deleted = yield Order_1.OrderModel.findByIdAndDelete(id);
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
            }
            catch (error) {
                next(error);
            }
        });
    }
    static updateFood(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const updatedFood = yield Order_1.OrderModel.findByIdAndUpdate(id, { name, restaurant_id }, { new: true } // return the updated document
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
                    data: OrderResource_1.OrderResource.toJson(updatedFood),
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static CustomerOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.user.userId;
                const orders = yield Order_1.OrderModel.find({ user_id })
                    .populate('restaurant_id food_id user_id');
                return res.status(200).json({
                    success: true,
                    message: 'Customer orders fetched successfully',
                    data: OrderResource_1.OrderResource.collection(orders)
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.OrderController = OrderController;
