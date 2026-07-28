import type { NextFunction, Request, Response } from "express";
import e from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const authenticate = (req:Request, res:Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing"
            });
        }
        const [scheme, token] = authHeader.split(" ");
        if(scheme !== "Bearer" || !token){
            return res.status(401).json({
                success: false,
                message: "Invalid authorization format"
            });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};
