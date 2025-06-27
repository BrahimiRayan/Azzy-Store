import { auth } from "~/lib/auth";
import { getAllProducts } from "~/lib/db/queries";

export default defineEventHandler(async (event)=>{
    const session = await auth.api.getSession({
      headers: event.headers
    });

    if(!session){
        return
    }
    const products = await getAllProducts(session.user.shopId);
    return {
        products: products
    }
});