import { EditIcon } from "lucide-react";
import Link from "next/link";

export default function EditProfileButton() {
    return (
        <>
            <Link
                href={"/account/edit"}
                className="btn btn-primary flex items-center gap-2"
            >
                <EditIcon />
                <span>Edit Profile</span>
            </Link>
        </>
    );
}
