import { Session } from "next-auth";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { shortName } from "@/lib/short";

export default async function Profile() {
    // null or a user object from github
    const session: Session | null = await auth();

    // if not signed in redirect to sign in page then back here
    if (!session?.user) {
        redirect("/api/auth/signin?callbackUrl=/profile");
    }

    return (
        <main className="min-h-screen">
            <h2 className="text-3xl font-bold tracking-tight">
                Profile
            </h2>
            <p className="text-muted-foreground">
                Change settings and view your profile here.
            </p>
            <Separator className="my-4" />
            <div>
                <Avatar>
                    <AvatarImage src={session.user?.image as string} />
                    <AvatarFallback>{shortName(session.user?.name || "")}</AvatarFallback>
                </Avatar>
                <h1>{session.user?.name}</h1>
                <p>{session.user?.email}</p>
            </div>
        </main>
    );
};
