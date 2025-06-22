"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const validation_1 = require("../validation/validation");
const Auth_1 = require("../middlewares/Auth");
const RestaurantController_1 = require("../controllers/RestaurantController");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
    }
    getRoutes() {
        this.router.post('/signup', ...validation_1.GlobalRequest.signup(), UserController_1.UserController.signup.bind(UserController_1.UserController));
        this.router.post('/login', ...validation_1.GlobalRequest.login(), UserController_1.UserController.login.bind(UserController_1.UserController));
        this.router.get('/my-profile', Auth_1.authenticateJWT, UserController_1.UserController.myProfile.bind(UserController_1.UserController));
        this.router.get('/all', Auth_1.authenticateJWT, UserController_1.UserController.allusers.bind(UserController_1.UserController));
        this.router.put('/update/:id', UserController_1.UserController.updateUser.bind(UserController_1.UserController)); // Update user by ID
        this.router.delete('/delete/:id', UserController_1.UserController.deleteUser.bind(UserController_1.UserController)); // Delete user by ID
        //  Use the login method, and when you use it, remember it belongs to UserController
        this.router.post('/create-restaurant', Auth_1.authenticateMerchant, validation_1.GlobalRequest.createRestaurant(), RestaurantController_1.RestaurantController.createRestaurant.bind(RestaurantController_1.RestaurantController));
    }
}
exports.UserRouter = UserRouter;
exports.default = new UserRouter().router;
