import mongoose, { Schema, Document } from 'mongoose';

// Define the TypeScript interface
export interface IUser extends Document {
  name: string;
  email: string;
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
    unique: true, // ensures emails are not duplicated
  },
}, {
  timestamps: true, // automatically adds createdAt and updatedAt
});

// Export the Mongoose model
const UserModel = mongoose.model<IUser>('users', UserSchema);
export default UserModel;


// ✅ 2. What does mongoose.model<IUser>('users', UserSchema) do?
// This tells Mongoose:

// “Please create a model (like a class) for a MongoDB collection called 'users' using the UserSchema, and type it using IUser.”

// Here’s what happens:

// 'users' is the collection name.

// UserSchema is the structure of each document (name, email).

// <IUser> is the TypeScript interface that gives type safety.