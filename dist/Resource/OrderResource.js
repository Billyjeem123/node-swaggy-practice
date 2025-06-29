"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderResource = void 0;
const formatter_1 = require("../Utility/formatter");
class OrderResource {
    static toJson(order) {
        var _a, _b, _c, _d;
        return {
            type: "order items",
            id: order._id,
            attributes: {
                name: order.name,
                user: (_b = (_a = order.user_id) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : null, // <- Corrected
                food: (_d = (_c = order.food_id) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : null,
                amount: (0, formatter_1.formatCurrency)(order.amount),
                created_at: new Date(order.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                }),
                restaurant: order.restaurant_id
                    ? {
                        id: order.restaurant_id._id,
                        name: order.restaurant_id.name,
                    }
                    : null,
            }
        };
    }
    static collection(orders) {
        return orders.map(order => this.toJson(order));
    }
}
exports.OrderResource = OrderResource;
