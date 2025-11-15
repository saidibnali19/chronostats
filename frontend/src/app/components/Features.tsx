import { features } from "../data/features";
import Feature from "./Feature";

export default function Features() {
    return (
        <>
            <article className="mx-auto max-w-7xl space-y-8 overflow-x-clip px-4 py-20 md:py-30">
                <h3 className="text-base-500 text-center text-2xl font-medium">
                    Features
                </h3>
                <ul
                    className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] grid-rows-[aut0_auto_1fr] gap-8"
                    role="list"
                >
                    {features.map((feature, index) => (
                        <li
                            className="row-span-3 grid grid-rows-subgrid"
                            key={index}
                        >
                            <Feature
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        </li>
                    ))}
                </ul>
            </article>
        </>
    );
}
