import { LogOut } from "lucide-react";

export default function SignOutButton({
    onSignout,
}: {
    onSignout: () => void;
}) {
    return (
        <>
            <button
                onClick={onSignout}
                className="btn btn-primary flex items-center gap-1.5 text-sm"
            >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
            </button>
        </>
    );
}
