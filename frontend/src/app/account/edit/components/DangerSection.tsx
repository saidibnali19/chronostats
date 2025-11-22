"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DangerSection() {
    const [confirm, setConfirm] = useState("");

    const { setUser } = useAuth();

    const router = useRouter();

    async function handleDelete() {
        if (confirm !== "DELETE") {
            alert("Type DELETE to confirm.");
            return;
        }

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account`, {
            method: "DELETE",
            credentials: "include",
        });

        setUser(null);
        router.push("/");
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
