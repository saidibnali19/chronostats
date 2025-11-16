"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface SignModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function SignModal({
    isOpen,
    onClose,
    title,
    children,
}: SignModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen && !dialog.open) dialog.showModal();
        if (!isOpen && dialog.open) dialog.close();
    }, [isOpen]);

    const handleClose = () => {
        onClose();
    };

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose}
            className="mx-auto mt-20 max-w-2xl rounded-2xl border-0 p-0 backdrop:bg-black/40 backdrop:backdrop-blur-sm md:min-w-sm lg:min-w-md"
        >
            <div className="relative space-y-4 rounded-2xl p-8 shadow-xl">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    autoFocus={false}
                    className="absolute top-0 right-0 cursor-pointer p-2 hover:text-black"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Title */}
                <h2 className="text-center text-2xl font-semibold">{title}</h2>

                {children}
            </div>
        </dialog>
    );
}
