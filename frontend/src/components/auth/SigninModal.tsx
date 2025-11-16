"use client";

import { useState } from "react";
import SignModal from "./SignModal";
import { Eye, EyeOff } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import {
    validateEmailField,
    validateSigninPassword,
} from "@/utils/formInputValidations";

interface SignInModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
    const { setUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleClose = () => {
        onClose();
        setEmail("");
        setPassword("");
        setEmailError("");
        setPasswordError("");
        setError("");
    };
    // Validation
    const handleEmail = (value: string) => {
        setEmail(value);
        const { error } = validateEmailField(value);
        setEmailError(error);
    };

    const handlePassword = (value: string) => {
        setPassword(value);
        const { error } = validateSigninPassword(value);
        setPasswordError(error);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                    credentials: "include",
                },
            );

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Invalid credentials");
                return;
            }

            if (data.accessToken) {
                localStorage.setItem("accessToken", data.accessToken);
            }

            setUser(data.user);

            setEmail("");
            setPassword("");
            setError("");
            onClose();
        } catch (error) {
            console.error("Signin error:", error);
            setError("Something went wrong. Please try again.");
        }
    };

    const isValid = email && password && !emailError && !passwordError;

    return (
        <SignModal isOpen={isOpen} onClose={handleClose} title="Sign In ">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm" htmlFor="signInemail">
                        Email
                    </label>
                    <input
                        id="signInemail"
                        type="email"
                        required
                        className={`form-input w-full ${
                            emailError ? "focus-visible:outline-red-500" : ""
                        }`}
                        value={email}
                        onChange={(e) => handleEmail(e.target.value)}
                        placeholder="you@example.com"
                        autoFocus={true}
                    />
                    {emailError && (
                        <p className="text-xs text-red-600">{emailError}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm" htmlFor="signInpassword">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="signInpassword"
                            type={showPassword ? "text" : "password"}
                            className={`form-input w-full ${
                                passwordError
                                    ? "focus-visible:outline-red-500"
                                    : ""
                            }`}
                            value={password}
                            onChange={(e) => handlePassword(e.target.value)}
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff size={16} />
                            ) : (
                                <Eye size={16} />
                            )}
                        </button>
                        {passwordError && (
                            <p className="text-red-500" aria-live="polite">
                                {passwordError}
                            </p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!isValid}
                    className={`btn btn-primary w-full ${
                        !isValid && "cursor-not-allowed opacity-50"
                    }`}
                >
                    Sign In
                </button>
                {error && (
                    <p className="text-red-500" aria-live="polite">
                        {error}
                    </p>
                )}
            </form>
        </SignModal>
    );
}
