"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminRoute = void 0;
const express_1 = require("express");
const validation_1 = require("../validation/validation");
const Auth_1 = require("../middlewares/Auth");
const CategoryController_1 = require("../controllers/CategoryController");
const CityController_1 = require("../controllers/CityController");
const UserController_1 = require("../controllers/UserController");
const Upload_1 = require("../middlewares/Upload");
const BannerController_1 = require("../controllers/BannerController");
class SuperAdminRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
    }
    getRoutes() {
        this.router.post('/create-category', Auth_1.authenticateJWT, validation_1.GlobalRequest.createCategory(), CategoryController_1.CategoryController.createCategory.bind(CategoryController_1.CategoryController));
        this.router.get('/all-category', Auth_1.authenticateJWT, CategoryController_1.CategoryController.allcategories.bind(CategoryController_1.CategoryController));
        this.router.get('/category/:id', Auth_1.authenticateJWT, CategoryController_1.CategoryController.allcategories.bind(CategoryController_1.CategoryController));
        //city Routes
        this.router.get('/city-all', CityController_1.CityController.allRecords.bind(CityController_1.CityController));
        //allusers
        this.router.get('/all-users', Auth_1.authenticateJWT, UserController_1.UserController.allusers.bind(UserController_1.UserController));
        //Upload Banner
        this.router.post('/create', Auth_1.authenticateJWT, Upload_1.upload.single('banner'), BannerController_1.BannerController.createBanner.bind(BannerController_1.BannerController));
    }
}
exports.SuperAdminRoute = SuperAdminRoute;
exports.default = new SuperAdminRoute().router;
