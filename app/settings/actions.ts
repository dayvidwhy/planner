import { eq } from "drizzle-orm";
import { authorizeUser } from "@/app/shared-actions";

// local libs
import { db } from "@/db";
import { organisations } from "@/db/schema/organisations";
import { usersOrganisations, type UsersOrganisationsSchema } from "@/db/schema/users-organisations";
import { users } from "@/db/schema/users";

// Fetch an organisation's settings from the database
export const getOrganisationSettings = async (organisation: UsersOrganisationsSchema) => {
    const session = await authorizeUser("settings");
    if (!session.user) {
        throw new Error("User not found");
    }

    let organisationSettings;
    try {
        const organisationSettingsQuery = await db
            .select()
            .from(organisations)
            .where(eq(organisations.id, organisation.organisationId));
        organisationSettings = organisationSettingsQuery[0];
    } catch (e) {
        throw new Error("Internal server error.");
    }

    return organisationSettings;
};

// Fetch users associated with an organisation from the database
export const getOrganisationUsers = async (organisation: UsersOrganisationsSchema) => {
    const session = await authorizeUser("settings");
    if (!session.user?.email) {
        throw new Error("User not found");
    }

    // get users associated with the organisation
    let usersAssociatedWithOrganisation;
    try {
        usersAssociatedWithOrganisation = await db
            .select()
            .from(usersOrganisations)
            .where(eq(usersOrganisations.organisationId, organisation.organisationId));
    } catch (e) {
        throw new Error("Internal server error.");
    }

    // pull each users data from the users table
    return await Promise.all(usersAssociatedWithOrganisation.map(async (user) => {
        const userQuery = await db
            .select()
            .from(users)
            .where(eq(users.id, user.userId));
        return userQuery[0];
    }));
};

