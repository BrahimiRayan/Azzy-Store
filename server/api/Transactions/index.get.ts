import { getAllTransactions } from "~/lib/db/queries";
import { SHOPID } from "~/types/GeneraleT";

export default defineEventHandler(async (event)=>{
    const transactions = await getAllTransactions(SHOPID);
    return {
        transactions : transactions,
    }
});

// this endpoint getting all the transactions of a shop ...