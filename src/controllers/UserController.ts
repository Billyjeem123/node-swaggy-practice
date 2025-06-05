import { Request, Response, NextFunction } from 'express'
import UserModel from '../models/User'
import { handleValidationErrors } from '../Utility/validate';

export class UserController {
  static async signup (req: Request, res: Response, next: NextFunction) {
    try {

       if (handleValidationErrors(req, res)) return;

      const { email, name,password } = req.body
      // Check if user already exists
      const existingUser = await UserModel.findOne({ email })

      if (existingUser) {
        return res.status(200).json({
          success: true,
          message: 'User already exists.',
          data: existingUser
        })
      }

      // Create a new user
      const newUser = new UserModel({ name, email,password })
      await newUser.save()

      res.status(201).json({
        success: true,
        message: 'User created successfully.',
        data: newUser
      })
    } catch (error) {
      next(error) // let the global error handler catch it
    }
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
