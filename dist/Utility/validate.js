"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = handleValidationErrors;
exports.genrerateOTP = genrerateOTP;
const express_validator_1 = require("express-validator");
function handleValidationErrors(req, res) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg);
        res.status(400).json({
            success: false,
            errors: errorMessages
        });
        return true; // indicates the error response has been sent
    }
    return false; // no validation errors
}
function genrerateOTP(length = 6) {
    const max = Math.pow(10, length) - 1;
    const min = Math.pow(10, length - 1);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
