import { Request, Response, NextFunction } from 'express';
export declare class BannerController {
    static createBanner(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
