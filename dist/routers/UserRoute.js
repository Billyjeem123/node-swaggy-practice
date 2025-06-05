"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const validation_1 = require("../validation/validation");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
    }
    getRoutes() {
        this.router.post('/create', validation_1.GlobalRequest.signup(), UserController_1.UserController.signup.bind(UserController_1.UserController));
        this.router.get('/all', UserController_1.UserController.allusers.bind(UserController_1.UserController));
        this.router.put('/update/:id', UserController_1.UserController.updateUser.bind(UserController_1.UserController)); // Update user by ID
        this.router.delete('/delete/:id', UserController_1.UserController.deleteUser.bind(UserController_1.UserController)); // Delete user by ID
        //  Use the login method, and when you use it, remember it belongs to UserController
    }
}
exports.UserRouter = UserRouter;
exports.default = new UserRouter().router;
