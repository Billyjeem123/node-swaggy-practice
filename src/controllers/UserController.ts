import { Request, Response, NextFunction } from 'express'
import UserModel from '../models/User'
import { genrerateOTP, handleValidationErrors } from '../Utility/validate'
import { UserResource } from '../Resource/UserResource'
import { sendMail } from '../Utility/mail'
import bcrypt from 'bcrypt';

export class UserController {
  

  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      if (handleValidationErrors(req, res)) return;

      const { email, name, password } = req.body;

      const existingUser = await UserController.findUserByEmail(email);
      if (existingUser) {
        return UserController.sendUserExistsResponse(res, existingUser);
      }

      const otp = genrerateOTP();
      const newUser = await UserController.createUser({ name, email, password, otp });

      await UserController.sendOtpEmail({ email, name, otp });

      UserController.sendSuccessResponse(res, newUser);
    } catch (error) {
      next(error);
    }
  }

  private static async findUserByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  private static sendUserExistsResponse(res: Response, user: any) {
    return res.status(200).json({
      success: true,
      message: 'User already exists.',
      data: UserResource.toJson(user),
    });
  }

  private static async createUser({ name, email, password, otp }: { name: string; email: string; password: string; otp:number }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, hashedPassword , otp });
    return user.save();
  }

  private static async sendOtpEmail({ email, name, otp }: { email: string; name: string; otp: number }) {
    const htmlContent = `
      <h3>Hi ${name},</h3>
      <p>Thank you for signing up. Your OTP is:</p>
      <h2>${otp}</h2>
      <p>Please use it to verify your account.</p>
    `;
    await sendMail({
      to: email,
      subject: 'Verify Your Email',
      html: htmlContent,
    });
  }

  private static sendSuccessResponse(res: Response, user: any) {
    return res.status(201).json({
      success: true,
      message: 'User created successfully.',
      data: UserResource.toJson(user),
    });
  }

  static async allusers (req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserModel.find() // Fetches all users from DB

      return res.status(200).json({
        success: true,
        message: 'All users fetched successfully.',
        data: users
      })
    } catch (error) {
      next(error) // Pass error to global error handler
    }
  }

  static async updateUser (req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id
      const updateData = req.body

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        updateData,
        { new: true }
      )

      if (!updatedUser) {
        return res
          .status(404)
          .json({ success: false, message: 'User not found.' })
      }

      res.status(200).json({
        success: true,
        message: 'User updated successfully.',
        data: updatedUser
      })
    } catch (error) {
      next(error)
    }
  }

  // Delete a user by ID
  static async deleteUser (req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id

      const deletedUser = await UserModel.findByIdAndDelete(userId)

      if (!deletedUser) {
        return res
          .status(404)
          .json({ success: false, message: 'User not found.' })
      }

      res.status(200).json({
        success: true,
        message: 'User deleted successfully.'
      })
    } catch (error) {
      next(error)
    }
  }
}
