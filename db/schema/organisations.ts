import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const organisations = sqliteTable("organisation", {
    createdBy: text("createdBy").notNull().references(() => users.id),
    owner: text("owner").notNull().references(() => users.id),
    id: text("id").notNull().primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
});
