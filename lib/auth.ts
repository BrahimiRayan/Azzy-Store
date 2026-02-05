import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { sendVerificationEmail , sendForForgotPassword } from "~/Utils/emailSender";



export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,

  trustedOrigins: [
    "http://localhost:3000",
    "https://azzy-store.vercel.app",
  ],
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
        minPasswordLength : 8,  
        sendResetPassword : async ( { user, url, token }, request) => {
          await sendForForgotPassword({
            to: user.email,
            subject: "Reset your password",
            text: `Click the link to reset your password: ${url}`,
            url : url
          });
        }
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
    sendOnSignUp : true,
    expiresIn : 60 * 30
  },
    advanced:{
        // generateId : true
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
      , 
      deleteUser : {
        enabled : true,
      }
    }
});

