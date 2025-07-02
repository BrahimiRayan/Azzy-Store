import { auth } from "~/lib/auth"
import { DeleteAllNotesByShopId } from "~/lib/db/queries";

export default defineEventHandler(async (event)=>{
    const session = await auth.api.getSession({
        headers : event.headers
    });

    if(!session || !session.user){
        throw new Error("Not authaurized to DELETE.");
    }

    const idShop = session.user.shopId ;

    try {
        await DeleteAllNotesByShopId(idShop);
        return {
            success : 'success'
        }
    } catch (error) {
        throw error
    }
})