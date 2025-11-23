import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";

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
                <AuthProvider>
                    <Toaster position="top-right" />
                    <Navbar />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
