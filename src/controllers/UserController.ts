import { Request, Response, NextFunction } from 'express';
import UserModel from "../models/User"

export class UserController{


   static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name } = req.body;

      // Validate request
      if (!email || !name) {
        return res.status(400).json({ success: false, message: 'Email and name are required.' });
      }

      // Check if user already exists
      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        return res.status(200).json({
          success: true,
          message: 'User already exists.',
          data: existingUser,
        });
      }

      // Create a new user
      const newUser = new UserModel({ name, email });
      await newUser.save();

      res.status(201).json({
        success: true,
        message: 'User created successfully.',
        data: newUser,
      });
    } catch (error) {
      next(error); // let the global error handler catch it
    }
  
  }



}