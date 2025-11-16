// src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../../../shared/types/types";

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
    signout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
    loading: true,
    signout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // 1. Load access token from localStorage
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoading(false);
            return;
        }

        // 2. Validate with backend
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok && data.user) setUser(data.user);
                else setUser(null);
            })
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    // 3. signout – clear both access token + refresh cookie
    const signout = async () => {
        localStorage.removeItem("accessToken");
        setUser(null);

        // Call backend to invalidate refresh token (optional but recommended)
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signout`, {
            method: "POST",
            credentials: "include", // sends httpOnly cookie
        }).catch(() => {});
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, signout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
