import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET as string
        ) as { userId: string };

        // Attach user ID to request
        // @ts-ignore
        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
