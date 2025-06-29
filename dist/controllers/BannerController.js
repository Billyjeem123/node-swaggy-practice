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
exports.BannerController = void 0;
const validate_1 = require("../Utility/validate");
const Banner_1 = require("../models/Banner");
const BannerResource_1 = require("../Resource/BannerResource");
class BannerController {
    static createBanner(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, validate_1.handleValidationErrors)(req, res))
                    return;
                const { name } = req.body;
                if (!req.file) {
                    return res
                        .status(400)
                        .json({ success: false, message: 'No file uploaded' });
                }
                const bannerPath = req.file.path;
                const banner = new Banner_1.default({ name: bannerPath });
                yield banner.save();
                return res.status(201).json({
                    success: true,
                    message: 'Banner created successfully',
                    data: {
                        name,
                        file: BannerResource_1.BannerResource.toJson(banner)
                    }
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.BannerController = BannerController;
