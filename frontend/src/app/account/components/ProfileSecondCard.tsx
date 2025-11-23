// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProfileSecondCard({ user }: any) {
    return (
        <>
            <article className="card bg-base-400 space-y-4 shadow-sm">
                <h3 className="font-semibold">Account details</h3>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>First Name</span>
                        <span className="font-semibold">{user.firstName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Last Name</span>
                        <span className="font-semibold">{user.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Date of Birth</span>
                        <span className="font-semibold">
                            {user.dob || "N/A"}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Gender</span>
                        <span className="font-semibold">
                            {user.gender || "N/A"}
                        </span>
                    </div>
                </div>
            </article>
        </>
    );
}
