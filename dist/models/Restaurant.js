"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantModel = void 0;
// models/Restaurant.ts
const mongoose_1 = require("mongoose");
const RestaurantSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    city_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'cities', // Might be a duplicate of `city`, clarify usage
        required: false // optional in case not always present
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users', // References the 'users' collection
        required: true,
    },
});
exports.RestaurantModel = mongoose_1.default.model('restaurants', RestaurantSchema);
