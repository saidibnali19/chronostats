"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

interface SignupModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    // Errors
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    // Show / hide password toggle
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Password strength
    const [passwordStrength, setPasswordStrength] = useState<
        "" | "weak" | "medium" | "strong"
    >("");

    // Auth context
    const { setUser } = useAuth();

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
        setFirstName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFirstNameError("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");
        setError("");
    };

    // VALIDATION LOGIC
    const validateFirstName = (value: string) => {
        const cleaned = value.trimStart(); // prevent "   a"
        setFirstName(cleaned);

        if (!cleaned || cleaned.trim().length === 0) {
            setFirstNameError("First name is required.");
        } else {
            setFirstNameError("");
        }
    };

    const validateLastName = (value: string) => {
        const cleaned = value.trimStart();
        setLastName(cleaned);

        if (!cleaned || cleaned.trim().length === 0) {
            setLastNameError("Last name is required.");
        } else {
            setLastNameError("");
        }
    };

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

    // Password strength meter
    const calculatePasswordStrength = (value: string) => {
        if (!value) return setPasswordStrength("");

        let score = 0;

        if (value.length >= 6) score++;
        if (value.length >= 10) score++;
        if (/[A-Z]/.test(value)) score++;
        if (/[0-9]/.test(value)) score++;
        if (/[^A-Za-z0-9]/.test(value)) score++; // symbols

        if (score <= 2) setPasswordStrength("weak");
        else if (score === 3 || score === 4) setPasswordStrength("medium");
        else setPasswordStrength("strong");
    };

    const validatePassword = (value: string) => {
        setPassword(value);
        calculatePasswordStrength(value);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (emailError || passwordError || confirmPasswordError) return;

        setError("");

        console.log({ firstName, lastName, email, password });
        // TODO: call your backend API
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        email,
                        password,
                    }),
                },
            );

            const data = await res.json();

            if (!data.success) {
                setError(data.message);
                return;
            }

            if (data.accessToken) {
                localStorage.setItem("accesstoken", data.accessToken);
            }

            setUser(data.user);

            setFirstName("");
            setLastName("");
            setPassword("");
            setConfirmPassword("");

            onClose();
        } catch (err) {
            console.error("Signup error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
        }
    };

    const googleSignup = () => {
        // TODO: wire this to your OAuth route
        window.location.href = "/api/auth/google";
    };

    const isFormValid =
        firstName &&
        lastName &&
        email &&
        password &&
        confirmPassword &&
        !firstNameError &&
        !lastNameError &&
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
                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Fisrt Name */}
                        <div className="space-y-2">
                            <label
                                className="block text-sm"
                                htmlFor="firstname"
                            >
                                First Name
                            </label>
                            <input
                                id="firstname"
                                className={`form-input w-full ${
                                    firstNameError
                                        ? "focus-visible:outline-red-500"
                                        : ""
                                }`}
                                value={firstName}
                                autoFocus={true}
                                onChange={(e) =>
                                    validateFirstName(e.target.value)
                                }
                                placeholder="First Name"
                            />
                            {firstNameError && (
                                <p className="text-xs text-red-600">
                                    {firstNameError}
                                </p>
                            )}
                        </div>
                        {/* Last Name */}
                        <div className="space-y-2">
                            <label className="block text-sm" htmlFor="lastname">
                                Last Name
                            </label>
                            <input
                                id="lastname"
                                className={`form-input w-full ${
                                    lastNameError
                                        ? "focus-visible:outline-red-500"
                                        : ""
                                }`}
                                value={lastName}
                                onChange={(e) =>
                                    validateLastName(e.target.value)
                                }
                                placeholder="Last Name"
                            />
                            {lastNameError && (
                                <p className="text-xs text-red-600">
                                    {lastNameError}
                                </p>
                            )}
                        </div>
                    </div>

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
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) =>
                                    validatePassword(e.target.value)
                                }
                                className={`form-input w-full ${
                                    passwordError
                                        ? "focus-visible:outline-red-500"
                                        : ""
                                }`}
                                placeholder="••••••••"
                            />
                            {/* Toggle button */}
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer hover:text-black"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                        {passwordError && (
                            <p className="text-xs text-red-600">
                                {passwordError}
                            </p>
                        )}
                        {/* Password Strength Meter */}
                        {password && !passwordError && (
                            <div className="mt-1">
                                <div className="h-1 w-full rounded-full bg-gray-200">
                                    <div
                                        className={`h-full rounded-full transition-all ${
                                            passwordStrength === "weak"
                                                ? "w-1/3 bg-red-500"
                                                : passwordStrength === "medium"
                                                  ? "w-2/3 bg-yellow-500"
                                                  : passwordStrength ===
                                                      "strong"
                                                    ? "w-full bg-green-500"
                                                    : "w-0"
                                        }`}
                                    ></div>
                                </div>
                                <p
                                    className={`mt-1 text-xs ${
                                        passwordStrength === "weak"
                                            ? "text-red-500"
                                            : passwordStrength === "medium"
                                              ? "text-yellow-600"
                                              : "text-green-600"
                                    }`}
                                >
                                    {passwordStrength === "weak" &&
                                        "Weak password"}
                                    {passwordStrength === "medium" &&
                                        "Good password"}
                                    {passwordStrength === "strong" &&
                                        "Strong password"}
                                </p>
                            </div>
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
                        <div className="relative">
                            <input
                                id="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
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
                            {/* Toggle */}
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword((prev) => !prev)
                                }
                                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer hover:text-black"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
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
                    {error && (
                        <p className="text-red-500" aria-live="polite">
                            {error}
                        </p>
                    )}
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
                        src="/images/google.png"
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
