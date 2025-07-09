import { auth } from "~/lib/auth"
import { getMonthlyOrdersByShopid } from "~/lib/db/queries";

export default defineEventHandler(async (event )=>{
    const session = await auth.api.getSession({
        headers : event.headers
    });

    if(!session || !session.user){
        throw new Error("Unauthaurized");
    }

    try {
        const monthlyorders = await getMonthlyOrdersByShopid(session.user.shopId);
        return {
            monthlyorders
        }
    } catch (error) {
        
    }
})