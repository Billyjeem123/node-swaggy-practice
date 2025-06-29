"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    food_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'foods',
        required: true
    },
    restaurant_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'restaurants',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});
exports.OrderModel = mongoose_1.default.model('orders', orderSchema);
