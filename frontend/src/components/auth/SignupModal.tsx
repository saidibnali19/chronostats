"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import SignModal from "./SignModal";
// import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import {
    getPasswordStrength,
    validateConfirmPasswordField,
    validateEmailField,
    validateName,
    validatePasswordField,
} from "@/utils/formInputValidations";
import { useRouter } from "next/navigation";

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignUpModalProps) {
    const router = useRouter();

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
    const { refreshUser } = useAuth();

    const handleClose = () => {
        onClose();
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFirstNameError("");
        setLastNameError("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");
        setError("");
    };

    const handleFirstName = (value: string) => {
        const { value: cleaned, error } = validateName(value);

        setFirstName(cleaned);
        setFirstNameError(error);
    };

    const handleLastName = (value: string) => {
        const { value: cleaned, error } = validateName(value);

        setLastName(cleaned);
        setLastNameError(error);
    };

    const handleEmail = (raw: string) => {
        const valueWithoutSpaces = raw.replace(/\s+/g, "");

        const { value, error } = validateEmailField(valueWithoutSpaces);
        setEmail(value);
        setEmailError(error);
    };

    const handlePassword = (value: string) => {
        setPassword(value);
        setPasswordStrength(getPasswordStrength(value));

        const { error } = validatePasswordField(value);
        setPasswordError(error);
    };

    const handleConfirmPassword = (value: string) => {
        setConfirmPassword(value);

        const { error } = validateConfirmPasswordField(value, password);
        setConfirmPasswordError(error);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (emailError || passwordError || confirmPasswordError) return;

        setError("");

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
                    credentials: "include",
                },
            );

            const data = await res.json();

            if (!data.success) {
                setError(data.message || "Signup failed");
                return;
            }

            await refreshUser();

            setFirstName("");
            setLastName("");
            setPassword("");
            setConfirmPassword("");

            onClose();
            router.push("/dashboard");
        } catch (err) {
            console.error("Signup error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
        }
    };

    // const googleSignup = () => {
    //     // TODO: wire this to your OAuth route
    //     window.location.href = "/api/auth/google";
    // };

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
        <SignModal
            isOpen={isOpen}
            title="Create Your Account"
            onClose={handleClose}
        >
            <div className="relative space-y-4 rounded-2xl p-8 shadow-xl">
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
                                    handleFirstName(e.target.value)
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
                                onChange={(e) => handleLastName(e.target.value)}
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
                            onChange={(e) => handleEmail(e.target.value)}
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
                                onChange={(e) => handlePassword(e.target.value)}
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
                                    handleConfirmPassword(e.target.value)
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
                {/* <div className="my-4 flex items-center">
                    <div className="h-px flex-1 bg-gray-300"></div>
                    <span className="mx-2 text-sm text-gray-500">or</span>
                    <div className="h-px flex-1 bg-gray-300"></div>
                </div> */}

                {/* Google Signup */}
                {/* <button
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
                </button> */}
            </div>
        </SignModal>
    );
}
