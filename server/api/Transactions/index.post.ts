import { auth } from "~/lib/auth"
import { db } from "~/lib/db"
import { transactionsTable } from "~/lib/db/schema"

export default defineEventHandler(async(event)=>{
    const session = await auth.api.getSession({
        headers : event.headers
    })

    const body = await readBody(event);

    if(!session || !body){
        return
    }

    const {productId , quantity , pua , puv , type } = body
    try{
        await db.insert(transactionsTable).values({
            idProduct : productId,
            idShop : session.user.shopId,
            pua_t : pua , 
            puv_t : puv,
            qte : quantity,
            type 
        });

       return {
        success : '200ok'
       } 
    }catch(error){
        throw new Error("problem has auccured")
    }
})