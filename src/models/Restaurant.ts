// models/Restaurant.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IRestaurant extends Document {
  name: string;
  city_id?: Types.ObjectId; // optional if used
  user_id: Types.ObjectId;
}

const RestaurantSchema: Schema = new Schema({
  name: { type: String, required: true },
  city_id: {
    type: Schema.Types.ObjectId,
    ref: 'cities', // Might be a duplicate of `city`, clarify usage
    required: false // optional in case not always present
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users', // References the 'users' collection
    required: true,
  },
});

export const RestaurantModel = mongoose.model<IRestaurant>('restaurants', RestaurantSchema);
