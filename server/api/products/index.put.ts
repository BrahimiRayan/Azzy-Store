import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { productsTable } from "~/lib/db/schema";


export default defineEventHandler(async (event)=>{
   const data = await readBody(event);
    if(!data){
        throw new Error("No data recieved !")
    }
    const {id , name , pua , puv , qte} = data;

    try{
       await db.update(productsTable).set({name, pua , puv , qte}).where(eq(productsTable.id , id))

       return {
            success : true
       }
    }catch(error){

    }

})