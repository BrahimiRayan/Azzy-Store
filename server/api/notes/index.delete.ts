import { DeleteNoteById } from "~/lib/db/queries";

export default defineEventHandler(async (event)=>{
    const body = await readBody(event);
    if(!body){
        throw new Error("Messing data");
    }
    const {id} = body;

    try{
        await DeleteNoteById(id);
        return {
            success : "success"
        }
    }catch(error){
        throw error
    }

})