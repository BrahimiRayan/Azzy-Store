import { auth } from "~/lib/auth"
import { getConfigByShopid } from "~/lib/db/queries";

export default defineEventHandler(async (event) =>{
    const session = await auth.api.getSession({headers : event.headers});
    if(!session){
        throw new Error("Not authorized");
    }

    try {
        const [conf] = await getConfigByShopid(session.user.shopId);
        return{
            conf
        }
    } catch (error) {
        throw error
    }
})