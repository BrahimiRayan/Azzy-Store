import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { shopsTable } from "~/lib/db/schema";

export default defineEventHandler(async (event )=>{
    const idOwner = getRouterParam(event , 'id');
    if(!idOwner){
        throw createError({
            statusCode: 400,
            statusMessage : ''
        });
    }

    try {
        const userShop = await db.query.shopsTable.findFirst({
            where : eq(shopsTable.idOwner , idOwner),
        })

        console.log(userShop)
        return {
            shop : userShop
        }
    } catch (error) {
        
    }
})