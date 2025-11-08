import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "Chronostats",
    description:
        "ChronoStats is a personal analytics dashboard that helps individuals make sense of their daily data over time.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-base-400 text-base-400 text-base">
                <Navbar />
                {children}
            </body>
        </html>
    );
}
