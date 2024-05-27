import { Request, Response, NextFunction } from 'express';
import { UserRoles } from '../constants/UserRoles';
import jwt, { JwtPayload } from 'jsonwebtoken';



export const authorizeMiddleware = (allowedRoles: string[]) => {

    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1];
        console.log('token', token)
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;

            console.log(allowedRoles.includes(decoded.userRole))
            console.log('decoded.userRole', decoded.userRole)

        if (allowedRoles.includes(decoded.userRole)) {
            next();

        }
        return res.status(401).json({ message: "Unauthorized" })
    }
}