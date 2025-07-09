import { InsertOrderProducts } from "~/lib/db/queries";

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    if(!body){
        throw new Error("Error while receving data");
    }
    const {prodord} = body
    try {
        await InsertOrderProducts(prodord)
        return {
            success:'200ok'
        }
    } catch (error) {
        
    }
})