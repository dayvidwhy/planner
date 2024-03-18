// libs
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// local libs
import "./globals.css";

// UI Components
import Navigation from "@/app/components/navigation";
import { auth, signIn, signOut } from "./auth";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeToggle from "@/app/components/theme-toggle";

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
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="flex justify-between p-1 border-b">
                        <Navigation
                            signIn={async () => {
                                "use server";
                                await signIn();
                            }}
                            signOut={async () => {
                                "use server";
                                await signOut();
                            }}
                            loggedIn={session !== null}
                        />
                        <ThemeToggle />
                    </div>
                    <div className="container mt-8">
                        {children}
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
};
