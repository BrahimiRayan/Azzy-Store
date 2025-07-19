import { getTransactionsForProduct } from "~/lib/db/queries";

export default defineEventHandler(async(event)=>{
    const prodid = getRouterParam(event , "product");

    if(!prodid) {
        throw new Error("Not authaurized to GET");
    }


    try {
        const data = await getTransactionsForProduct(prodid); 

        return {
            data
        }
    } catch (error) {
        throw error
    }
})