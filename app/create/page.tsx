import { Session } from "next-auth";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { createOrganisation } from "./actions";
import OrganisationForm from "@/app/components/organisation-form";
import { getUsersOrganisation } from "@/app/shared-actions";

export default async function CreateOrganisation() {
    // null or a user object from github
    const session: Session | null = await auth();

    // if not signed in redirect to sign in page then back here
    if (!session?.user) {
        redirect("/api/auth/signin?callbackUrl=/settings");
    }
    
    let organisation;
    try {
        organisation = await getUsersOrganisation(session.user.id || "");
    } catch (e) {
        throw new Error("Internal server error.");
    }

    if (organisation?.organisationId) {
        redirect("/planner");
    }

    return (
        <main className="">
            <h2 className="text-3xl font-bold tracking-tight">
                Create Organisation
            </h2>
            <p className="text-muted-foreground">
                Create a new organisation to manage users and settings.
            </p>
            <Separator className="my-4" />
            <OrganisationForm createOrganisation={async (details) => {
                "use server";
                await createOrganisation(details);
            }} />
        </main>
    );
};
