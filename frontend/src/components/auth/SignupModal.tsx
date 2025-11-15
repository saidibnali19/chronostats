"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface SignupModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    // Errors
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    // Open / close the dialog when props change
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen && !dialog.open) {
            dialog.showModal();
        } else if (!isOpen && dialog.open) {
            dialog.close();
        }
    }, [isOpen]);

    const handleClose = () => {
        onClose();
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");
    };

    // VALIDATION LOGIC
    const validateEmail = (value: string) => {
        setEmail(value);
        if (!value) return setEmailError("Email is required.");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError("Enter a valid email address.");
        } else {
            setEmailError("");
        }
    };

    const validatePassword = (value: string) => {
        setPassword(value);
        if (!value) return setPasswordError("Password is required.");

        if (value.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
        } else {
            setPasswordError("");
        }
    };

    const validateConfirmPassword = (value: string) => {
        setConfirmPassword(value);
        if (!value)
            return setConfirmPasswordError("Please confirm your password.");

        if (value !== password) {
            setConfirmPasswordError("Passwords do not match.");
        } else {
            setConfirmPasswordError("");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (emailError || passwordError || confirmPasswordError) return;

        setError("");

        console.log({ email, password });
        // TODO: call your backend API
    };

    const googleSignup = () => {
        // TODO: wire this to your OAuth route
        window.location.href = "/api/auth/google";
    };

    const isFormValid =
        email &&
        password &&
        confirmPassword &&
        !emailError &&
        !passwordError &&
        !confirmPasswordError;

    return (
        <dialog
            ref={dialogRef}
            className="mx-auto mt-20 max-w-2xl rounded-2xl border-0 p-0 backdrop:bg-black/40 backdrop:backdrop-blur-sm md:min-w-sm lg:min-w-md"
            onClose={handleClose}
        >
            <div className="relative space-y-4 rounded-2xl p-8 shadow-xl">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    autoFocus={false}
                    className="absolute top-0 right-0 cursor-pointer p-2 hover:text-black"
                >
                    <X className="h-5 w-5" />
                </button>

                <h2 className="text-center text-2xl font-semibold">
                    Create Your Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div className="space-y-2">
                        <label className="block text-sm" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => validateEmail(e.target.value)}
                            className={`form-input w-full ${
                                emailError
                                    ? "focus-visible:outline-red-500"
                                    : ""
                            }`}
                            placeholder="you@example.com"
                            autoFocus={true}
                        />
                        {emailError && (
                            <p className="text-xs text-red-600">{emailError}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label className="block text-sm" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => validatePassword(e.target.value)}
                            className={`form-input w-full ${
                                passwordError
                                    ? "focus-visible:outline-red-500"
                                    : ""
                            }`}
                            placeholder="••••••••"
                        />
                        {passwordError && (
                            <p className="text-xs text-red-600">
                                {passwordError}
                            </p>
                        )}
                    </div>

                    {/* Confirm password */}
                    <div className="space-y-2">
                        <label
                            className="block text-sm"
                            htmlFor="confirm-password"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="confirm-password"
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) =>
                                validateConfirmPassword(e.target.value)
                            }
                            className={`form-input w-full ${
                                confirmPasswordError
                                    ? "focus-visible:outline-red-500"
                                    : ""
                            }`}
                            placeholder="••••••••"
                        />
                        {confirmPasswordError && (
                            <p className="text-xs text-red-600">
                                {confirmPasswordError}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`btn btn-primary w-full ${
                            !isFormValid && "cursor-not-allowed opacity-50"
                        }`}
                    >
                        Create Account
                    </button>
                </form>

                {/* Divider */}
                <div className="my-4 flex items-center">
                    <div className="h-px flex-1 bg-gray-300"></div>
                    <span className="mx-2 text-sm text-gray-500">or</span>
                    <div className="h-px flex-1 bg-gray-300"></div>
                </div>

                {/* Google Signup */}
                <button
                    onClick={googleSignup}
                    className="btn btn-secondary flex w-full items-center justify-center gap-3"
                >
                    <Image
                        src="/google.svg"
                        alt="Google"
                        width={5}
                        height={5}
                        className="h-5 w-5"
                    />
                    Sign Up with Google
                </button>
            </div>
        </dialog>
    );
}
