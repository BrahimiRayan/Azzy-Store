import { auth } from "~/lib/auth"
import { InsertCommandByShopID } from "~/lib/db/queries";

export default defineEventHandler(async (event)=>{
    const session = await auth.api.getSession({
        headers : event.headers
    })

    const body = await readBody(event);

    if(!session || !session.user || !body){
        throw new Error("Messing values , Bad request");
    }

    const {fornisseur} = body;

    try {
        const commands = await InsertCommandByShopID( session.user.shopId , fornisseur);
        return {
            id : commands[0]?.id
        }
    } catch (error) {
        throw new Error("Failed to insert the ORDER ")
    }
})