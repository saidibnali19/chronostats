import { blogposts } from "../data/blogposts";
import BlogPost from "./BlogPost";

export default function Blog() {
    return (
        <>
            <article className="mx-auto max-w-7xl space-y-4 overflow-x-clip px-4 py-20 md:py-30">
                <h3 className="text-base-500 text-center text-2xl font-medium">
                    Blog
                </h3>
                <ul
                    className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] grid-rows-[aut0_auto_1fr] gap-4"
                    role="list"
                >
                    {blogposts.map((post, index) => (
                        <li
                            className="row-span-3 grid grid-rows-subgrid"
                            key={index}
                        >
                            <BlogPost
                                title={post.title}
                                imageUrl={post.imageUrl}
                                slug={post.slug}
                            />
                        </li>
                    ))}
                </ul>
            </article>
        </>
    );
}
