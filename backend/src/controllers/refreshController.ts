import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken.js";
import User from "../models/User.js";
import { generateTokens } from "../utils/generateTokens.js";
import { cookieOptions } from "../utils/coookieOptions.js";

export const refresh = async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;

    // 1. No token → reject
    if (!refreshToken) {
        return res
            .status(401)
            .json({ success: false, message: "No refresh token" });
    }

    try {
        // 2. Verify token signature
        const payload = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET!
        ) as { userId: string };

        // 3. Check DB: token must exist and not expired
        const storedToken = await RefreshToken.findOne({
            token: refreshToken,
            userId: payload.userId,
            expiresAt: { $gt: new Date() },
        });

        if (!storedToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired refresh token",
            });
        }

        // 4. Fetch user (optional, but good for response)
        const user = await User.findById(payload.userId).select(
            "firstName lastName email"
        );
        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "User not found" });
        }

        // 5. Generate new tokens
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(
            String(user._id)
        );

        // 6. (Optional) Rotate refresh token
        await RefreshToken.updateOne(
            { _id: storedToken._id },
            {
                token: newRefreshToken,
                expiresAt: new Date(Date.now() + cookieOptions.maxAge),
            }
        );

        // 7. Set new refresh token cookie
        res.cookie("refreshToken", newRefreshToken, cookieOptions);

        // 8. Return new access token
        res.json({
            success: true,
            accessToken,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Refresh token error:", error);
        res.status(401).json({
            success: false,
            message: "Invalid refresh token",
        });
    }
};
