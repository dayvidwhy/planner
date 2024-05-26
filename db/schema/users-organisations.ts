import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { InferSelectModel } from "drizzle-orm";
import { organisations } from "./organisations";

/**
 * Junction table for users and organisations.
 */
export const usersOrganisations = sqliteTable("usersOrganisations", {
    userId: text("userId").notNull().references(() => users.id),
    organisationId: text("organisationId").notNull().references(() => organisations.id),
});

export type UsersOrganisationsSchema = InferSelectModel<typeof usersOrganisations>;
