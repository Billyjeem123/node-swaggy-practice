"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentResource = void 0;
class PaymentResource {
    static toJson(payment) {
        var _a, _b, _c, _d, _e, _f, _g;
        return {
            type: "payments",
            id: payment._id,
            attributes: {
                user: (_b = (_a = payment.user_id) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : null, // Assuming populated
                order: payment.order_id ? {
                    id: payment.order_id._id,
                } : null,
                restaurant: payment.restaurant_id ? {
                    id: payment.restaurant_id.name,
                    city: (_d = (_c = payment.restaurant_id.city_id) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : null, // Assuming populated
                } : null,
                transaction_ref: payment.transaction_ref,
                status: payment.status,
                amount: payment.amount,
                channel: (_e = payment.channel) !== null && _e !== void 0 ? _e : null,
                currency: (_f = payment.currency) !== null && _f !== void 0 ? _f : 'NGN',
                gateway_response: (_g = payment.gateway_response) !== null && _g !== void 0 ? _g : null,
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
exports.PaymentResource = PaymentResource;
