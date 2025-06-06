import { db } from "~/lib/db";
import { usersTable } from "~/lib/db/schema";
// nuxt api
export default defineEventHandler(async (event) => {
    const users = await db.select().from(usersTable);
    return {
    users: users
  }
})

