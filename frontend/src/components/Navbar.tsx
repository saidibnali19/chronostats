"use client";

import Link from "next/link";
import SignInButton from "./SignInButton";
import SignUpButton from "./SignUpButton";
import { useState } from "react";
import SignupModal from "./auth/SignupModal";
// import { User as UserType } from "../../../shared/types/types";
// import { User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
// import SignOutButton from "./SignOutButton";
import SignInModal from "./auth/SigninModal";
import LoggedInUI from "./LoggedInUI";

export default function Navbar() {
    const [openSignUpModal, setOpenSignUpModal] = useState(false);
    const [openSignInModal, setOpenSignInModal] = useState(false);
    const { user, loading, signout } = useAuth();

    return (
        <>
            <header>
                <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 shadow-sm">
                    <Link href={"/"} className="flex items-center gap-2">
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx="20"
                                cy="20"
                                r="18"
                                fill="#fafafa"
                                stroke="#222"
                                strokeWidth="2"
                            ></circle>
                            <path
                                d="M20 8 L20 20 L28 20"
                                stroke="#0c5e6e"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <circle cx="20" cy="20" r="2" fill="#222"></circle>
                            <path
                                d="M12 28 L16 24 L20 28 L24 22 L28 26"
                                stroke="#0c5e6e"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                opacity="0.6"
                            ></path>
                        </svg>
                        Chronostats
                    </Link>
                    <div className="flex items-center gap-3">
                        {loading ? (
                            <Skeleton />
                        ) : user ? (
                            <LoggedInUI user={user} onSignout={signout} />
                        ) : (
                            <>
                                <SignInButton setOpen={setOpenSignInModal} />
                                <SignUpButton setOpen={setOpenSignUpModal} />
                            </>
                        )}
                    </div>
                </nav>
                <SignupModal
                    isOpen={openSignUpModal}
                    onClose={() => setOpenSignUpModal(false)}
                />
                <SignInModal
                    isOpen={openSignInModal}
                    onClose={() => setOpenSignInModal(false)}
                />
            </header>
        </>
    );
}

function Skeleton() {
    return <div className="h-9 w-24 animate-pulse rounded bg-gray-200" />;
}
