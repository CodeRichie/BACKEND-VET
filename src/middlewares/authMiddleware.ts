import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {




        //split the token from the header    
        const token = req.headers.authorization?.split(" ")[1];
        //if there is no token, return a 401 status
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

    try {
        //verify the token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;
        //add the token data to the request    
        req.tokenData = {
            userId: decoded.userId,
            userRole: decoded.userRole,
            firstName: decoded.firstName
        }


        //call the next middleware
        next();

    } catch (error) {
        res.status(401).json({ message: "Unauthorized mal" });

        return;
    }
}