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
const validate_1 = require("../Utility/validate");
const UserResource_1 = require("../Resource/UserResource");
const mail_1 = require("../Utility/mail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const environment_1 = require("../enviroments/environment");
const paginate_1 = require("../Utility/paginate");
class UserController {
    static signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, validate_1.handleValidationErrors)(req, res))
                    return;
                const { email, name, password, role } = req.body;
                const existingUser = yield UserController.findUserByEmail(email);
                if (existingUser) {
                    return UserController.sendUserExistsResponse(res, existingUser);
                }
                const otp = (0, validate_1.genrerateOTP)();
                const newUser = yield UserController.createUser({ name, email, password, otp, role });
                yield UserController.sendOtpEmail({ email, name, otp });
                UserController.sendSuccessResponse(res, newUser);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.default.findOne({ email });
        });
    }
    static sendUserExistsResponse(res, user) {
        return res.status(200).json({
            success: true,
            message: 'User already exists.',
            data: UserResource_1.UserResource.toJson(user),
        });
    }
    static createUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password, otp, role }) {
            const hashedPassword = yield bcrypt.hash(String(password), 10);
            const user = new User_1.default({ name, email, password: hashedPassword, otp, role });
            return user.save();
        });
    }
    static sendOtpEmail(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, name, otp }) {
            const htmlContent = `
      <h3>Hi ${name},</h3>
      <p>Thank you for signing up. Your OTP is:</p>
      <h2>${otp}</h2>
      <p>Please use it to verify your account.</p>
    `;
            yield (0, mail_1.sendMail)({
                to: email,
                subject: 'Verify Your Email',
                html: htmlContent,
            });
        });
    }
    static sendSuccessResponse(res, user) {
        return res.status(201).json({
            success: true,
            message: 'User created successfully.',
            data: UserResource_1.UserResource.toJson(user),
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, validate_1.handleValidationErrors)(req, res))
                    return;
                const { email, password } = req.body;
                const user = yield User_1.default.findOne({ email });
                if (!user) {
                    return res.status(401).json({
                        success: false,
                        message: 'Invalid credentials. User not found.',
                    });
                }
                const isPasswordValid = yield bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({
                        success: false,
                        message: 'Invalid credentials. Password mismatch.',
                    });
                }
                const token = jwt.sign({
                    userId: user._id,
                    email: user.email,
                    role: user.role
                }, (0, environment_1.getEnvironmentVariables)().jwt_secret_key, { expiresIn: '7d' });
                return res.status(200).json({
                    success: true,
                    message: 'Login successful.',
                    data: {
                        user: UserResource_1.UserResource.toJson(user),
                        token,
                    },
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static allusers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = User_1.default.find();
                const result = yield (0, paginate_1.paginate)(query, req);
                return res.status(200).json({
                    success: true,
                    message: 'All users fetched successfully.',
                    data: {
                        data: UserResource_1.UserResource.collection(result.data),
                        pagination: result.pagination
                    }
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static myProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const auth = req.user; // OR cast req with custom type if using TypeScript
                const user = yield User_1.default.findById(auth.userId); // <-- You need to await this!
                return res.status(200).json({
                    success: true,
                    message: 'Profile fetched successfully.',
                    data: UserResource_1.UserResource.toJson(user),
                });
            }
            catch (error) {
                next(error);
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
                    return res
                        .status(404)
                        .json({ success: false, message: 'User not found.' });
                }
                res.status(200).json({
                    success: true,
                    message: 'User updated successfully.',
                    data: updatedUser
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
                    return res
                        .status(404)
                        .json({ success: false, message: 'User not found.' });
                }
                res.status(200).json({
                    success: true,
                    message: 'User deleted successfully.'
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
