import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";

export const { handlers, auth } = NextAuth({
    providers: [GitHub],
    adapter: DrizzleAdapter(db)
});
