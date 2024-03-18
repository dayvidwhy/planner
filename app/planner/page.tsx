import { Session } from "next-auth";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

import { createPlannedItem, getPlannedItems, deletePlannedItem } from "./actions";

import PlannerForm from "@/app/planner/planner-form";
import PlannerItems from "@/app/planner/planner-items";

import type { PlannerItem } from "@/app/planner/planner-form";

export default async function Profile() {
    // null or a user object from github
    const session: Session | null = await auth();

    // if not signed in redirect to sign in page then back here
    if (!session?.user) {
        redirect("/api/auth/signin?callbackUrl=/planner");
    }

    const plannedItems: PlannerItem[] | null | undefined = await getPlannedItems();
    return (
        <main className="flex min-h-screen p-24">
            <div className="w-1/2 pr-2">
                <PlannerForm createPlannedItem={createPlannedItem} />
            </div>
            <div className="w-1/2 pl-2">
                <PlannerItems plannedItems={plannedItems} deletePlannedItem={deletePlannedItem} />
            </div>
        </main>
    );
};
