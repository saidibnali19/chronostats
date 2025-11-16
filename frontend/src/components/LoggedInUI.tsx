"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User as UserIcon } from "lucide-react";
import { User as UserType } from "../../../shared/types/types";
import SignOutButton from "./SignOutButton";
import Image from "next/image";

export default function LoggedInUI({
    user,
    onSignout,
}: {
    user: UserType;
    onSignout: () => void;
}) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    function handleClick() {
        setOpen(false);
        onSignout();
    }

    // close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="btn btn-secondary inline-flex size-8 items-center justify-around rounded-full p-0 text-white"
            >
                {user.avatar ? (
                    <Image src={user.avatar} width={20} height={20} alt="" />
                ) : (
                    <UserIcon className="size-5" />
                )}
            </button>

            {/* Dropdown */}
            {open && (
                <div className="bg-base-500 absolute right-0 z-50 mt-2 grid w-48 gap-1 divide-y divide-solid divide-black overflow-clip rounded-md border shadow-lg">
                    <Link
                        href={"/account"}
                        className="flex gap-2 px-4 py-2 hover:bg-gray-100"
                        onClick={() => setOpen(false)}
                    >
                        <div className="btn btn-secondary inline-flex size-10 items-center justify-around rounded-full p-0 text-white">
                            {user.avatar ? (
                                <Image
                                    src={user.avatar}
                                    width={20}
                                    height={20}
                                    alt=""
                                />
                            ) : (
                                <UserIcon className="size-6" />
                            )}
                        </div>
                        <div className="space-y-1">
                            <p>
                                {user.firstName} {user.lastName}
                            </p>
                            <p className="text-xs">Manage Account</p>
                        </div>
                    </Link>

                    <SignOutButton
                        variant="full-width"
                        onSignout={handleClick}
                    />
                </div>
            )}
        </div>
    );
}
