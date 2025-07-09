import { auth } from "~/lib/auth"
import { getOrderProductsByShopid } from "~/lib/db/queries";

export default defineEventHandler(async(event)=>{
    const session = await auth.api.getSession({
        headers : event.headers
    });

    if(!session || !session.user){
        throw new Error("Not authaurized .")
    }

    try {
        const orderprods = await getOrderProductsByShopid(session.user.shopId);
        
        return{
            orderprods
        }
    } catch (error) {
        throw new Error("Internal server problem.")
    }
})