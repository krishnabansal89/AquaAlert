import {NextFunction , Request ,Response} from 'express';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    console.log('isAuthenticated middleware');
    next();
}