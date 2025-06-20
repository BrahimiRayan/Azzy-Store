import { createUserShopOnSignUp } from "~/lib/db/queries";

export default defineEventHandler(async (event )=>{
    const body = await readBody(event);
    if(!body.userId){
        throw createError({ statusCode: 400, message: "userId is required" });
    }

    const {userId} = body;

    try {
        const shop = await createUserShopOnSignUp(userId);
        return shop
    } catch (error) {
        console.error('Error creating product:', error);
        throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        });
    }

})

// crate a user shop when signIn