import { NextFunction, Request, Response } from 'express'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { PaymentModel } from '../models/Payment'
import { PaymentResource } from '../Resource/PaymentResource'
import { getEnvironmentVariables } from '../enviroments/environment'
import logger from '../Utility/logger'

export class PaymentController {
  static async recordTransaction (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = req.user
      const { order_id, restaurant_id, amount } = req.body

      const transaction_ref = `PSK-${uuidv4()}`

      // 1. Call Paystack API
      const paystackData = await this._initializePaystackTransaction(
        user.email,
        amount,
        transaction_ref,
        user
      )

      // 2. Save transaction locally
      let payment = await this._createLocalPaymentRecord(
        user.userId,
        order_id,
        restaurant_id,
        amount,
        transaction_ref
      )

      // Populate user, order, and restaurant
      payment = await payment.populate([
        { path: 'user_id' },
        { path: 'order_id' },
        {
          path: 'restaurant_id',
          populate: {
            path: 'city_id' // 👈 populate city_id within restaurant
          }
        }
      ])

      // 3. Send successful response
      return res.status(201).json({
        success: true,
        message: 'Transaction initialized successfully',
        data: {
          payment_url: paystackData.authorization_url,
          payment_reference: paystackData.reference,
          access_code: paystackData.access_code,
          payment: PaymentResource.toJson(payment)
        }
      })
    } catch (error: any) {
      console.error(
        'Transaction init error:',
        error.response?.data || error.message
      )
      return res.status(500).json({
        success: false,
        message: 'Unable to initiate transaction. Please try again later.'
      })
    }
  }

  // 🔒 Private: Call Paystack API
  private static async _initializePaystackTransaction (
    email: string,
    amount: number,
    reference: string,
    user: any // Assuming user has userId and email
  ) {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: amount * 100, // Paystack uses kobo
        reference,
        callback_url: 'http://localhost:3000/api/payment/call-back', // 👈 your local callback
        metadata: {
          user_id:  user.userId
        }
      },
      {
        headers: {
          Authorization: `Bearer ${
            getEnvironmentVariables().paystack_secret_key
          }`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data.data // Contains authorization_url, access_code, etc.
  }

  // 🔒 Private: Save local payment record
  private static async _createLocalPaymentRecord (
    user_id: string,
    order_id: string,
    restaurant_id: string,
    amount: number,
    transaction_ref: string
  ) {
    return PaymentModel.create({
      user_id,
      order_id,
      restaurant_id,
      transaction_ref,
      amount,
      status: 'pending'
    })
  }

 public static async paymentCallBack(req: Request, res: Response) {
  const { reference } = req.query;

  if (!reference) {
    return res.status(400).json({
      success: false,
      message: 'Payment reference is required.',
    });
  }

  try {
    const paymentData = await this.verifyPaymentTransaction(reference);
   

   logger.info(`Payment verification data: ${JSON.stringify(paymentData)}`);




    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: paymentData,
    });
  } catch (error: any) {
    console.error('Verification error:', error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: 'Verification failed.',
    });
  }
}


  private static async verifyPaymentTransaction (reference) {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${
            getEnvironmentVariables().paystack_secret_key
          }`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data.data // This includes payment status, amount, customer, etc.
  }
}
