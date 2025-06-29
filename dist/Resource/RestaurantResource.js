"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantResource = void 0;
class RestaurantResource {
    static toJson(restaurant) {
        var _a;
        return {
            type: "Restaurant",
            id: restaurant._id,
            attributes: {
                name: (_a = restaurant.name) !== null && _a !== void 0 ? _a : '',
                user: restaurant.user_id ? {
                    id: restaurant.user_id._id,
                    name: restaurant.user_id.name,
                } : null,
                city: restaurant.city_id ? {
                    name: restaurant.city_id.name,
                } : null,
                created_at: new Date(restaurant.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                })
            }
        };
    }
    static collection(restaurants) {
        return restaurants.map(restaurant => this.toJson(restaurant));
    }
}
exports.RestaurantResource = RestaurantResource;
