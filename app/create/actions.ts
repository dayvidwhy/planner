import { redirect } from "next/navigation";
import { usersOrganisations } from "@/db/schema/users-organisations";
import { authorizeUser } from "@/app/shared-actions";
import { db } from "@/db";
import { organisations } from "@/db/schema/organisations";
import { organisationSchema, type OrganisationSchema } from "@/lib/validators";

export const createOrganisation = async ({ name, description }: OrganisationSchema) => {
    const session = await authorizeUser("create");
    if (!session?.user?.id) {
        throw new Error("User not found");
    }

    const parseResult = organisationSchema.safeParse({ name, description });
    if (!parseResult.success) {
        throw new Error("Invalid form data");
    }

    const organisationId = crypto.randomUUID();
    try {
        await db.insert(organisations).values({
            createdBy: session.user.id,
            id: organisationId,
            owner: session.user.id,
            name: parseResult.data.name,
            description: parseResult.data.description
        });
    } catch (e) {
        throw new Error("Internal server error.");
    };

    // add the relaton to the junction table
    try {
        await db.insert(usersOrganisations).values({
            userId: session.user.id,
            organisationId
        });
    } catch (e) {
        throw new Error("Internal server error.");
    };

    redirect("/planner");
};
