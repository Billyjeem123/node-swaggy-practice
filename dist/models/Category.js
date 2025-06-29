"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
// models/City.ts
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true }
}, {
    timestamps: true // ✅ This should be passed as the second argument to the Schema constructor
});
exports.CategoryModel = mongoose_1.default.model('categories', CategorySchema);
