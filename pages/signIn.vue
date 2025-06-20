<template>
  <div class="min-h-screen flex items-center justify-center ">
    <div class="bg-white/10 p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Sign In</h1>
      
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
          <label for="password" class="block text-sm font-medium ">Password</label>
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
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            >
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
          </div>

          <div class="text-sm">
            <NuxtLink to="/forgot-password" class="font-medium text-blue-600 hover:text-blue-500">Forgot password?</NuxtLink>
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

        <div v-if="errorSignin" class="text-red-500 text-sm mt-2 text-center">
          {{ errorSignin }}
        </div>
      </form>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

      </div>

      <div class="mt-4 text-center">
        <p class="text-sm text-gray-600">
          Don't have an account?
          <NuxtLink to="/signUp" class="font-medium text-blue-600 hover:text-blue-500">Sign up</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { hash } from 'bcryptjs';
import { authClient } from '~/lib/auth/auth-client';
import IsValidateSignIn from '~/Utils/validations/signInValidator';

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
    return await navigateTo('/dashboard'); // 'return' prevents code continuing

  } catch (err: any) {
    errorSignin.value = err.statusMessage || err.message || 'Login failed';
    console.error('Login error:', err); // Log for debugging
  } finally {
    loading.value = false;
  }
}

</script>
