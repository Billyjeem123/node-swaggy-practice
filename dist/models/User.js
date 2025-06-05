"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the Mongoose schema
const UserSchema = new mongoose_1.Schema({
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
const UserModel = mongoose_1.default.model('users', UserSchema);
exports.default = UserModel;
// ✅ 2. What does mongoose.model<IUser>('users', UserSchema) do?
// This tells Mongoose:
// “Please create a model (like a class) for a MongoDB collection called 'users' using the UserSchema, and type it using IUser.”
// Here’s what happens:
// 'users' is the collection name.
// UserSchema is the structure of each document (name, email).
// <IUser> is the TypeScript interface that gives type safety.
