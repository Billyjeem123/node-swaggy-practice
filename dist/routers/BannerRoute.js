"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerRoute = void 0;
const express_1 = require("express");
const Auth_1 = require("../middlewares/Auth");
const BannerController_1 = require("../controllers/BannerController");
const Upload_1 = require("../middlewares/Upload");
class BannerRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
    }
    getRoutes() {
        this.router.post('/create', Auth_1.authenticateJWT, Upload_1.upload.single('banner'), BannerController_1.BannerController.createBanner.bind(BannerController_1.BannerController));
    }
}
exports.BannerRoute = BannerRoute;
exports.default = new BannerRoute().router;
