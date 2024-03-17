import { Session } from "next-auth";
import { auth } from "@/app/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Profile() {
    // null or a user object from github
    const session: Session | null = await auth();

    // if not signed in redirect to sign in page then back here
    if (!session?.user) {
        redirect("/api/auth/signin?callbackUrl=/profile");
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {session ? (
                <div>
                    <Image
                        width={155}
                        height={155}
                        src={session.user?.image as string} 
                        alt={session.user?.name as string} />
                    <h1>{session.user?.name}</h1>
                    <p>{session.user?.email}</p>
                </div>
            ) : (
                <p>Not logged in</p>
            )}
        </main>
    );
};
