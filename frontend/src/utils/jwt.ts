// src/utils/jwt.ts
export interface DecodedToken {
    userId: string;
    exp: number; // Unix timestamp
    iat: number;
}

export const decodeToken = (token: string): DecodedToken | null => {
    try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        return {
            userId: decoded.userId,
            exp: decoded.exp,
            iat: decoded.iat,
        };
    } catch {
        return null;
    }
};
