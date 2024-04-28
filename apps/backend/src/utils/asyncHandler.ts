import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ApiError } from './apiError';
import { Prisma } from '@repo/database/db';
import { responseStatus } from './statusCode';

export function asyncFunction(fn: (req: Request, res: Response, next: NextFunction) => any): (req: Request, res: Response, next: NextFunction) => any {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(err => {
            console.error(err.message)
            if (err instanceof ApiError) {
                res.status(err.statusCode).json({
                    success: false,
                    message: err.message,
                })
            } 
            else if(err instanceof Prisma.PrismaClientKnownRequestError){
                res.status(responseStatus.serviceUnavailable).json({
                    success: false,
                    message: err.message,
                })
            }
            else {
                next(err)
            }
        })
    };
};

// 

// 