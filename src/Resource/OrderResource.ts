import { formatCurrency } from "../Utility/formatter";

export class OrderResource {
    static toJson(order) {
        return {
            type: "order items",
            id: order._id,
            attributes: {
                name: order.name,
                user: order.user_id?.name ?? null, // <- Corrected
                food: order.food_id?.name ?? null,
                amount: formatCurrency(order.amount),
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

