import { getTransactionsByYear } from "~/lib/db/queries";
import { SHOPID } from "~/types/GeneraleT";

export default defineEventHandler (async (envent)=>{

    //TODO: get the year some how ... 
    const YEAR = 2025 ;
    const Sales = await getTransactionsByYear("V", YEAR , SHOPID);

    return {
        sales : Sales, 
    }
})

// this endpoint will get me the selles for each month for a year and a shop.