// models/Restaurant.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IFood extends Document {
  name: string;
  price:number;
  restaurant_id?: Types.ObjectId; // optional if used
}

const foodSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    
    price: { type: Number, required: true }, // ✅ Add price field

    restaurant_id: {
      type: Schema.Types.ObjectId,
      ref: 'restaurants',
      required: true
    }
  },
  {
    timestamps: true // ✅ Adds createdAt and updatedAt automatically
  }
);

export const FoodModel = mongoose.model<IFood>('foods', foodSchema);
