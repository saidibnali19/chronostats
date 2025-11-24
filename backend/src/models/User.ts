import mongoose, { Schema, Document } from "mongoose";
import RefreshToken from "./RefreshToken.js";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;

    gender: String;
    location: string;
    phone: string;

    avatar: string;
}

const userSchema = new Schema<IUser>(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },

        gender: { type: String },
        location: { type: String },
        phone: { type: String },

        avatar: { type: String }, // URL or file path
    },
    { timestamps: true }
);

userSchema.pre("findOneAndDelete", async function (next) {
    const userId = this.getQuery()["_id"];

    if (!userId) return next();

    try {
        // Delete all refresh tokens belonging to this user
        await RefreshToken.deleteMany({ userId });

        // Add other cascading deletes here if needed
        /* await Promise.all([
            mongoose.model("Post").deleteMany({ userId }),
            mongoose.model("Stats").deleteMany({ userId }),
            ...
        ]); */

        next();
    } catch (err) {
        next(err as Error);
    }
});

export default mongoose.model<IUser>("User", userSchema);
