import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export function handleValidationErrors(req: Request, res: Response): boolean {
    const errors = validationResult(req);

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

 export function genrerateOTP($length){
    

     const max = Math.pow(10, length) - 1;
  const min = Math.pow(10, length - 1);
  return Math.floor(Math.random() * (max - min + 1)) + min;
    }
