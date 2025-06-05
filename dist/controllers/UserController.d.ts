import { Request, Response, NextFunction } from 'express';
export declare class UserController {
    static signup(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    static allusers(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    static updateUser(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    static deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
