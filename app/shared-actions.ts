import { usersOrganisations } from "@/db/schema/users-organisations";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { auth } from "@/app/auth";
import { Session } from "next-auth";

export const getUsersOrganisation = async (userId: string) => {
    const userOrganisation = await db
        .select()
        .from(usersOrganisations)
        .where(eq(usersOrganisations.userId, userId))
        .all();

    if (!userOrganisation || userOrganisation.length === 0) {
        return null;
    }

    return userOrganisation[0];
};

// confirm user is logged in and has a session
export const authorizeUser = async (redirectPage: string) => {
    const session: Session | null = await auth();

    // if not signed in redirect to sign in page then back here
    if (!session?.user) {
        redirect("/api/auth/signin?callbackUrl=/" + redirectPage);
    }

    return session;
};
