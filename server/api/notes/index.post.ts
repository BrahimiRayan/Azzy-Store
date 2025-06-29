import { auth } from "~/lib/auth";
import { addUserNotes } from "~/lib/db/queries";

export default defineEventHandler(async (event)=>{
  const session = await auth.api.getSession({
    headers : event.headers
  })
  const body = await readBody(event) ;
  if(!body){
    throw new Error("No data recieved");
  }

  if(!session || !session.user){
    throw new Error("Not authaurized to post.")
  }

  const {title , content , type} = body;

  try {
    const {success} = await addUserNotes(session.user.id , session.user.shopId , title , content , type);
    return {
        success
    }
  } catch (error) {
    throw new Error("Error has oucured please try again")
  }
})