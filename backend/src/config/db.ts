import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const uri =
            process.env.NODE_ENV === "development"
                ? process.env.MONGO_URI_LOCAL
                : process.env.MONGO_URI_ATLAS;

        if (!uri)
            throw new Error("MongoDB URI not found in environment variables");

        await mongoose.connect(uri);
        console.log(`✅ MongoDB connected (${process.env.NODE_ENV})`);
    } catch (error: any) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1);
    }
};

export { connectDB };
