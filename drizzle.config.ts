import type { Config } from "drizzle-kit";

export default {
    schema: "./db/schema/*",
    driver: "better-sqlite",
    out: "./drizzle",
    dbCredentials: {
        url: "./sqlite.db"
    },
    verbose: true,
    strict: true,
} satisfies Config;
