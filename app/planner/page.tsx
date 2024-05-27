import { Session } from "next-auth";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

import { createPlannedItem, getPlannedItems, deletePlannedItem } from "./actions";

import PlannerForm from "@/app/components/planner-form";
import PlannerItems from "@/app/components/planner-items";

import type { PlannerItem } from "@/lib/validators";

import { Separator } from "@/components/ui/separator";
import { getUsersOrganisation } from "@/app/shared-actions";

export default async function Planner() {
    // null or a user object from github
    const session: Session | null = await auth();

    // if not signed in redirect to sign in page then back here
    if (!session?.user) {
        redirect("/api/auth/signin?callbackUrl=/planner");
    }
    
    let organisation;
    try {
        organisation = await getUsersOrganisation(session.user.id || "");
    } catch (e) {
        throw new Error("Internal server error.");
    }

    const userIsNotPartOfOrganisation = !organisation?.organisationId;
    if (userIsNotPartOfOrganisation) {
        redirect("/create");
    }

    const plannedItems: PlannerItem[] | null | undefined = await getPlannedItems();
    return (
        <main className="">
            <h2 className="text-3xl font-bold tracking-tight">
                Planner
            </h2>
            <p className="text-muted-foreground">
                Create new planned actions here to share with others.
            </p>
            <Separator className="my-4" />
            <div className="flex flex-col md:flex-row mt-4">
                <div className="w-full md:w-1/3 md:pr-2 pb-4 md:pb-0">
                    <PlannerForm createPlannedItem={createPlannedItem} />
                </div>
                <div className="w-full md:w-2/3 md:pl-2">
                    <PlannerItems plannedItems={plannedItems} deletePlannedItem={deletePlannedItem} />
                </div>
            </div>
        </main>
    );
};
