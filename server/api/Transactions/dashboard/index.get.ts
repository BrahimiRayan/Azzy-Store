import { count, eq } from "drizzle-orm";
import { auth } from "~/lib/auth";
import { db } from "~/lib/db";
import { getMvp, getTransactionsForAllProductsInAyear } from "~/lib/db/queries";
import { ordersTable, productsTable } from "~/lib/db/schema";

export default defineEventHandler(async (event)=>{
    
    const session = await auth.api.getSession({headers : event.headers})

    if(!session || !session.user ) { 
        throw new Error("Not authaurized to GET.")
    }

    const idShop = session.user.shopId

    try {
        
        const transactions = await getTransactionsForAllProductsInAyear(idShop);
        const mvp = await getMvp(idShop);
        const [getTotalcommands] = await db.select({
            total : count(ordersTable.id)
        }).from(ordersTable)
          .where(eq(ordersTable.idShop , idShop));
        const getstats = await db.select({
            name : productsTable.name ,
            image : productsTable.image,
            numberInStock : productsTable.qte,

        }).from(productsTable)
        .where(eq(productsTable.idShop, idShop));

        return {
            transactions : transactions,
            stats : getstats ,
            mvp : mvp,
            ordersNumber : getTotalcommands
        }    

    } catch (error) {
        throw error
    }

});
