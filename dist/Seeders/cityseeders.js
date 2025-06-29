"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCities = seedCities;
// seed.ts
const db_1 = require("../config/db");
const Cities_1 = require("../models/Cities");
function seedCities() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, db_1.default)();
        // Clear existing cities (optional, for fresh seed)
        yield Cities_1.CityModel.deleteMany();
        // Sample city data
        const cities = [
            { name: 'Lagos' },
            { name: 'Abuja' },
            { name: 'Kano' },
            { name: 'Port Harcourt' },
            { name: 'Enugu' },
        ];
        // Insert all cities
        yield Cities_1.CityModel.insertMany(cities);
        console.log('Cities seeded successfully');
        process.exit();
    });
}
