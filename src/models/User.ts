import mongoose, { Schema, Document } from 'mongoose';

// Define the TypeScript interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// Define the Mongoose schema
const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
 role: {
  type: String,
  required: true,
  default: 'user' // <-- Default value here
},

  otp: {
    type: String,
  },
  is_verified: {
    type: Boolean, // ✅ Corrected from `boolean` to `Boolean`
    default: false,
  },
}, {
  timestamps: true,
});

// Export the Mongoose model
const UserModel = mongoose.model<IUser>('users', UserSchema);
export default UserModel;
