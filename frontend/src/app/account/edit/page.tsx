"use client";

import { useState } from "react";
import ProfileSection from "./components/ProfileSection";
import PasswordSection from "./components/PasswordSection";
import DangerSection from "./components/DangerSection";

export default function EditAccountPage() {
    const [tab, setTab] = useState<"profile" | "password" | "danger">(
        "profile",
    );

    return (
        <div className="bg-gray-200/90 bg-[url(/images/accountbg.webp)] bg-cover p-4 bg-blend-overlay md:p-8">
            <div className="card mx-auto min-h-[calc(100svh-5rem)] max-w-5xl space-y-4 bg-gray-300/90 not-md:p-4">
                <h1 className="mb-8 text-2xl font-semibold">
                    Account Settings
                </h1>
                {/* Tabs */}
                <div className="card bg-base-400 border border-gray-300">
                    <div className="relative mb-8 flex gap-1 p-0 not-md:overflow-x-scroll before:absolute before:-right-20 before:bottom-0 before:-left-20 before:h-0.5 before:bg-gray-200 before:content-['']">
                        <button
                            className={`bg-base-400 cursor-pointer rounded-sm rounded-br-none rounded-bl-none border-2 border-b-0 border-gray-200 px-3 py-1.5 text-sm ${
                                tab === "profile"
                                    ? "z-20 font-semibold"
                                    : "text-gray-600"
                            }`}
                            onClick={() => setTab("profile")}
                        >
                            Profile
                        </button>
                        <button
                            className={`bg-base-400 cursor-pointer rounded-sm rounded-br-none rounded-bl-none border-2 border-b-0 border-gray-200 px-3 py-1.5 text-sm ${
                                tab === "password"
                                    ? "z-20 font-semibold"
                                    : "text-gray-600"
                            }`}
                            onClick={() => setTab("password")}
                        >
                            Change Password
                        </button>
                        <button
                            className={`bg-base-400 cursor-pointer rounded-sm rounded-br-none rounded-bl-none border-2 border-b-0 border-gray-200 px-3 py-1.5 text-sm ${
                                tab === "danger"
                                    ? "z-20 border-b-0 border-red-600 font-semibold text-red-600"
                                    : "text-gray-600"
                            }`}
                            onClick={() => setTab("danger")}
                        >
                            Danger Zone
                        </button>
                    </div>
                    {/* Content */}
                    {tab === "profile" && <ProfileSection />}
                    {tab === "password" && <PasswordSection />}
                    {tab === "danger" && <DangerSection />}
                </div>
            </div>
        </div>
    );
}
