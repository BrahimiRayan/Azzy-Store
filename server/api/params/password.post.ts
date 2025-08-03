import { auth } from "~/lib/auth";

export default defineEventHandler(async (event)=>{

    const body = await readBody(event);

    if(!body){
        throw new Error("Canno't parse body ")
    }

    const {newPassword , oldpassword} = body

    try {
        await auth.api.changePassword({
            body: {
                newPassword: newPassword ,
                currentPassword: oldpassword, 
                revokeOtherSessions: true,
            },
            headers: event.headers,
        });

        return {
            success : '200ok'
        }        
    } catch (error) {
        throw error
    }


})