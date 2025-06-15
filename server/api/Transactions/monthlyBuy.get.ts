import { getTransactionsByYear } from "~/lib/db/queries";
import { SHOPID } from "~/types/GeneraleT";

export default defineEventHandler (async (envent)=>{

    //TODO: get the year some how ... 
    const YEAR = 2025 ;
    const buyings = await getTransactionsByYear("A", YEAR , SHOPID);

    return {
        depence : buyings, 
    }
})

// this endpoint will get me the buyings for each month for a year and a shop.