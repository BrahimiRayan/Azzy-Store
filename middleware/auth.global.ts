import { authClient } from "~/lib/auth/auth-client";

export default defineNuxtRouteMiddleware(async (to) => {
  const publicRoutes = ['/', '/signUp', '/signIn','/verify-creation' , '/forgot-password' , '/reset-password'];
  const publicPrefixes = ['/boutique']; // paths that start with these are public
  
  try {
    const { data: session } = await authClient.useSession(useFetch);
    
    if (publicRoutes.includes(to.path) || 
        publicPrefixes.some(prefix => to.path.startsWith(prefix))) {
      return;
    }
    
    if (!session.value) {
      return navigateTo('/'); 
    }
    
  } catch (error) {
    console.error('Auth middleware error:', error);
    return navigateTo('/auth-error');
  }
});