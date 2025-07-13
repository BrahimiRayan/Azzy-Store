import { auth } from "~/lib/auth"
import { createShopConfigbyShopid } from "~/lib/db/queries";

export default defineEventHandler(async (event)=>{
    // create a config ... 
    const session = await auth.api.getSession({headers : event.headers});

    if(!session || !session.user){
        throw new Error("Not authorized.")
    }

    try {
         await createShopConfigbyShopid(session.user.shopId);
            
         return {
            state : 'success'
         }
    } catch (error) {
        throw error
    }
})