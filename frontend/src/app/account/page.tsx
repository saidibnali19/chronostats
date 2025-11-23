"use client";

import { useAuth } from "@/context/AuthContext";
import ProfileFirstCard from "./components/ProfileFirstCard";
import ProfileSecondCard from "./components/ProfileSecondCard";
import ProfileThirdCard from "./components/ProfileThirdCard";
import Bio from "./components/Bio";
import EditProfileButton from "./components/EditProfileButton";

export default function AccountPage() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <p>Loading...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="py-10 text-center">
                <h1 className="mb-4 text-xl font-semibold">
                    You are not logged in
                </h1>
            </div>
        );
    }

    return (
        <div className="bg-gray-200/90 bg-[url(/images/accountbg.webp)] bg-cover p-8 bg-blend-overlay">
            <div className="card mx-auto min-h-[calc(100svh-5rem)] max-w-5xl space-y-4 bg-gray-300/90">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-semibold">Account</h1>
                    <EditProfileButton />
                </div>
                <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:grid-rows-[auto_auto]">
                    <ProfileFirstCard user={user} />
                    <ProfileSecondCard user={user} />
                    <ProfileThirdCard user={user} />
                    <Bio user={user} />
                </div>
            </div>
        </div>
    );
}
