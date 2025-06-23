import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
 
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
         
    }),
    emailAndPassword: {
        enabled : true,
    },
    advanced:{
        generateId : false
    },
    user : {
        additionalFields : {
           shopId : {
             type : "string",
             require : true,
             input : false,
             defaultValue : null
           }
        }
    }
});

