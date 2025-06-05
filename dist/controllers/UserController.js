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
exports.UserController = void 0;
const User_1 = require("../models/User");
const express_validator_1 = require("express-validator");
class UserController {
    static signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, name } = req.body;
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    // Return errors if validation failed
                    return res.status(400).json({ success: false, errors: errors.array() });
                }
                // Check if user already exists
                const existingUser = yield User_1.default.findOne({ email });
                if (existingUser) {
                    return res.status(200).json({
                        success: true,
                        message: 'User already exists.',
                        data: existingUser,
                    });
                }
                // Create a new user
                const newUser = new User_1.default({ name, email });
                yield newUser.save();
                res.status(201).json({
                    success: true,
                    message: 'User created successfully.',
                    data: newUser,
                });
            }
            catch (error) {
                next(error); // let the global error handler catch it
            }
        });
    }
    static allusers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_1.default.find(); // Fetches all users from DB
                return res.status(200).json({
                    success: true,
                    message: 'All users fetched successfully.',
                    data: users,
                });
            }
            catch (error) {
                next(error); // Pass error to global error handler
            }
        });
    }
    static updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const updateData = req.body;
                const updatedUser = yield User_1.default.findByIdAndUpdate(userId, updateData, { new: true });
                if (!updatedUser) {
                    return res.status(404).json({ success: false, message: 'User not found.' });
                }
                res.status(200).json({
                    success: true,
                    message: 'User updated successfully.',
                    data: updatedUser,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Delete a user by ID
    static deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const deletedUser = yield User_1.default.findByIdAndDelete(userId);
                if (!deletedUser) {
                    return res.status(404).json({ success: false, message: 'User not found.' });
                }
                res.status(200).json({
                    success: true,
                    message: 'User deleted successfully.',
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
