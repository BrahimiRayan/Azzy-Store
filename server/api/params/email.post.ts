import { eq } from "drizzle-orm";
import { auth } from "~/lib/auth"
import { db } from "~/lib/db";
import { user } from "~/lib/db/schema";

export default defineEventHandler(async (event)=>{
    const session = await auth.api.getSession({headers : event.headers});
    const body = await readBody(event);

    if(!session || !session.user.id || !body){
        throw new Error("C'annot Update name , no id provided");
    }

    const {email} = body;
    try {
        await db.update(user).set({email : email , emailVerified : false}).where(eq(user.id , session.user.id));
        return {
            success : '200ok'
        }
    } catch (error) {
        throw error
    }
})