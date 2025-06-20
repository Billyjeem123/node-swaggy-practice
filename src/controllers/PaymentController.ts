import {NextFunction, Request, Response} from 'express';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import {PaymentModel} from '../models/Payment';
import {PaymentResource} from '../Resource/PaymentResource';
import {getEnvironmentVariables} from "../enviroments/environment";

export class PaymentController {
    static async recordTransaction(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const amount = req.body.amount;

            const transaction_ref = `PSK-${uuidv4()}`;

            // 1. Call Paystack API
            const paystackData = await this._initializePaystackTransaction(user.email, amount, transaction_ref);

            // 2. Save transaction locally
            let payment = await this._createLocalPaymentRecord(user.userId, amount, transaction_ref);

            // Populate user, order, and restaurant
            payment = await payment.populate([
                {path: 'user_id'},
                {path: 'order_id'}, // add fields as needed
                {path: 'restaurant_id'}
            ]);

            // 3. Send successful response
            return res.status(201).json({
                success: true,
                message: 'Transaction initialized successfully',
                data: {
                    payment_url: paystackData.authorization_url,
                    payment_reference: paystackData.reference,
                    access_code: paystackData.access_code,
                    payment: PaymentResource.toJson(payment),
                },
            });
        } catch (error: any) {
            console.error('Transaction init error:', error.response?.data || error.message);
            return res.status(500).json({
                success: false,
                message: 'Unable to initiate transaction. Please try again later.',
            });
        }
    }

    // 🔒 Private: Call Paystack API
    private static async _initializePaystackTransaction(email: string, amount: number, reference: string) {
        const response = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            {
                email,
                amount: amount * 100, // kobo
                reference,
            },
            {
                headers: {
                    Authorization: `Bearer ${getEnvironmentVariables().paystack_secret_key}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data.data; // Contains authorization_url, access_code, reference
    }

    // 🔒 Private: Save local payment record
    private static async _createLocalPaymentRecord(user_id: string, amount: number, reference: string) {
        return PaymentModel.create({
            user_id,
            amount,
            transaction_ref: reference,
            status: 'pending',
        });
    }
}
