import Blog from "./components/Blog";
import Features from "./components/Features";
import Hero from "./components/Hero";

export default async function Home() {
    return (
        <>
            <Hero />
            <Features />
            <Blog />
        </>
    );
}
