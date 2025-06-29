export class PaymentResource {
    static toJson(payment) {
        return {
            type: "payments",
            id: payment._id,
            attributes: {
                user: payment.user_id?.name ?? null, // Assuming populated
                order: payment.order_id ? {
                    id: payment.order_id._id,
                } : null,
                restaurant: payment.restaurant_id ? {
                    id: payment.restaurant_id.name,
                    city: payment.restaurant_id.city_id?.name ?? null, // Assuming populated
                } : null,
                food: payment.order_id && payment.order_id.food_id ? {
                    id: payment.order_id.food_id._id,
                    name: payment.order_id.food_id.name,
                    price: payment.order_id.food_id.price, // or any other fields
                } : null,

                transaction_ref: payment.transaction_ref,
                status: payment.status,
                amount: payment.amount,
                channel: payment.channel ?? null,
                currency: payment.currency ?? 'NGN',
                gateway_response: payment.gateway_response ?? null,
                paid_at: payment.paid_at ? new Date(payment.paid_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                }) : null,
                created_at: new Date(payment.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                }),
            }
        };
    }

    static collection(payments) {
        return payments.map(payment => this.toJson(payment));
    }
}
