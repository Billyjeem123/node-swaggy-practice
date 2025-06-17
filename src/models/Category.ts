// models/City.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICategory extends Document {
  name: string;
}

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true }
}, {
  timestamps: true // ✅ This should be passed as the second argument to the Schema constructor
}); 

export const CategoryModel = mongoose.model<ICategory>('categories', CategorySchema);

