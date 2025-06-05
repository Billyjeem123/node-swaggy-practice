import { Request, Response, NextFunction } from 'express';
interface ExtendedError extends Error {
    status?: number;
    fileName?: string;
    lineNumber?: number;
}
export declare function errorHandler(err: ExtendedError, req: Request, res: Response, next: NextFunction): void;
export {};
