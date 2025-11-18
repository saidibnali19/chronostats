"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { User } from "../../../shared/types/types";

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
    signout: () => void;

    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
    loading: true,
    signout: () => {},

    refreshUser: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const [loading, setLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const initAuth = async () => {
            try {
                const res = await fetch(`${API_URL}/api/auth/session`, {
                    method: "GET",
                    credentials: "include",
                });

                const data = await res.json();

                if (data.ok && data.user) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const signout = async () => {
        setUser(null);

        await fetch(`${API_URL}/api/auth/signout`, {
            method: "POST",
            credentials: "include",
        }).catch(() => {});
    };

    const refreshUser = async () => {
        try {
            const res = await fetch(`${API_URL}/api/auth/session`, {
                method: "GET",
                credentials: "include",
            });

            const data = await res.json();
            if (data.ok && data.user) {
                setUser(data.user);
                console.log(data.user);
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
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
