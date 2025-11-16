"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { User } from "../../../shared/types/types";
import { decodeToken } from "@/utils/jwt";

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
    signout: () => void;
    accessToken: string | null;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
    loading: true,
    signout: () => {},
    accessToken: null,
    refreshUser: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // Clear any pending refresh
    const clearRefreshTimeout = () => {
        if (refreshTimeoutRef.current) {
            clearTimeout(refreshTimeoutRef.current);
            refreshTimeoutRef.current = null;
        }
    };

    // Schedule next refresh (called after login/refresh)
    const scheduleRefresh = (token: string) => {
        clearRefreshTimeout();

        const decoded = decodeToken(token);
        if (!decoded) return;

        const expiresInMs = decoded.exp * 1000 - Date.now();
        const refreshInMs = Math.max(expiresInMs - 60_000, 0); // 1 min before expiry

        refreshTimeoutRef.current = setTimeout(() => {
            refreshAccessToken();
        }, refreshInMs);
    };

    // Refresh token + update state
    const refreshAccessToken = async () => {
        try {
            const res = await fetch(`${API_URL}/api/auth/refresh`, {
                method: "POST",
                credentials: "include",
            });

            const data = await res.json();

            if (data.success && data.accessToken) {
                localStorage.setItem("accessToken", data.accessToken);
                setAccessToken(data.accessToken);
                setUser(data.user);
                scheduleRefresh(data.accessToken); // reschedule
            } else {
                throw new Error("Refresh failed");
            }
        } catch (error) {
            console.warn("Token refresh failed:", error);
            signout(); // force logout
        }
    };

    // Validate session on mount
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`${API_URL}/api/auth/session`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();

                if (data.ok && data.user) {
                    setUser(data.user);
                    setAccessToken(token);
                    scheduleRefresh(token);
                } else {
                    localStorage.removeItem("accessToken");
                }
            } catch {
                localStorage.removeItem("accessToken");
            } finally {
                setLoading(false);
            }
        };

        initAuth();

        return () => clearRefreshTimeout();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Sign out
    const signout = async () => {
        clearRefreshTimeout();
        localStorage.removeItem("accessToken");
        setUser(null);
        setAccessToken(null);

        await fetch(`${API_URL}/api/auth/signout`, {
            method: "POST",
            credentials: "include",
        }).catch(() => {});
    };

    const refreshUser = async () => {
        if (!accessToken) return;

        try {
            const res = await fetch(`${API_URL}/api/auth/session`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            const data = await res.json();

            if (data.ok && data.user) {
                setUser(data.user);
            }
        } catch (err) {
            console.error("Failed to refresh user:", err);
        }
    };
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                signout,
                accessToken,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
