import { getProductByid } from "~/lib/db/queries";

export default defineEventHandler(async (event)=>{
    const id = getRouterParam(event , "product");
    if(!id) {
        throw new Error("Must passe an id !")
    }
    const product = await getProductByid(id);

    if(product === undefined || product === null){
        throw createError({
            statusCode : 404,
            statusMessage : "Products not found ..."
        })
    }

    return {
        product : product
    }
})