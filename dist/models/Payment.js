"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModel = void 0;
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    order_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'orders',
        required: true,
    },
    restaurant_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'restaurants',
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    transaction_ref: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    gateway_response: {
        type: String,
    },
    channel: {
        type: String,
    },
    currency: {
        type: String,
        default: 'NGN',
    },
    paid_at: {
        type: Date,
    },
}, {
    timestamps: true,
});
exports.PaymentModel = mongoose_1.default.model('payments', paymentSchema);
