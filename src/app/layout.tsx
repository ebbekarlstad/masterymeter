import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Basic font setup
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "MasteryMeter",
    description: "Calculate Brawl Stars Mastery Progress!",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        {children}
        </body>
        </html>
    );
}