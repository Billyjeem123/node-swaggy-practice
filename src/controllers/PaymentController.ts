import { NextFunction, Request, Response } from 'express'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { PaymentModel } from '../models/Payment'
import { PaymentResource } from '../Resource/PaymentResource'
import { getEnvironmentVariables } from '../enviroments/environment'
import logger from '../Utility/logger'
import { sendMail } from '../Utility/mail'

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

  public static async paymentCallBack (req: Request, res: Response) {
    const { reference } = req.query

    if (!reference || typeof reference !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Payment reference is required.'
      })
    }

    try {
      // 1. Verify with Paystack
      const paymentData = await this.verifyPaymentTransaction(reference)

      logger.info(`Payment verification data: ${JSON.stringify(paymentData)}`)

      // 2. Check if successful
      if (paymentData.status === 'success') {
        // 3. Update the local transaction record
        const payment = await PaymentModel.findOneAndUpdate(
          { transaction_ref: reference },
          { status: 'success' },
          { new: true } // return the updated document
        )

        if (!payment) {
          logger.warn(
            `No local payment record found for reference: ${reference}`
          )
          return res.status(404).json({
            success: false,
            message: 'Payment record not found locally.'
          })
        }
      }

      await this.sendOutNotification(reference)

      // 4. Respond to Paystack webhook/callback
      return res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        data: []
      })
    } catch (error: any) {
      logger.error(
        `Verification error: ${error.response?.data || error.message}`
      )
      return res.status(500).json({
        success: false,
        message: 'Verification failed.'
      })
    }
  }

  public static async sendOutNotification (reference: string) {
    try {
      // 1. Find the payment using the reference
      const payment = await PaymentModel.findOne({ transaction_ref: reference })
        .populate('user_id')
        .populate({
          path: 'restaurant_id',
          populate: {
            path: 'user_id' // Owner of the restaurant
          }
        })
        .populate({
          path: 'order_id',
          populate: {
            path: 'food_id'
          }
        })

      if (!payment) {
        throw new Error('Payment not found.')
      }

      const user = payment.user_id as any // Assuming populated expectanything
      const name = user.name || 'User'
      // const email = user.email;
      const email = 'billyhadiattaofeeq@gmail.com'

      if (!email) {
        throw new Error('User email not found.')
      }

      
      // 2. Send transaction success notification
      await this.sendTransactionSuccessful({ name, email })

      const restaurantOwner = payment.restaurant_id as any
      const restaurant_owner_name = restaurantOwner.user_id.name
      const restaurant_owner_email = restaurantOwner.user_id.email

     const itemOrdered = (payment.order_id as any)?.food_id?.name || 'Unknown Item'; //This line is trying to safely access the name of the food that was ordered. Here's how it works:
     //it disables the strict null checks for this line, allowing it to handle cases where the food_id or name might be undefined or null without throwing an error.

       console.log('Sending order notification to:', restaurant_owner_name, restaurant_owner_email, itemOrdered)

      await this.sendOrderNotification({
        name,
        restaurant_owner_name,
        restaurant_owner_email,
        itemOrdered
      })

      console.log('Notification sent successfully.')
    } catch (error) {
      console.error('Failed to send transaction notification:', error.message)
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
          user_id: user.userId
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

  // ✅ Private method to send email
  private static async sendTransactionSuccessful ({
    name,
    email
  }: {
    name: string
    email: string
  }) {
    const htmlContent = `
    <h3>Hi ${name},</h3>
    <p>Transaction successful. The merchant has been notified.</p>
    <h2>Order Status: Successful</h2>
  `
 console.log('Sending order notification to customer:', name, email)
    await sendMail({
      to: email,
      subject: 'Transaction Successful',
      html: htmlContent
    })
  }

  private static async sendOrderNotification ({
    name,
    restaurant_owner_name,
    restaurant_owner_email,
    itemOrdered
  }: {
    name: string
    restaurant_owner_name: string
    restaurant_owner_email: string
    itemOrdered: string
  }) {
    const htmlContent = `
    <h3>Hi ${restaurant_owner_name},</h3>
    <p>A customer ordered by the name, ${name},  ordered  ${itemOrdered}.</p>
    <p>Please make sure it is delivered</p>
    <h2>Order Status: Successful</h2>
  `
 

    await sendMail({
      to: restaurant_owner_email,
      subject: 'Transaction Successful',
      html: htmlContent
    })
  }

  private static async verifyPaymentTransaction (transaction_ref: any) {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${transaction_ref}`,
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
