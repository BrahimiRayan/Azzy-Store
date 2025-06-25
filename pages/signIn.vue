<template>
  <div class="fixed inset-0 bg-[url('/public/static/br.jpeg')] bg-cover bg-center bg-no-repeat blur-xl -z-10"></div>
  <div class="grid grid-cols-2 rounded-2xl overflow-hidden my-3 shadow-2xl/30 shadow-black">

    <div class="border-r-2 border-white/40 bg-[url('/public/static/br.jpeg')] bg-cover bg-center bg-no-repeat flex items-center justify-center ">
      <div class="text-white text-center p-8 backdrop-blur-md bg-black/30 rounded-lg shadow-md w-full max-w-md relative">
        
        <div v-if="errorSignin" class="bg-red-500 text-white rounded-xl mt-2 ">
          <UIcon name="i-material-symbols-warning" size="30" />
          <span class="text-sm font-semibold mt-2 block text-left px-3 pb-2">
            Email ou mot de passe incorrect !, veuillez réessayer.
          </span>
        </div>
        
        <div class="bg-[url('/public/static/portal.png')] bg-cover bg-no-repeat absolute w-30 h-30 -top-20 right-45 z-10"></div>
        <h1 class="text-3xl font-bold mb-6">Bon retour&nbsp;!</h1>
        <p class="text-lg">Veuillez vous connecter pour continuer</p>
        <p class="text-lg ">Si vous n'avez pas de compte, vous pouvez <NuxtLink to="/signUp" class="block rounded-lg py-2 px-4 bg-green-600 w-max mt-2 mx-auto text-white hover:bg-green-700">vous inscrire ici</NuxtLink></p>
      </div>
    </div>

    <div class="min-h-screen flex items-center justify-center bg-blue-800/20">
      <div class="backdrop-blur-md bg-white/5 rounded-lg shadow-sm shadow-black p-8 w-full max-w-md transition-all duration-300 ease-in-out relative">
        <h1 class="text-3xl font-bold mb-6 text-center">Connexion</h1>
        
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium ">Email</label>
            <input
              v-model="form.email"
              type="email"
              id="email"
              required
              autocomplete="username"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
  
          <div>
            <label for="password" class="block text-sm font-medium ">Mot de passe</label>
            <input
              v-model="form.password"
              type="password"
              id="password"
              required
              minlength="8"
              autocomplete="current-password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
  
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                v-model="form.rememberMe"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300  rounded"
              >
              <label for="remember-me" class="ml-2 block text-sm text-green-100">Remember me</label>
            </div>
  
            <div class="text-sm">
              <NuxtLink to="/forgot-password" class="font-medium text-white/70 hover:text-white">Forgot password?</NuxtLink>
            </div>
          </div>
  
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <span v-if="!loading">Sign In</span>
            <span v-else>Signing in...</span>
          </button>
  
        </form>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { authClient } from '~/lib/auth/auth-client';
import IsValidateSignIn from '~/Utils/validations/signInValidator';
definePageMeta({
  layout: 'comercial',
})
const form = reactive({
  email: '',
  password: '',
  rememberMe : false
});

const loading = ref(false);
const errorSignin = ref('');
// const rememberMe = ref<boolean>(false);

async function handleLogin() {
  loading.value = true;
  errorSignin.value = '';
  
  try {
    
    if (!IsValidateSignIn(form)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad request: All fields must be filled and valid'
      });
    }

    
    const { data, error } = await authClient.signIn.email({
      email: form.email,
      password: form.password,
      callbackURL: "/dashboard",
      rememberMe: form.rememberMe        
    });

    if (error || !data?.user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password'
      });
    }

    
    const shop = await $fetch(`/api/shop/${data.user.id}`);
    console.log(shop)
    // 4. Redirect to dashboard (using navigateTo)
    return await navigateTo('/dashboard'); 

  } catch (err: any) {
    errorSignin.value = err.statusMessage || err.message || 'Login failed';
    console.error('Login error:', err); // Log for debugging
  } finally {
    loading.value = false;
  }
}

</script>
