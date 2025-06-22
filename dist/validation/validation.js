"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalRequest = void 0;
const express_validator_1 = require("express-validator");
// This line imports the body function from the express-validator library.
// body() is used to validate data in the request body (like req.body.name, req.body.email, etc.).
class GlobalRequest {
    static signup() {
        return [
            (0, express_validator_1.body)('name', 'Name is required').isString(),
            (0, express_validator_1.body)('role', 'Role is required').isString(),
            (0, express_validator_1.body)('email', 'Email is required')
                .isEmail()
                .custom((value, { req }) => {
                if (req.body.email)
                    return true;
                else {
                    throw new Error('Email is not available for validation');
                }
            })
        ];
    }
    static login() {
        return [
            (0, express_validator_1.body)('email').isEmail().withMessage('A valid email is required'),
            (0, express_validator_1.body)('password').isString().withMessage('Password is required'),
        ];
    }
    static createRestaurant() {
        return [
            (0, express_validator_1.body)('name')
                .notEmpty()
                .withMessage('Restaurant name is required'),
            (0, express_validator_1.body)('city_id')
                .isMongoId()
                .withMessage('A valid city ID is required'),
        ];
    }
    static createOrder() {
        return [
            (0, express_validator_1.body)('food_id')
                .isMongoId()
                .withMessage('A valid city ID is required'),
            (0, express_validator_1.body)('restaurant_id')
                .isMongoId()
                .withMessage('A valid city ID is required'),
            (0, express_validator_1.body)('amount')
                .notEmpty()
                .withMessage('Amount  is required')
        ];
    }
    static createCategory() {
        return [
            (0, express_validator_1.body)('name')
                .notEmpty()
                .withMessage('Restaurant name is required'),
        ];
    }
    static createFood() {
        return [
            (0, express_validator_1.body)('name').notEmpty().withMessage('Food name is required'),
            (0, express_validator_1.body)('restaurant_id').isMongoId().withMessage('A valid restaurant ID is required'),
        ];
    }
    static createPayment() {
        return [
            (0, express_validator_1.body)('restaurant_id').isMongoId().withMessage('A valid restaurant ID is required'),
            (0, express_validator_1.body)('order_id').isMongoId().withMessage('A valid order ID is required'),
            (0, express_validator_1.body)('amount').notEmpty().withMessage('Amount is required'),
        ];
    }
    static updateMyRestaurant() {
        return [
            (0, express_validator_1.body)('name')
                .optional()
                .notEmpty()
                .withMessage('Restaurant name cannot be empty'),
            (0, express_validator_1.body)('city_id')
                .optional()
                .isMongoId()
                .withMessage('City ID must be a valid Mongo ID'),
        ];
    }
}
exports.GlobalRequest = GlobalRequest;
// 1️⃣ body('name', 'Name is required').isString()
// Checks the name field in the request body (req.body.name).
// .isString() makes sure the value is a text string.
// If it's missing or not a string, it shows the message: "Name is required".
// This is a custom validation rule:
// It looks at the email again from req.body.email.
// If the email exists, it allows the password validation to pass.
// If not, it throws a custom error.
// This part isn't really necessary in most cases —
//  you're already validating email earlier — but it's just an example of how you can do advanced checks with custom().
