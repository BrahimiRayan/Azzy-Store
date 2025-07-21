import { eq } from "drizzle-orm";
import { auth } from "~/lib/auth";
import { db } from "~/lib/db";
import { getMvp, getTransactionsForAllProductsInAyear } from "~/lib/db/queries";
import { productsTable } from "~/lib/db/schema";

export default defineEventHandler(async (event)=>{
    
    const session = await auth.api.getSession({headers : event.headers})

    if(!session || !session.user ) { 
        throw new Error("Not authaurized to GET.")
    }

    const idShop = session.user.shopId

    try {
        
        const transactions = await getTransactionsForAllProductsInAyear(idShop);
        const mvp = await getMvp(idShop);
        const getstats = await db.select({
            name : productsTable.name ,
            image : productsTable.image,
            numberInStock : productsTable.qte,

        }).from(productsTable)
        .where(eq(productsTable.idShop, idShop));

        return {
            transactions : transactions,
            stats : getstats ,
            mvp : mvp
        }    

    } catch (error) {
        throw error
    }

});
