import { NextFunction, Request, Response } from 'express';
export declare class PaymentController {
    static recordTransaction(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    static paymentCallBack(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static sendOutNotification(reference: string): Promise<void>;
    private static _initializePaystackTransaction;
    private static _createLocalPaymentRecord;
    private static sendTransactionSuccessful;
    private static sendOrderNotification;
    private static verifyPaymentTransaction;
}
