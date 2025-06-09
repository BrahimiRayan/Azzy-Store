import { db } from "~/lib/db";
import { ownersTable } from "~/lib/db/schema";

// nuxt api
export default defineEventHandler(async (event) => {
    const users = await db.select().from(ownersTable);
    return {
    users: users
  }
})

