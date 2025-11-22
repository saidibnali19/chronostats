"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PasswordSection() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();

    async function handlePasswordChange() {
        if (newPassword !== confirmPassword) {
            alert("New passwords do not match.");
            return;
        }

        await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/account/change-password`,
            {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ oldPassword, newPassword }),
            },
        );

        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");

        router.push("/account");
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-medium">Change Password</h2>

            <div className="grid gap-4">
                <input
                    type="password"
                    className="form-input"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Current password"
                />
                <input
                    type="password"
                    className="form-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password"
                />
                <input
                    type="password"
                    className="form-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                />
            </div>

            <button onClick={handlePasswordChange} className="btn btn-primary">
                Update Password
            </button>
        </div>
    );
}
