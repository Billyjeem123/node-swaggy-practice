"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodResource = void 0;
const formatter_1 = require("../Utility/formatter");
class FoodResource {
    static toJson(food) {
        return {
            type: "food items",
            id: food._id,
            attributes: {
                name: food.name,
                price: (0, formatter_1.formatCurrency)(food.price), // reusable function
                created_at: new Date(food.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                }),
            },
            restaurant: {
                restaurant: food.restaurant_id
                    ? {
                        id: food.restaurant_id._id,
                        name: food.restaurant_id.name,
                    }
                    : null,
            },
        };
    }
    static collection(foods) {
        return foods.map(food => this.toJson(food));
    }
}
exports.FoodResource = FoodResource;
