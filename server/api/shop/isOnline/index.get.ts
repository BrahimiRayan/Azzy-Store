import { auth } from "~/lib/auth";
import { getIsShopOnline } from "~/lib/db/queries";

export default defineEventHandler(async (event)=>{
    const session = await auth.api.getSession({headers : event.headers})

    if(!session || !session.user){
        throw new Error("Not authorized ");
    }

    try {
        const isOnline = await getIsShopOnline(session.user.id);
        return {
            res : isOnline
        }
    } catch (error) {
        throw error
    }
})