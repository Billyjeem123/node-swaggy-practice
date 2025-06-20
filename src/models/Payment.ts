import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
    user_id: mongoose.Types.ObjectId;
    order_id: mongoose.Types.ObjectId;
    restaurant_id: mongoose.Types.ObjectId;
    amount: number;
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
