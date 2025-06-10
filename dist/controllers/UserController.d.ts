import { Request, Response, NextFunction } from 'express';
export declare class UserController {
    static signup(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    private static findUserByEmail;
    private static sendUserExistsResponse;
    private static createUser;
    private static sendOtpEmail;
    private static sendSuccessResponse;
    static login(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    static allusers(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    static test(req: Request, res: Response, next: NextFunction): Promise<void>;
    static updateUser(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    static deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
