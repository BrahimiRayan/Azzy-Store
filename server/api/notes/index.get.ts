import { eq } from "drizzle-orm";
import { auth } from "~/lib/auth"
import { db } from "~/lib/db";
import { notesTable } from "~/lib/db/schema";

export default defineEventHandler(async (event)=>{
    const session = await auth.api.getSession({
        headers : event.headers
    })

    if(!session || !session.user){
        throw createError({
            statusCode : 404,
            statusMessage : 'Shop not found.'
        });
    }

    try{
        const notes = await db.query.notesTable.findMany({
            orderBy : (notesTable , {desc, asc})=> [desc(notesTable.date), asc(notesTable.type)] ,
            with : {
                owner : {
                    columns : {
                         image : true ,
                         name : true ,
                    }
                }
            } ,
            where : eq(notesTable.idShop , session.user.shopId)
        })

        return {
           notes
        }
    }catch(error){
        throw new Error("Couldn't fetch notes ");
    }
})