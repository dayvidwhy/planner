import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const items = sqliteTable("item", {
    id: text("id").notNull().primaryKey(),
    summary: text("summary"),
    description: text("description"),
    due: text("due"),
});
