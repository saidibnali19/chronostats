"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function DangerSection() {
    const [confirm, setConfirm] = useState("");

    const { setUser } = useAuth();

    const router = useRouter();

    async function handleDelete() {
        try {
            if (confirm !== "DELETE") {
                alert("Type DELETE to confirm.");
                return;
            }

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/account`,
                {
                    method: "DELETE",
                    credentials: "include",
                },
            );

            if (!res.ok) {
                toast.error("Failed to delete account. Please try again.");
                return;
            }

            toast.success("Account deleted successfully.");

            setUser(null);
            router.push("/");
        } catch (error) {
            console.error("Error deleting account:", error);
            toast.error("Failed to delete account. Please try again.");
        }
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-medium text-red-600">Danger Zone</h2>

            <p className="text-sm text-gray-600">
                Deleting your account is irreversible. All your data will be
                removed.
            </p>

            <div className="flex flex-wrap gap-4">
                <input
                    className="form-input"
                    placeholder='Type "DELETE" to confirm'
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                />
                <button
                    onClick={handleDelete}
                    className="btn bg-red-600 text-white hover:bg-red-700"
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
}
