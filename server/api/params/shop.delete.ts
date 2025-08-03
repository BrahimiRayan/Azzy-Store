import { eq } from "drizzle-orm";
import { auth } from "~/lib/auth"
import { db } from "~/lib/db";
import { shopConfTable, shopsTable } from "~/lib/db/schema";

export default defineEventHandler(async (event)=>{
    const session = await auth.api.getSession({headers : event.headers});

    if(!session || !session.user){
        throw new Error("No E-shop id found");
    }

    try {
        
        await db.delete(shopConfTable).where(eq(shopConfTable.idShop , session.user.shopId));
        await db.update(shopsTable).set({isOnline : false}).where(eq(shopsTable.id , session.user.shopId));
        return {
            success : '200ok'
        }
    } catch (error) {
        throw error
    }
})