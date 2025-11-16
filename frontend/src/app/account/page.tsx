"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ProfileFirstCard from "./components/ProfileFirstCard";
import ProfileSecondCard from "./components/ProfileSecondCard";
import ProfileThirdCard from "./components/ProfileThirdCard";
import Bio from "./components/Bio";

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
                <Link href="/signin" className="text-blue-600 hover:underline">
                    Sign in
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-200/90 bg-[url(/images/accountbg.webp)] bg-cover p-8 bg-blend-overlay">
            <div className="mx-auto min-h-[calc(100svh-5rem)] max-w-5xl">
                <h1 className="mb-6 text-2xl font-semibold">Account</h1>
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
