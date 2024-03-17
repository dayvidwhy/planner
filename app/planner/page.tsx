import { Session } from "next-auth";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

import { createPlannedItem, getPlannedItems } from "./actions";

import PlannerForm from "@/app/components/planner-form";
import PlannerItems from "@/app/components/planner-items";

export default async function Profile() {
    // null or a user object from github
    const session: Session | null = await auth();

    // if not signed in redirect to sign in page then back here
    if (!session?.user) {
        redirect("/api/auth/signin?callbackUrl=/planner");
    }

    const plannedItems = await getPlannedItems();

    return (
        <main className="flex min-h-screen p-24">
            <div className="w-1/2 p-4">
                <PlannerForm createPlannedItem={createPlannedItem} />
            </div>
            <div className="w-1/2 p-4">
                <PlannerItems plannedItems={plannedItems} />
            </div>
        </main>
    );
};
