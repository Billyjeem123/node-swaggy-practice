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
exports.PaymentController = void 0;
const axios_1 = require("axios");
const uuid_1 = require("uuid");
const Payment_1 = require("../models/Payment");
const PaymentResource_1 = require("../Resource/PaymentResource");
const environment_1 = require("../enviroments/environment");
const logger_1 = require("../Utility/logger");
const mail_1 = require("../Utility/mail");
class PaymentController {
    static recordTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const user = req.user;
                const { order_id, restaurant_id, amount } = req.body;
                const transaction_ref = `PSK-${(0, uuid_1.v4)()}`;
                // 1. Call Paystack API
                const paystackData = yield this._initializePaystackTransaction(user.email, amount, transaction_ref, user);
                // 2. Save transaction locally
                let payment = yield this._createLocalPaymentRecord(user.userId, order_id, restaurant_id, amount, transaction_ref);
                // Populate user, order, and restaurant
                payment = yield payment.populate([
                    { path: 'user_id' },
                    { path: 'order_id' },
                    {
                        path: 'restaurant_id',
                        populate: {
                            path: 'city_id' // 👈 populate city_id within restaurant
                        }
                    }
                ]);
                // 3. Send successful response
                return res.status(201).json({
                    success: true,
                    message: 'Transaction initialized successfully',
                    data: {
                        payment_url: paystackData.authorization_url,
                        payment_reference: paystackData.reference,
                        access_code: paystackData.access_code,
                        payment: PaymentResource_1.PaymentResource.toJson(payment)
                    }
                });
            }
            catch (error) {
                console.error('Transaction init error:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
                return res.status(500).json({
                    success: false,
                    message: 'Unable to initiate transaction. Please try again later.'
                });
            }
        });
    }
    static paymentCallBack(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { reference } = req.query;
            if (!reference || typeof reference !== 'string') {
                return res.status(400).json({
                    success: false,
                    message: 'Payment reference is required.'
                });
            }
            try {
                // 1. Verify with Paystack
                const paymentData = yield this.verifyPaymentTransaction(reference);
                logger_1.default.info(`Payment verification data: ${JSON.stringify(paymentData)}`);
                // 2. Check if successful
                if (paymentData.status === 'success') {
                    // 3. Update the local transaction record
                    const payment = yield Payment_1.PaymentModel.findOneAndUpdate({ transaction_ref: reference }, { status: 'success' }, { new: true } // return the updated document
                    );
                    if (!payment) {
                        logger_1.default.warn(`No local payment record found for reference: ${reference}`);
                        return res.status(404).json({
                            success: false,
                            message: 'Payment record not found locally.'
                        });
                    }
                }
                yield this.sendOutNotification(reference);
                // 4. Respond to Paystack webhook/callback
                return res.status(200).json({
                    success: true,
                    message: 'Payment verified successfully',
                    data: []
                });
            }
            catch (error) {
                logger_1.default.error(`Verification error: ${((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message}`);
                return res.status(500).json({
                    success: false,
                    message: 'Verification failed.'
                });
            }
        });
    }
    static sendOutNotification(reference) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 1. Find the payment using the reference
                const payment = yield Payment_1.PaymentModel.findOne({ transaction_ref: reference })
                    .populate('user_id') // Populate user who made the payment
                    .populate({
                    path: 'restaurant_id',
                    populate: [
                        {
                            path: 'user_id', // Owner of the restaurant
                        },
                        {
                            path: 'order_id',
                            populate: {
                                path: 'food_id', // Food in the order
                            }
                        }
                    ]
                });
                if (!payment) {
                    throw new Error('Payment not found.');
                }
                const user = payment.user_id; // Assuming populated expectanything
                const name = user.name || 'User';
                // const email = user.email;
                const email = "billyhadiattaofeeq@gmail.com";
                if (!email) {
                    throw new Error('User email not found.');
                }
                // 2. Send transaction success notification
                yield this.sendTransactionSuccessful({ name, email });
                const restaurantOwner = payment.restaurant_id;
                const restaurant_owner_name = restaurantOwner.user_id.email;
                const restaurant_owner_email = restaurantOwner.name;
                const itemOrdered = "rice";
                // await this.sendOrderNotification(name, restaurant_owner_name, restaurant_owner_email, itemOrdered);
                console.log('Notification sent successfully.');
            }
            catch (error) {
                console.error('Failed to send transaction notification:', error.message);
            }
        });
    }
    // 🔒 Private: Call Paystack API
    static _initializePaystackTransaction(email, amount, reference, user // Assuming user has userId and email
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.post('https://api.paystack.co/transaction/initialize', {
                email,
                amount: amount * 100, // Paystack uses kobo
                reference,
                callback_url: 'http://localhost:3000/api/payment/call-back', // 👈 your local callback
                metadata: {
                    user_id: user.userId,
                }
            }, {
                headers: {
                    Authorization: `Bearer ${(0, environment_1.getEnvironmentVariables)().paystack_secret_key}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data.data; // Contains authorization_url, access_code, etc.
        });
    }
    // 🔒 Private: Save local payment record
    static _createLocalPaymentRecord(user_id, order_id, restaurant_id, amount, transaction_ref) {
        return __awaiter(this, void 0, void 0, function* () {
            return Payment_1.PaymentModel.create({
                user_id,
                order_id,
                restaurant_id,
                transaction_ref,
                amount,
                status: 'pending'
            });
        });
    }
    // ✅ Private method to send email
    static sendTransactionSuccessful(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email }) {
            const htmlContent = `
    <h3>Hi ${name},</h3>
    <p>Transaction successful. The merchant has been notified.</p>
    <h2>Order Status: Successful</h2>
  `;
            yield (0, mail_1.sendMail)({
                to: email,
                subject: 'Transaction Successful',
                html: htmlContent,
            });
        });
    }
    static sendOrderNotification(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, restaurant_owner_name, restaurant_owner_email, itemOrdered }) {
            const htmlContent = `
    <h3>Hi ${restaurant_owner_name},</h3>
    <p>A customer ordered by the name, ${name},  ordered  ${itemOrdered}.</p>
    <p>Please make sure it is delivered</p>
    <h2>Order Status: Successful</h2>
  `;
            yield (0, mail_1.sendMail)({
                to: restaurant_owner_email,
                subject: 'Transaction Successful',
                html: htmlContent,
            });
        });
    }
    static verifyPaymentTransaction(transaction_ref) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`https://api.paystack.co/transaction/verify/${transaction_ref}`, {
                headers: {
                    Authorization: `Bearer ${(0, environment_1.getEnvironmentVariables)().paystack_secret_key}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data.data; // This includes payment status, amount, customer, etc.
        });
    }
}
exports.PaymentController = PaymentController;
