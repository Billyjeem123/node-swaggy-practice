// models/Restaurant.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IFood extends Document {
  name: string;
  restaurant_id?: Types.ObjectId; // optional if used
}

const foodSchema: Schema = new Schema({
  name: { type: String, required: true },
  restaurant_id: {
    type: Schema.Types.ObjectId,
    ref: 'restaurants', // Might be a duplicate of `city`, clarify usage
    required: true // optional in case not always present
  }
  
});

export const FoodModel = mongoose.model<IFood>('foods', foodSchema);
