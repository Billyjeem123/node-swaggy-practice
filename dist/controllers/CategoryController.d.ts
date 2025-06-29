import { Request, Response, NextFunction } from 'express';
export declare class CategoryController {
    static createCategory(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    static allcategories(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
