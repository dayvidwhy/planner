"use server";

import { db } from "@/db";
import { items } from "@/db/schema/items";

import { generateGUID } from "@/lib/utils";

import type { PlannerItem } from "@/app/components/planner-form";

export const createPlannedItem = async ({ summary, description, due}: PlannerItem) => {
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

export const getPlannedItems = async (): Promise<PlannerItem[]> => {
    console.log("Attempting to get items");

    try {
        const result = await db.select().from(items).all();

        if (!result) {
            return [];
        }

        // Convert the 'due' property from string to Date
        const convertedResult: PlannerItem[] = result.map(item => ({
            ...item,
            due: new Date(item.due)
        }));

        console.log(convertedResult);
        console.log("Successfully got items", convertedResult);
        return convertedResult;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch items from the database");
    }
};
