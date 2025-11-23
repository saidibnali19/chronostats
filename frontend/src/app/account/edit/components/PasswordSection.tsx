"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
    getPasswordStrength,
    validateConfirmPasswordField,
    validatePasswordField,
} from "@/utils/formInputValidations";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordSection() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Errors
    const [oldPasswordError, setOldPasswordError] = useState<string | null>("");
    const [newPasswordError, setNewPasswordError] = useState<string | null>("");
    const [confirmPasswordError, setConfirmPasswordError] = useState<
        string | null
    >("");

    // Show / hide password toggle
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Password strength
    const [passwordStrength, setPasswordStrength] = useState<
        "" | "weak" | "medium" | "strong"
    >("");

    const router = useRouter();

    const handleOldPassword = (value: string) => {
        setOldPassword(value);

        const { error } = validatePasswordField(value);
        setOldPasswordError(error);
    };

    const handleNewPassword = (value: string) => {
        setNewPassword(value);
        setPasswordStrength(getPasswordStrength(value));
        const { error } = validatePasswordField(value);
        setNewPasswordError(error);
    };

    const handleConfirmPassword = (value: string) => {
        setConfirmPassword(value);
        const { error } = validateConfirmPasswordField(newPassword, value);
        setConfirmPasswordError(error);
    };

    async function handlePasswordChange(e: React.FormEvent) {
        e.preventDefault();

        try {
            if (newPassword !== confirmPassword) {
                alert("New passwords do not match.");
                return;
            }

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/account/change-password`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ oldPassword, newPassword }),
                },
            );

            if (!res.ok) {
                toast.error(
                    "Failed to change password. Please check your current password.",
                );
            }

            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setOldPasswordError("");
            setNewPasswordError("");
            setConfirmPasswordError("");

            toast.success("Password changed successfully.");
            // refreshUser();
            router.push("/account");
        } catch (error) {
            console.error("Error changing password:", error);
            toast.error("Failed to change password. Please try again.");
        }
    }

    return (
        <form className="space-y-6">
            <h2 className="text-xl font-medium">Change Password</h2>

            <div className="grid gap-4">
                <div className="grid gap-2">
                    <label className="text-sm" htmlFor="current-password">
                        Current Password
                    </label>
                    <div className="relative max-w-sm">
                        <input
                            id="current-password"
                            type={showOldPassword ? "text" : "password"}
                            className={`form-input w-full ${
                                oldPasswordError
                                    ? "focus-visible:outline-red-500"
                                    : ""
                            }`}
                            required
                            value={oldPassword}
                            onChange={(e) => handleOldPassword(e.target.value)}
                            placeholder="Current password"
                        />
                        {/* Toggle button */}
                        <button
                            type="button"
                            onClick={() => setShowOldPassword((prev) => !prev)}
                            className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer hover:text-black"
                        >
                            {showOldPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                    {oldPasswordError && (
                        <p className="text-xs text-red-600">
                            {oldPasswordError}
                        </p>
                    )}
                </div>
                <div className="grid gap-2">
                    <label className="text-sm" htmlFor="new-password">
                        New Password
                    </label>

                    <div className="relative max-w-sm">
                        <input
                            id="new-password"
                            type={showNewPassword ? "text" : "password"}
                            className={`form-input w-full ${
                                newPasswordError
                                    ? "focus-visible:outline-red-500"
                                    : ""
                            }`}
                            value={newPassword}
                            onChange={(e) => handleNewPassword(e.target.value)}
                            placeholder="New password"
                        />
                        {/* Toggle button */}
                        <button
                            type="button"
                            onClick={() => setShowNewPassword((prev) => !prev)}
                            className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer hover:text-black"
                        >
                            {showNewPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                    {newPasswordError && (
                        <p className="text-xs text-red-600">
                            {newPasswordError}
                        </p>
                    )}
                    {newPassword && !newPasswordError && (
                        <div className="mt-1">
                            <div className="h-1 w-full max-w-sm rounded-full bg-gray-200">
                                <div
                                    className={`h-full rounded-full transition-all ${
                                        passwordStrength === "weak"
                                            ? "w-1/3 bg-red-500"
                                            : passwordStrength === "medium"
                                              ? "w-2/3 bg-yellow-500"
                                              : passwordStrength === "strong"
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
                                {passwordStrength === "weak" && "Weak password"}
                                {passwordStrength === "medium" &&
                                    "Good password"}
                                {passwordStrength === "strong" &&
                                    "Strong password"}
                            </p>
                        </div>
                    )}
                </div>
                <div className="grid gap-2">
                    <label className="text-sm" htmlFor="confirm-new-password">
                        Confirm New Password
                    </label>
                    <div className="relative max-w-sm">
                        <input
                            id="confirm-new-password"
                            type={showConfirmPassword ? "text" : "password"}
                            className={`form-input w-full ${
                                confirmPasswordError
                                    ? "focus-visible:outline-red-500"
                                    : ""
                            }`}
                            value={confirmPassword}
                            onChange={(e) =>
                                handleConfirmPassword(e.target.value)
                            }
                            placeholder="Confirm new password"
                        />
                        {/* Toggle button */}
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
            </div>

            <button onClick={handlePasswordChange} className="btn btn-primary">
                Update Password
            </button>
        </form>
    );
}
