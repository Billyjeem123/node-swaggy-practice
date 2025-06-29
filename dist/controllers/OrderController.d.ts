import { Request, Response, NextFunction } from 'express';
export declare class OrderController {
    static createOrder(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    private static store;
    private static sendSuccessResponse;
    static allRecords(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    static deleteFood(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    static updateFood(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    static CustomerOrder(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
