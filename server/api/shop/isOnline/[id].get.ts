import { getIsShopOnline } from "~/lib/db/queries";

export default defineEventHandler(async (event)=>{
    const id = getRouterParam(event , 'id');

    if(!id){
        throw new Error("Not authorized ");
    }

    try {
        const isOnline = await getIsShopOnline(id);
        return {
            res : isOnline
        }
    } catch (error) {
        throw error
    }
})