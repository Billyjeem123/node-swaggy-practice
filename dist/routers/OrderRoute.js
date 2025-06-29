"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoute = void 0;
const express_1 = require("express");
const validation_1 = require("../validation/validation");
const Auth_1 = require("../middlewares/Auth");
const OrderController_1 = require("../controllers/OrderController");
class OrderRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
    }
    getRoutes() {
        this.router.post('/create', Auth_1.authenticateJWT, validation_1.GlobalRequest.createOrder(), OrderController_1.OrderController.createOrder.bind(OrderController_1.OrderController));
        this.router.get('/customer-order', Auth_1.authenticateJWT, OrderController_1.OrderController.CustomerOrder.bind(OrderController_1.OrderController));
        this.router.get('/my-order', Auth_1.authenticateJWT, OrderController_1.OrderController.allRecords.bind(OrderController_1.OrderController));
    }
}
exports.OrderRoute = OrderRoute;
exports.default = new OrderRoute().router;
