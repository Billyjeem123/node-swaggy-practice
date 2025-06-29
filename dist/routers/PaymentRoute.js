"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoute = void 0;
const express_1 = require("express");
const Auth_1 = require("../middlewares/Auth");
const PaymentController_1 = require("../controllers/PaymentController");
const validation_1 = require("../validation/validation");
class PaymentRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
    }
    getRoutes() {
        this.router.post('/create', Auth_1.authenticateJWT, validation_1.GlobalRequest.createPayment(), PaymentController_1.PaymentController.recordTransaction.bind(PaymentController_1.PaymentController));
        this.router.get('/call-back', PaymentController_1.PaymentController.paymentCallBack.bind(PaymentController_1.PaymentController));
    }
}
exports.PaymentRoute = PaymentRoute;
exports.default = new PaymentRoute().router;
