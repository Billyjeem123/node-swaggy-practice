import { Request, Response, NextFunction } from 'express'
import { CityModel } from '../models/Cities'
import { CityResource } from '../Resource/CityResource'

export class CityController {
  

     static async allRecords (req: Request, res: Response, next: NextFunction) {
        try {
          const cities = await CityModel.find() // Fetches all users from DB
    
          return res.status(200).json({
            success: true,
            message: 'All cities fetched successfully.',
            data: CityResource.collection(cities)
          })
        } catch (error) {
          next(error) // Pass error to global error handler
        }
      }
}
