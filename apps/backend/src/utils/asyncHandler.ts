import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ApiError } from './apiError';

export function asyncFunction(fn: (req: Request, res: Response, next: NextFunction) => any): (req: Request, res: Response, next: NextFunction) => any {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(err => {
            console.log(err.message)
            if (err instanceof ApiError) {
                res.status(err.statusCode).json({
                    success: false,
                    message: err.message,
                })
            } else {
                next(err)
            }
        })
    };
};

// 

// 