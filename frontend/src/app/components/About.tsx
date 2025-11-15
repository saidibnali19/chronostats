export default function About() {
    return (
        <>
            <article className="bg-base-500 mx-auto max-w-7xl space-y-8 overflow-x-clip px-4 py-20 md:py-30">
                <h2 className="text-base-500 text-center text-2xl font-medium">
                    About Chronostats
                </h2>
                <p className="bg-base-400 mx-auto max-w-2xl rounded-2xl p-8 text-center shadow-sm shadow-cyan-900">
                    Traditional spreadsheets and static reports are inefficient
                    for analyzing time-dependent data. ChronoStats leverages
                    MongoDB’s time-series collections and aggregation pipelines
                    to store, process, and visualize data efficiently — even as
                    it grows large. By separating the frontend (Next.js +
                    TypeScript) from the backend (Node.js + Express), it
                    achieves both speed and scalability. The result: a modern
                    analytics platform that feels light but performs like
                    enterprise software.
                </p>
            </article>
        </>
    );
}
