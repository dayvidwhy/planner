"use server";

import { db } from "@/db";
import { items } from "@/db/schema/items";

import { generateGUID } from "@/lib/utils";

export const createPlannedItem = async ({ summary, description, due}) => {
    console.log("Attempting insert with: ", summary, description, due);
    try {
        const result = await db.insert(items).values({
            id: generateGUID(),
            summary,
            description,
            due: due.toISOString()
        });
        console.log("Successfully inserted item", result);
    } catch (e) {
        console.error(e);
    }
};

export const getPlannedItems = async () => {
    console.log("Attempting to get items");

    try {
        const result = await db.select().from(items).all();

        if (!result) {
            return [];
        }
        console.log(result);
        console.log("Successfully got items", result);
        return result;
    } catch (e) {
        console.error(e);
    }
};
