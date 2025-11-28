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
            <div className="bg-gray-200/90 bg-[url(/images/accountbg.webp)] bg-cover p-8 bg-blend-overlay">
                <Wizard />
            </div>
        </>
    );
}
