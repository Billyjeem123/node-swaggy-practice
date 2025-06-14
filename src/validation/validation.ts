import { body } from 'express-validator'
import UserModel from '../models/User'

// This line imports the body function from the express-validator library.

// body() is used to validate data in the request body (like req.body.name, req.body.email, etc.).

export class GlobalRequest {
  static signup () {
    return [
      body('name', 'Name is required').isString(),
      body('email', 'Email is required')
        .isEmail()
        .custom((value, { req }) => {
          if (req.body.email) return true
          else {
            throw new Error('Email is not available for validation')
          }
        })
    ]
  }

 static login() {
    return [
      body('email').isEmail().withMessage('A valid email is required'),
      body('password').isString().withMessage('Password is required'),
    ];
  }

  static createRestaurant() {
    return [
      body('name')
        .notEmpty()
        .withMessage('Restaurant name is required'),

      body('city_id')
        .isMongoId()
        .withMessage('A valid city ID is required'),
     
    ];
  }

  static createCategory() {
    return [
      body('name')
        .notEmpty()
        .withMessage('Restaurant name is required'),
     
    ];
  }

  static updateMyRestaurant() {
  return [
    body('name')
      .optional()
      .notEmpty()
      .withMessage('Restaurant name cannot be empty'),

    body('city_id')
      .optional()
      .isMongoId()
      .withMessage('City ID must be a valid Mongo ID'),
  ];
}

}

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
