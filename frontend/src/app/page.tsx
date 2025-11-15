import About from "./components/About";
import Blog from "./components/Blog";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

export default async function Home() {
    return (
        <>
            <Hero />
            <About />
            <Features />
            <Blog />
            <Footer />
        </>
    );
}
