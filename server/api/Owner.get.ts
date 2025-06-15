import { getAllOwners } from "~/lib/db/queries"

export default defineEventHandler(async (event) => {
    const owners = await getAllOwners() ;
    return {
      owners : owners
  }
})

