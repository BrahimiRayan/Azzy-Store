import { auth } from "~/lib/auth"
import { getAllNotesByShop } from "~/lib/db/queries";


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
        const notes = await getAllNotesByShop(session.user.shopId);
        return {
           notes
        }
    }catch(error){
        throw new Error("Couldn't fetch notes ");
    }
})