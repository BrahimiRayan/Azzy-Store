import { getAllProducts } from "~/lib/db/queries";

export default defineEventHandler(async (event)=>{

    const products = await getAllProducts("57c04eba-fcb2-493e-9879-6255b2337d28");
    return {
        products: products
    }
});