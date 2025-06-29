import { Request, Response, NextFunction } from 'express';
export declare class RestaurantController {
    static createRestaurant(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    private static store;
    private static sendSuccessResponse;
    static myRestaurant(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    static updateMyRestaurant(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
