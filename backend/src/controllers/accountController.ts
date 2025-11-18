import { Request, Response } from "express";
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
