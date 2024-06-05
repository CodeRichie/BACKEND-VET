import { Request, Response, NextFunction } from 'express';
import { UserRoles } from '../constants/UserRoles';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authorizeMiddleware = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.tokenData.userRole;

        if (allowedRoles.includes(userRole)) {
            return next();
        }

        res.status(401).json({ message: "Unauthorized" })
    }

}
