// src/controllers/sessionController.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

interface JwtPayload {
    userId: string;
}

export const getSession = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;

    // 1. Guard: no header or wrong format
    if (!authHeader?.startsWith("Bearer ")) {
        return res.json({ ok: false });
    }

    const token = authHeader.split(" ")[1]; // ← guaranteed string

    if (!token) {
        return res.json({ ok: false });
    }

    try {
        // 2. Verify + type assertion
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            // Missing secret → treat as unauthorized
            return res.json({ ok: false });
        }
        const payload = jwt.verify(token, secret) as unknown as JwtPayload;

        // 3. Find user
        const user = await User.findById(payload.userId).select(
            "firstName lastName email"
        );

        if (!user) {
            return res.json({ ok: false });
        }

        // 4. Success response
        res.json({
            ok: true,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        });
    } catch {
        // 5. Any error (expired, malformed, etc.) → unauthorized
        res.json({ ok: false });
    }
};
