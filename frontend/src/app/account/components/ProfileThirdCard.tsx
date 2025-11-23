// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProfileThirdCard({ user }: any) {
    return (
        <>
            <article className="card bg-base-400 space-y-4 shadow-sm md:col-start-2">
                <h4 className="font-semibold">Shipping details</h4>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Address</span>
                        <span className="font-semibold">
                            {user.address || "N/A"}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>City</span>
                        <span className="font-semibold">
                            {user.city || "N/A"}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Country</span>
                        <span className="font-semibold">
                            {user.country || "N/A"}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>State</span>
                        <span className="font-semibold">
                            {user.state || "N/A"}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>ZIP code</span>
                        <span className="font-semibold">
                            {user.zip || "N/A"}
                        </span>
                    </div>
                </div>
            </article>
        </>
    );
}
