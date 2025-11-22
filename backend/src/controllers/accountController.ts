import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const updateProfile = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.userId;

        const { gender, location, phone } = req.body;

        const updateData: any = {
            gender,
            location,
            phone,
        };

        // If user uploaded a new avatar
        if (req.file) {
            updateData.avatar = `/uploads/${req.file.filename}`;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
            new: true,
        }).select("-password");

        return res.json({
            message: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const changePassword = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.userId;
        const { oldPassword, newPassword } = req.body;

        if (!userId || !oldPassword || !newPassword) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch)
            return res
                .status(401)
                .json({ message: "Incorrect current password" });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        return res.json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Change password error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteAccount = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({ message: "User not authenticated" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete user
        await User.findByIdAndDelete(userId);

        // Clear cookies (important)
        res.clearCookie("accessToken", {
            httpOnly: true,
            sameSite: "lax",
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: "lax",
        });

        return res.json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error("Delete account error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
