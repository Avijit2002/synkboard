import { Request, Response, NextFunction, RequestHandler } from 'express';
//import { User } from './user.model'; // Assuming your user model is named 'user.model'

export function asyncFunction(fn: (req: Request, res: Response, next: NextFunction) => any): (req: Request, res: Response, next: NextFunction) => any {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(err => next(err))
    };
};

// 

// 