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
        <html lang="en" className="h-full" suppressHydrationWarning>
            <body className={inter.className + " h-full"}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="flex flex-col h-full">
                        <div className="p-1 border-b border-slate-200 flex flex-row justify-between">
                            <Navigation
                                signIn={async () => {
                                    "use server";
                                    await signIn();
                                }}
                                signOut={async () => {
                                    "use server";
                                    await signOut({redirectTo: "/"});
                                }}
                                loggedIn={session !== null}
                            />
                            <ThemeToggle />
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <div className="pt-8 container">
                                {children}
                            </div>
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
};
