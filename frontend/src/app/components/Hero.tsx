import React from "react";
import PrimaryCTA from "./PrimaryCTA";

export default function Hero() {
    return (
        <>
            <article className="mx-auto grid min-h-[calc(100svh-8rem)] max-w-7xl items-end px-4 pb-4 md:min-h-[calc(100svh-5rem)]">
                <div className="space-y-4">
                    <h1 className="text-base-500 text-3xl font-medium md:text-4xl">
                        Chronostats
                    </h1>
                    <p>
                        Turn your daily habits into visual insights. Track what
                        matters, see your growth.
                    </p>
                    <PrimaryCTA />
                </div>
            </article>
        </>
    );
}
