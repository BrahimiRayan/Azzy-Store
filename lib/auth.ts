import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { sendVerificationEmail } from "~/Utils/emailSender";

 
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    session : {
        
        cookieCache : {
            enabled : true,
            maxAge : 5 * 60
        }
    }
    ,
    emailAndPassword: {
        enabled : true,
        requireEmailVerification: true,
        minPasswordLength : 8
    },
    emailVerification: {
    sendVerificationEmail: async ( { user, url, token }, request) => {
      await sendVerificationEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
        url : url
      });
    },
    autoSignInAfterVerification : true,
    expiresIn : 60 * 30
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

