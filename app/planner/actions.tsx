"use server";

// libs
import { eq } from "drizzle-orm";
import { unstable_cache as cache, revalidateTag } from "next/cache";
import { authorizeUser } from "@/app/shared-actions";

// local libs
import { db } from "@/db";
import { items } from "@/db/schema/items";
import type { PlannerItem } from "@/lib/validators";
import { formSchema } from "@/lib/validators";
import { getUsersOrganisation } from "@/app/shared-actions";

const ITEMS_DB_CACHE_TAG = "planner-items";

// inserts a planned item into the database
export const createPlannedItem = async ({ summary, description, due}: PlannerItem) => {
    const session = await authorizeUser("planner");
    const userId = session.user?.id;
    if (!userId) {
        throw new Error("Unauthorized user");
    }

    const parseResult = formSchema.safeParse({ summary, description, due });
    if (!parseResult.success) {
        throw new Error("Invalid form data");
    }

    let organisation;
    try {
        organisation = await getUsersOrganisation(userId);
    } catch (e) {
        throw new Error("Internal server error.");
    }

    if (!organisation?.organisationId) {
        throw new Error("User is not part of an organisation");
    }

    try {
        await db.insert(items).values({
            createdBy: userId,
            id: crypto.randomUUID(),
            summary: parseResult.data.summary,
            description: parseResult.data.description,
            due: parseResult.data.due.toISOString(),
            organisationId: organisation.organisationId
        });
    } catch (e) {
        throw new Error("Internal server error.");
    }

    revalidateTag(ITEMS_DB_CACHE_TAG);
};

// fetches planned items from the database
export const getPlannedItems = async (): Promise<PlannerItem[]> => {
    const session = await authorizeUser("planner");
    const userId = session.user?.id;
    if (!userId) {
        throw new Error("Unauthorized user");
    }

    if (!session.user?.email) {
        throw new Error("User email not found");
    }

    let organisation;
    try {
        organisation = await getUsersOrganisation(userId);
    } catch (e) {
        throw new Error("Internal server error.");
    }

    if (!organisation?.organisationId) {
        throw new Error("User is not part of an organisation");
    }

    // get the items for the user
    let fetchedItems;
    try {
        const query = cache(async () =>
            await db
                .select()
                .from(items)
                .where(eq(items.organisationId, organisation.organisationId))
                .all(),
        [ITEMS_DB_CACHE_TAG],
        {
            tags: [ITEMS_DB_CACHE_TAG]
        });
        
        fetchedItems = await query();

        if (!fetchedItems) {
            return [];
        }

        // Convert the 'due' property from string to Date
        const convertedResult: PlannerItem[] = fetchedItems.map(item => ({
            ...item,
            due: new Date(item.due)
        }));

        return convertedResult;
    } catch (e) {
        throw new Error("Failed to fetch planned items");
    }
};

export const deletePlannedItem = async (id: string) => {
    const session = await authorizeUser("planner");

    // confirm the item belongs to this user
    let fetchedItem;
    try {
        fetchedItem = await db
            .select()
            .from(items)
            .where(eq(items.id, id))
            .all();
    } catch (e) {
        throw new Error("Failed to fetch item from the database");
    }

    if (!fetchedItem || fetchedItem.length === 0) {
        throw new Error("Item not found");
    }

    if (fetchedItem[0].createdBy !== session.user?.id) {
        throw new Error("Item does not belong to this user");
    }

    try {
        await db.delete(items).where(eq(items.id, id)).execute();
    } catch (e) {
        throw new Error("Failed to delete item from the database");
    }

    revalidateTag(ITEMS_DB_CACHE_TAG);
};
