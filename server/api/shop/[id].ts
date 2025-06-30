import { getUserShopOnAuth } from "~/lib/db/queries";

export default defineEventHandler(async (event )=>{
    const idOwner = getRouterParam(event , 'id');

    if(!idOwner){
        throw createError({
            statusCode: 400,
            statusMessage : ''
        });
    }

    try {
        const userShop = await getUserShopOnAuth(idOwner);    
        return {
            shop : userShop
        }
    } catch (error) {
        throw error
    }
})