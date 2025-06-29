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
exports.RestaurantController = void 0;
const Restaurant_1 = require("../models/Restaurant");
const validate_1 = require("../Utility/validate");
const RestaurantResource_1 = require("../Resource/RestaurantResource");
class RestaurantController {
    static createRestaurant(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, validate_1.handleValidationErrors)(req, res))
                    return;
                const { name, city_id } = req.body;
                const auth = req.user; // OR cast req with custom type if using TypeScript
                const alreadyExists = yield Restaurant_1.RestaurantModel.findOne({
                    user_id: auth.userId
                });
                console.log(alreadyExists);
                if (alreadyExists) {
                    return res.status(400).json({
                        success: false,
                        message: 'Unable to complete request, a restaurant has already been created by you.',
                        data: RestaurantResource_1.RestaurantResource.toJson(alreadyExists)
                    });
                }
                const newRestaurant = yield RestaurantController.store({
                    name,
                    city_id,
                    user_id: auth.userId
                });
                return RestaurantController.sendSuccessResponse(res, newRestaurant);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static store(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, city_id, user_id }) {
            const restaurant = new Restaurant_1.RestaurantModel({ name, city_id: city_id, user_id });
            const savedRestaurant = yield restaurant.save();
            return Restaurant_1.RestaurantModel.findById(savedRestaurant._id)
                .populate('user_id')
                .populate('city_id');
        });
    }
    static sendSuccessResponse(res, restaurant) {
        return res.status(201).json({
            success: true,
            message: 'Restaurant created successfully.',
            data: RestaurantResource_1.RestaurantResource.toJson(restaurant)
        });
    }
    static myRestaurant(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const auth = req.user;
                const details = yield Restaurant_1.RestaurantModel.findOne({ user_id: auth.userId })
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
                    data: RestaurantResource_1.RestaurantResource.toJson(details),
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static updateMyRestaurant(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const auth = req.user;
                const restaurant = yield Restaurant_1.RestaurantModel.findOne({ user_id: auth.userId });
                if (!restaurant) {
                    return res.status(404).json({
                        success: false,
                        message: 'No restaurant found for this user.',
                        data: null,
                    });
                }
                // Extract possible fields to update
                const { name, city_id } = req.body;
                if (name)
                    restaurant.name = name;
                if (city_id)
                    restaurant.city_id = city_id;
                yield restaurant.save();
                const updated = yield Restaurant_1.RestaurantModel.findById(restaurant._id)
                    .populate('city_id')
                    .populate('user_id');
                return res.status(200).json({
                    success: true,
                    message: 'Restaurant updated successfully.',
                    data: RestaurantResource_1.RestaurantResource.toJson(updated),
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.RestaurantController = RestaurantController;
