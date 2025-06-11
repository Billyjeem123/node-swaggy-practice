import mongoose, { Schema, Document } from 'mongoose';

// Define the TypeScript interface
export interface IBanner extends Document {
  name: string;
  status: string;
}

// Define the Mongoose schema
const BannerSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'pending', // ✅ Default status
  },
}, {
  timestamps: true,
});

// Export the Mongoose model
const BannerModel = mongoose.model<IBanner>('banners', BannerSchema);
export default BannerModel;
