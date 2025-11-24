import { Request, Response } from "express";
import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";
import bcrypt from "bcryptjs";
import { validateSignup } from "../utils/validateSignup.js";
import { generateTokens } from "../utils/generateTokens.js";
import { cookieOptions } from "../utils/coookieOptions.js";

export const signup = async (req: Request, res: Response) => {
    try {
        const error = validateSignup(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error });
        }

        const { firstName, lastName, email, password } = req.body;

        // Check if user exists
        const existing = await User.findOne({ email });
        if (existing) {
            return res
                .status(400)
                .json({ success: false, message: "Email already exists." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(String(user._id));

        // Save refresh token in SEPARATE COLLECTION
        await RefreshToken.create({
            userId: user._id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        // Set cookie
        res.cookie("refreshToken", refreshToken, cookieOptions);
        res.cookie("accessToken", accessToken, cookieOptions);

        res.status(201).json({
            success: true,
            message: "Account created successfully!",
            user: await User.findById(user._id).select("-password"),

            accessToken,
        });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
};

export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Check if all fields exist
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(String(user._id));

        // OPTIONAL: Set refresh token in HttpOnly cookie
        await RefreshToken.create({
            userId: user._id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + cookieOptions.maxAge),
        });

        res.cookie("refreshToken", refreshToken, cookieOptions);

        return res
            .cookie("accessToken", accessToken, cookieOptions)
            .status(200)
            .json({
                message: "Login successful",
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                },
            });
    } catch (error) {
        console.error("❌ Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const signout = async (req: Request, res: Response) => {
    try {
        const token = req.cookies?.refreshToken;

        if (token) {
            await RefreshToken.deleteOne({ token });
        }

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        return res
            .clearCookie("accessToken", {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            })
            .clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            })
            .status(200)
            .json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        return res
            .status(500)
            .json({ success: false, message: "Server error" });
    }
};
