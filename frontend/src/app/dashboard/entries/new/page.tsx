import Wizard from "./components/Wizard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AddNewEntryPage() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");

    if (!accessToken) {
        redirect("/auth-required");
    }

    return (
        <>
            <Wizard />
        </>
    );
}
