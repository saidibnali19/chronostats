// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Bio({ user }: any) {
    return (
        <>
            <article className="card bg-base-400 space-y-4 shadow-sm md:col-start-1 md:-col-end-1">
                <h4 className="font-semibold">Bio</h4>
                {user.bio ? <p>{user.bio}</p> : <p>No bio, yet.</p>}
            </article>
        </>
    );
}
