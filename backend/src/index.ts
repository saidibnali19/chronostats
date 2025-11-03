import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import * as testRouterModule from "./routes/test.route.js";

dotenv.config();
const app = express();

const allowedOrigins = [
    "http://localhost:3000", // ✅ frontend dev
    "https://chronostats.vercel.app", // ✅ your deployed frontend
];

// Middleware
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);
app.use(express.json());

const testRouter =
    testRouterModule && (testRouterModule as any).default
        ? (testRouterModule as any).default
        : (testRouterModule as any);

app.use("/api/test", testRouter);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
