import { Request, Response, NextFunction } from 'express';
export declare class CityController {
    static allRecords(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
