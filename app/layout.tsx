import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/navigation";
import { auth } from "./auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Planner",
    description: "Plan anything collaboratively.",
};

export default async function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    // null or a user object from github
    const session = await auth();

    return (
        <html lang="en">
            <body className={inter.className}>
                <Navigation
                    loggedIn={session !== null}
                />
                <div className="container">
                    {children}
                </div>
            </body>
        </html>
    );
};
