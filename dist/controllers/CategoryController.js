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
exports.CategoryController = void 0;
const validate_1 = require("../Utility/validate");
const CategoryResource_1 = require("../Resource/CategoryResource");
const Category_1 = require("../models/Category");
class CategoryController {
    static createCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, validate_1.handleValidationErrors)(req, res))
                    return;
                const { name } = req.body;
                const category = new Category_1.CategoryModel({
                    name
                });
                const saved_category = yield category.save();
                return res.status(201).json({
                    success: true,
                    message: 'Category created successfully',
                    data: CategoryResource_1.CategoryResource.toJson(saved_category)
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static allcategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (id) {
                    const category = yield Category_1.CategoryModel.findById(id);
                    if (!category) {
                        return res.status(404).json({
                            success: false,
                            message: 'Category not found.',
                            data: []
                        });
                    }
                    return res.status(200).json({
                        success: true,
                        message: 'Category fetched successfully.',
                        data: CategoryResource_1.CategoryResource.toJson(category),
                    });
                }
                const categories = yield Category_1.CategoryModel.find();
                return res.status(200).json({
                    success: true,
                    message: 'All categories fetched successfully.',
                    data: CategoryResource_1.CategoryResource.collection(categories),
                });
            }
            catch (error) {
                next(error); // Pass error to global error handler
            }
        });
    }
}
exports.CategoryController = CategoryController;
