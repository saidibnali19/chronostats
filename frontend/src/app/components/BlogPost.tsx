import Link from "next/link";
import type { BlogPost as BlogPostType } from "../../../../shared/types/types";
import Image from "next/image";

export default function BlogPost({ title, imageUrl, slug }: BlogPostType) {
    return (
        <>
            <Link
                className="hover:-translate-y-1 hover:shadow-xl focus-visible:-translate-1 focus-visible:shadow-xl focus-visible:outline-none"
                href={`blog/${slug}`}
            >
                <span className="sr-only">Read more about {title}</span>
                <article className="bg-accent relative isolate min-h-[50svh] rounded-2xl p-4 shadow-sm shadow-cyan-900 transition">
                    <h4 className="absolute bottom-4 left-0 w-full bg-cyan-400/90 p-4 font-medium">
                        {title}
                    </h4>
                    <Image
                        className="absolute inset-0 -z-10 size-full rounded-[inherit] object-cover"
                        src={imageUrl}
                        alt=""
                        width={500}
                        height={500}
                    />
                </article>
            </Link>
        </>
    );
}
