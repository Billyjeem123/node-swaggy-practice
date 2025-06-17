// models/Restaurant.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IOrder extends Document {
   user_id: mongoose.Types.ObjectId;
  food_id: mongoose.Types.ObjectId;
  amount: number;
}

const orderSchema: Schema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    food_id: {
      type: Schema.Types.ObjectId,
      ref: 'foods',
      required: true,
    },
     restaurant_id: {
      type: Schema.Types.ObjectId,
      ref: 'restaurants',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);
export const OrderModel = mongoose.model<IOrder>('orders', orderSchema);
