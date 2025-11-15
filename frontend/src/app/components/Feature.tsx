import type { Feature as FeatureType } from "../../../../shared/types/types";

export default function Feature({ icon, title, description }: FeatureType) {
    return (
        <>
            <article className="bg-primary row-span-3 grid grid-rows-subgrid gap-4 rounded-2xl p-8 text-center shadow-sm shadow-cyan-900 transition hover:-translate-y-1 hover:shadow-xl focus-visible:-translate-1 focus-visible:shadow-xl focus-visible:outline-none">
                <span className="text-2xl">{icon}</span>
                <h3 className="font-medium">{title}</h3>
                <p>{description}</p>
            </article>
        </>
    );
}
