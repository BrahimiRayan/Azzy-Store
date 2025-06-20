import { createAuthClient } from "better-auth/vue" // make sure to import from better-auth/vue
 
export const authClient = createAuthClient({});

export async function handelLogout(){
    await authClient.signOut();
    return navigateTo("/");
}