import jwt from "jsonwebtoken";

export const generateTokens = (userId: string) => {
    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;

    if (!accessSecret || !refreshSecret) {
        throw new Error("JWT secrets missing from environment.");
    }

    const accessToken = jwt.sign({ userId }, accessSecret, {
        expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ userId }, refreshSecret, {
        expiresIn: "7d",
    });

    return { accessToken, refreshToken };
};
