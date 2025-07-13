import { updateProduct } from "~/lib/db/queries";

export default defineEventHandler(async (event)=>{
   const data = await readBody(event);
    if(!data){
        throw new Error("No data recieved !");
    }
    const {id , name  , description, pua , puv , qte} = data;

    try{
       await updateProduct(id , name , description, pua , puv , qte);
       return {
            success : true
       }
    }catch(error){
        throw new Error("Internal error")
    }

})