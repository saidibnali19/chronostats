import { LogOut } from "lucide-react";

interface SignOutButtonProps {
    onSignout: () => void;
    variant?: string;
}
export default function SignOutButton({
    onSignout,
    variant,
}: SignOutButtonProps) {
    return (
        <>
            <button
                onClick={onSignout}
                className={`btn btn-primary flex items-center gap-1.5 text-sm ${variant === "full-width" ? "w-full" : ""}`}
            >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
            </button>
        </>
    );
}
