import { getAllOwners } from "~/lib/db/quieries/test"

export default defineEventHandler(async (event) => {
    const owners = await getAllOwners() ;
    return {
      owners : owners
  }
})

