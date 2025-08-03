import { auth } from "~/lib/auth"

export default defineEventHandler(async (event)=>{
    const session = await auth.api.getSession({headers : event.headers});

    if(!session || !session.user){
        throw new Error("No idShop found");
    }
    const idShop = session.user.shopId
    return {
        idShop
    }
})