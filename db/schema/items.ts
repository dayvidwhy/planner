import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { organisations } from "./organisations";
import { users } from "./users";

export const items = sqliteTable("item", {
    createdBy: text("createdBy").notNull().references(() => users.id),
    id: text("id").notNull().primaryKey(),
    summary: text("summary").notNull(),
    description: text("description").notNull(),
    due: text("due").notNull(),
    organisationId: text("organisationId").notNull().references(() => organisations.id),
});
