"use server";

// libs
import { eq } from "drizzle-orm";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { unstable_cache as cache, revalidateTag } from "next/cache";

// local libs
import { db } from "@/db";
import { items } from "@/db/schema/items";
import { users } from "@/db/schema/users";
import { auth } from "@/app/auth";
import { generateGUID } from "@/lib/guid";
import type { PlannerItem } from "@/app/planner/planner-form";

const ITEMS_DB_CACHE_TAG = "planner-items";

// confirm user is logged in and has a session
const authorizeUser = async () => {
    const session: Session | null = await auth();

    // if not signed in redirect to sign in page then back here
    if (!session?.user) {
        redirect("/api/auth/signin?callbackUrl=/planner");
    }

    return session;
};

// inserts a planned item into the database
export const createPlannedItem = async ({ summary, description, due}: PlannerItem) => {
    const session = await authorizeUser();

    try {
        await db.insert(items).values({
            createdBy: session.user?.id as string,
            id: generateGUID(),
            summary,
            description,
            due: due.toISOString()
        });
    } catch (e) {
        console.error(e);
    }

    revalidateTag(ITEMS_DB_CACHE_TAG);
};

// fetches planned items from the database
export const getPlannedItems = async (): Promise<PlannerItem[]> => {
    const session = await authorizeUser();

    let fetchedUser: any;
    try {
        const dbQuery = await db
            .select()
            .from(users)
            .where(eq(users.email, session.user?.email as string))
            .limit(1);
        fetchedUser = dbQuery[0];
    } catch (e) {
        throw new Error("Failed to fetch items from the database");
    }

    if (!fetchedUser) {
        return [];
    }

    // get the items for the user
    let fetchedItems;
    try {
        const query = cache(async () =>
            await db
                .select()
                .from(items)
                .where(eq(items.createdBy, fetchedUser.id))
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
        throw new Error("Failed to fetch items from the database");
    }
};

export const deletePlannedItem = async (id: string) => {
    const session = await authorizeUser();


    // confirm the item belongs to this user
    let fetchedItem;
    try {
        fetchedItem = await db
            .select()
            .from(items)
            .where(eq(items.id, id))
            .all();
        if (!fetchedItem) {
            throw new Error("Item does not exist");
        }

        if (fetchedItem[0].createdBy !== session.user?.id) {
            throw new Error("Item does not belong to this user");
        }

    } catch (e) {
        throw new Error("Failed to fetch item from the database");
    }

    try {
        await db.delete(items).where(eq(items.id, id)).execute();
    } catch (e) {
        throw new Error("Failed to delete item from the database");
    }

    revalidateTag(ITEMS_DB_CACHE_TAG);
};
