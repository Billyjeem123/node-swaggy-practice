"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the Mongoose schema
const BannerSchema = new mongoose_1.Schema({
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
const BannerModel = mongoose_1.default.model('banners', BannerSchema);
exports.default = BannerModel;
