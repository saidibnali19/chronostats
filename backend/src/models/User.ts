import mongoose, { Schema, Document } from "mongoose";

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

export default mongoose.model<IUser>("User", userSchema);
