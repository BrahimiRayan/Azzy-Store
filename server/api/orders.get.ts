import { auth } from "~/lib/auth";
import { getAllOrders } from "~/lib/db/queries"

export default defineEventHandler(async (event)=>{

    const session = await auth.api.getSession({
        headers : event.headers
    })

    if(!session || !session.user){
        throw createError({
            statusCode : 404,
            statusMessage : 'Shop orders not found.'
        })
    }

    // get alll "commandes"
    const orders = await getAllOrders(session.user.shopId);
    return {
        orders: orders,
    }
})