import { Request, Response, NextFunction } from 'express'
import { handleValidationErrors } from '../Utility/validate'
import { UserResource } from '../Resource/UserResource'
import { sendMail } from '../Utility/mail'
import BannerModel from '../models/Banner'
import { BannerResource } from '../Resource/BannerResource'

export class BannerController {
  static async createBanner (req: Request, res: Response, next: NextFunction) {
    try {
      if (handleValidationErrors(req, res)) return

      const { name } = req.body

      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: 'No file uploaded' })
      }

      const bannerPath = req.file.path

      const banner = new BannerModel({ name: bannerPath })
      await banner.save()

      return res.status(201).json({
        success: true,
        message: 'Banner created successfully',
        data: {
          name,
          file:  BannerResource.toJson(banner)
        }
      })
    } catch (error) {
      next(error)
    }
  }
}
