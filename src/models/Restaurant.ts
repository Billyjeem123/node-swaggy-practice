// models/City.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IRestaurant extends Document {
  name: string;
}

const RestaurantSchema: Schema = new Schema({
  name: { type: String, required: true },
   city: {
    type: Schema.Types.ObjectId,
    ref: 'cities', // <- This is the relationship
    required: true,
  },
   user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users', // <- This is the relationship
    required: true,
  },
   address: { type: String, required: true },
});

export const RestaurantModel = mongoose.model<IRestaurant>('restaurants', RestaurantSchema);

