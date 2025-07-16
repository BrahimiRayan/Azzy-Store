import { UpdateShopConfig } from "~/lib/db/queries";

export default defineEventHandler(async (event)=>{
    const body = await readBody(event);

    if(!body) {
        throw new Error("Error, No data recieved!");
    }
    const {shopConfig} = body

    const {id , name, description , products , Livrison , cardtype , bgColor , textcolor ,
        fb_url , ig_url , phoneNumber , email , address , isMap , xcor ,ycor
    } = shopConfig
    try {
        await UpdateShopConfig(id,name , description , products , Livrison , cardtype , bgColor , textcolor , fb_url , ig_url , phoneNumber , email , address , isMap , xcor , ycor);
        return {
            success : "200ok"
        }
    } catch (error) {
        throw error
    }

})