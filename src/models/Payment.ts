import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
    user_id: mongoose.Types.ObjectId;
    order_id: mongoose.Types.ObjectId;
    restaurant_id: mongoose.Types.ObjectId;
    status: string; // e.g., 'success', 'failed'
    transaction_ref: string; // Paystack transaction reference
    amount: number;
    gateway_response?: string; // Optional: response from Paystack
    channel?: string; // e.g., 'card', 'bank'
    currency?: string; // e.g., 'NGN'
    paid_at?: Date;
}

const paymentSchema: Schema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        order_id: {
            type: Schema.Types.ObjectId,
            ref: 'orders',
            required: true,
        },
        restaurant_id: {
            type: Schema.Types.ObjectId,
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
    },
    {
        timestamps: true,
    }
);

export const PaymentModel = mongoose.model<IPayment>('payments', paymentSchema);
