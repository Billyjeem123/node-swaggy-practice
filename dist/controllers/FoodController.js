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
exports.FoodController = void 0;
const FoodResource_1 = require("../Resource/FoodResource");
const Food_1 = require("../models/Food");
class FoodController {
    static createFood(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, restaurant_id, price } = req.body;
                // 2. Check for duplicate food by name within the same restaurant
                const alreadyExists = yield Food_1.FoodModel.findOne({
                    name: name,
                    restaurant_id: restaurant_id // ensure it checks under same restaurant
                });
                if (alreadyExists) {
                    return res.status(400).json({
                        success: false,
                        message: 'Food already exists for this restaurant.',
                        data: FoodResource_1.FoodResource.toJson(alreadyExists)
                    });
                }
                // 3. Create and return the new food item
                const food = yield FoodController.store({
                    name,
                    price,
                    restaurant_id
                });
                return FoodController.sendSuccessResponse(res, food);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static store(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, price, restaurant_id }) {
            const food = new Food_1.FoodModel({ name, price, restaurant_id });
            const savedFood = yield food.save();
            return Food_1.FoodModel.findById(savedFood._id).populate('restaurant_id');
        });
    }
    static sendSuccessResponse(res, restaurant) {
        return res.status(201).json({
            success: true,
            message: 'Food item created successfully.',
            data: FoodResource_1.FoodResource.toJson(restaurant)
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
                const foods = yield Food_1.FoodModel.find({ restaurant_id })
                    .populate('restaurant_id'); // optional, to load full restaurant info
                return res.status(200).json({
                    success: true,
                    message: 'All food items fetched successfully.',
                    data: FoodResource_1.FoodResource.collection(foods)
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
                const deleted = yield Food_1.FoodModel.findByIdAndDelete(id);
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
                const updatedFood = yield Food_1.FoodModel.findByIdAndUpdate(id, { name, restaurant_id }, { new: true } // return the updated document
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
                    data: FoodResource_1.FoodResource.toJson(updatedFood),
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.FoodController = FoodController;
