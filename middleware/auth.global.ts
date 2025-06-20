import { authClient } from "~/lib/auth/auth-client";

export default defineNuxtRouteMiddleware(async (to) => {
  const publicRoutes = ['/', '/signUp', '/signIn'];
  
  try {
    const { data: session } = await authClient.useSession(useFetch);
    
    if (publicRoutes.includes(to.path)) return;
    
    if (!session.value) {
      return navigateTo('/');
    }
    
  } catch (error) {
    console.error('Auth middleware error:', error);
    return navigateTo('/auth-error');
  }
});