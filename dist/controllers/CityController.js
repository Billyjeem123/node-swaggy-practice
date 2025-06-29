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
exports.CityController = void 0;
const Cities_1 = require("../models/Cities");
const CityResource_1 = require("../Resource/CityResource");
class CityController {
    static allRecords(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cities = yield Cities_1.CityModel.find(); // Fetches all cities from DB
                return res.status(200).json({
                    success: true,
                    message: 'All cities fetched successfully.',
                    data: CityResource_1.CityResource.collection(cities)
                });
            }
            catch (error) {
                next(error); // Pass error to global error handler
            }
        });
    }
}
exports.CityController = CityController;
