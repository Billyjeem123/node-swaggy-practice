// models/City.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  user_id: string
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
   user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users', // <- This is the relationship
    required: true,
  },
});

export const CategoryModel = mongoose.model<ICategory>('categories', CategorySchema);

