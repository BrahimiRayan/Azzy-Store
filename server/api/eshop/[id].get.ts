import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { productsTable, shopsTable } from "~/lib/db/schema";

export default defineEventHandler(async (event)=>{
    const id = getRouterParam(event , "id");
    console.log(id)
    if(!id || id.length < 30){
        throw new Error("Shop id is not valide");
    }

    try {
       const config = await db.query.shopsTable.findFirst({
            where : eq(shopsTable.id , id),
            columns : {id : false , idOwner : false , isOnline : false , subcreptionType : false},
            with : {
                shopConf : {
                    columns : {
                        id : false ,
                        idShop : false
                    }
                },
                
            }
        })

        const products = await db.select().from(productsTable).where(eq(productsTable.idShop , id));

        return {
            Shopconfig : config,
            ShopProducts : products
        }
    } catch (error) {
        throw error
    }
})