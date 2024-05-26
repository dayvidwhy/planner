import { Session } from "next-auth";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { getOrganisationSettings, getOrganisationUsers } from "./actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUsersOrganisation } from "@/app/shared-actions";

import { shortName } from "@/lib/utils";

export default async function Settings() {
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

    if (!organisation?.organisationId) {
        redirect("/create");
    }

    const organisationSettings = await getOrganisationSettings(organisation);

    const organisationUsers = await getOrganisationUsers(organisation);

    return (
        <main className="">
            <h2 className="text-3xl font-bold tracking-tight">
                Settings
            </h2>
            <p className="text-muted-foreground">
                Manage users in your organization.
            </p>
            <Separator className="my-4" />
            <div className="flex flex-row">
                <div className="w-1/3">
                    <h3 className="text-lg font-semibold">Organisation</h3>
                    <div className="mt-4">
                        <p className="text-sm text-muted-foreground">Name: {organisationSettings.name}</p>
                        <p className="text-sm text-muted-foreground">Email: {organisationSettings.description}</p>
                    </div>
                </div>
                <div className="w-2/3">
                    <h3 className="text-lg font-semibold">Organisation Users</h3>
                    <div className="space-y-8">
                        {organisationUsers.map((user, index) => (
                            <div key={index} className="flex items-center mt-4">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={user.image || ""} alt="Avatar" />
                                    <AvatarFallback>{shortName(user.name || "")}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">{user.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};
