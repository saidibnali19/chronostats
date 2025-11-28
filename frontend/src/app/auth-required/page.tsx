import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");

    if (accessToken) {
        redirect("/dashboard");
    }

    return (
        <>
            <div className="py-10 text-center">
                <h1 className="mb-4 text-xl font-semibold">
                    You are not logged in
                </h1>
            </div>
        </>
    );
}
