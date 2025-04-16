import type { Metadata } from "next";
import "./globals.css";

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
            <body>
            {children}
            </body>
        </html>
    );
}