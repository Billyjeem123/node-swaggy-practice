"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantRoute = void 0;
const express_1 = require("express");
const validation_1 = require("../validation/validation");
const Auth_1 = require("../middlewares/Auth");
const FoodController_1 = require("../controllers/FoodController");
const RestaurantController_1 = require("../controllers/RestaurantController");
class MerchantRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
    }
    getRoutes() {
        this.router.post('/create-food', Auth_1.authenticateMerchant, validation_1.GlobalRequest.createFood(), FoodController_1.FoodController.createFood.bind(FoodController_1.FoodController));
        this.router.get('/all-foods/:restaurant_id', Auth_1.authenticateMerchant, FoodController_1.FoodController.allRecords.bind(FoodController_1.FoodController));
        this.router.delete('/delete-food/:id', Auth_1.authenticateMerchant, FoodController_1.FoodController.deleteFood.bind(FoodController_1.FoodController));
        this.router.put('/update-food/:id', Auth_1.authenticateMerchant, FoodController_1.FoodController.updateFood.bind(FoodController_1.FoodController));
        //Restaurant Merchant
        this.router.post('/create-restaurant', Auth_1.authenticateMerchant, validation_1.GlobalRequest.createRestaurant(), RestaurantController_1.RestaurantController.createRestaurant.bind(RestaurantController_1.RestaurantController));
        this.router.get('/my-restaurant', Auth_1.authenticateMerchant, RestaurantController_1.RestaurantController.myRestaurant.bind(RestaurantController_1.RestaurantController));
        this.router.put('/restaurant/update', Auth_1.authenticateMerchant, validation_1.GlobalRequest.updateMyRestaurant(), RestaurantController_1.RestaurantController.updateMyRestaurant.bind(RestaurantController_1.RestaurantController));
    }
}
exports.MerchantRoute = MerchantRoute;
exports.default = new MerchantRoute().router;
