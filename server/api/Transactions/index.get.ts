import { auth } from "~/lib/auth"
import { getAllshopTransactions } from "~/lib/db/queries";

export default defineEventHandler(async(event)=>{
    const session = await auth.api.getSession({
        headers : event.headers
    });

    if(!session || !session.user || !session.user.shopId){
        throw new Error("No shop id found.")
    }

    try {
        const transactions = await getAllshopTransactions(session.user.shopId);

        return {
            transactions
        }
    } catch (error) {
        throw error
    }

})