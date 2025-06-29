"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityModel = void 0;
// models/City.ts
const mongoose_1 = require("mongoose");
const CitySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
});
exports.CityModel = mongoose_1.default.model('cities', CitySchema);
