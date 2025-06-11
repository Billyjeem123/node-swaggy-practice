// models/City.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICity extends Document {
  name: string;
}

const CitySchema: Schema = new Schema({
  name: { type: String, required: true },
});

export const CityModel = mongoose.model<ICity>('cities', CitySchema);

