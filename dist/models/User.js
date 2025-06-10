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
        unique: true,
    },
    password: {
        type: String,
        required: true,
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
const UserModel = mongoose_1.default.model('users', UserSchema);
exports.default = UserModel;
