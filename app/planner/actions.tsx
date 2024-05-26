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
import type { PlannerItem } from "@/lib/validators";
import { formSchema } from "@/lib/validators";

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
    const parseResult = formSchema.safeParse({ summary, description, due });
    if (!parseResult.success) {
        throw new Error("Invalid form data");
    }

    try {
        await db.insert(items).values({
            createdBy: session.user?.id as string,
            id: crypto.randomUUID(),
            summary: parseResult.data.summary,
            description: parseResult.data.description,
            due: parseResult.data.due.toISOString()
        });
    } catch (e) {
        throw new Error("Internal server error.");
    }

    revalidateTag(ITEMS_DB_CACHE_TAG);
};

// fetches planned items from the database
export const getPlannedItems = async (): Promise<PlannerItem[]> => {
    const session = await authorizeUser();

    if (!session.user?.email) {
        throw new Error("User email not found");
    }

    let fetchedUser;
    try {
        const dbQuery = await db
            .select()
            .from(users)
            .where(eq(users.email, session.user.email))
            .limit(1);
        fetchedUser = dbQuery[0];
    } catch (e) {
        throw new Error("Failed to fetch items");
    }

    if (!fetchedUser) {
        throw new Error("User not found");
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
        throw new Error("Failed to fetch planned items");
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
