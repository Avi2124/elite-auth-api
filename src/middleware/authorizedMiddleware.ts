import type { NextFunction, Request, Response } from "express"

export const authorize = (...roles: string[]) => {
    return (req:Request, res:Response, next:NextFunction) => {
        if(!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        if(typeof req.user === "string") {
            return res.status(401).json({
                success: false,
                message: "Invalid token payload"
            });
        }
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Forbidden"
            });
        }
        next();
    };
};
