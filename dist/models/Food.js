"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodModel = void 0;
// models/Restaurant.ts
const mongoose_1 = require("mongoose");
const foodSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }, // ✅ Add price field
    restaurant_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'restaurants',
        required: true
    }
}, {
    timestamps: true // ✅ Adds createdAt and updatedAt automatically
});
exports.FoodModel = mongoose_1.default.model('foods', foodSchema);
