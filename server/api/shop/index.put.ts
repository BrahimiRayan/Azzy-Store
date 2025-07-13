import { auth } from "~/lib/auth";
import { SetShopToOnline } from "~/lib/db/queries";

export default defineEventHandler(async(event)=>{
    
    const session = await auth.api.getSession({headers : event.headers});

    if(!session || !session.user){
        throw new Error("Probleme while transfering data.");
    }

    try {
        await SetShopToOnline(session.user.shopId );
        return {
            success : "200ok"
        }
    } catch (error) {
        throw error
    }
    
})