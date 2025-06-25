<template>
  <div class="fixed inset-0 bg-[url('/public/static/br.jpeg')] bg-cover bg-center bg-no-repeat blur-xl -z-10"></div>
  <div class="grid grid-cols-2 rounded-2xl my-3 h-max overflow-hidden shadow-2xl/30 shadow-black">
  
  <div class="min-h-screen flex items-center justify-center bg-blue-800/20">
    <div class="backdrop-blur-md bg-white/5 rounded-lg shadow-sm shadow-black p-8 w-full max-w-md transition-all duration-300 ease-in-out relative">
      <h1 class="text-3xl font-bold mb-6 text-center">Créer un compte</h1>
      
      <form @submit.prevent="handleSignUp" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium">Nom d'utilisateur <span class="text-red-500">*</span></label>
          <input
            v-model="form.name"
            type="text"
            id="name"
            minlength="2"
            autocomplete="off"
            autofocus
            placeholder="John Doe"
            required
            class="placeholder:text-sm placeholder:text-white/60 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
        </div>

        <div>
          <label for="email" class="block text-sm font-medium ">Email <span class="text-red-500">*</span></label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            autocomplete="off"
            placeholder="JohnDoe@gmail.com"
            minlength="6"
            required
            class="placeholder:text-sm placeholder:text-white/60 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
        </div>

        <div>
          <label for="password" class="block text-sm font-medium ">Mot de passe <span class="text-red-500">*</span></label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            autocomplete="off"
            required
            placeholder="********"
            minlength="8"
            class="placeholder:text-sm placeholder:text-white/60 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <span v-if="!loading">Inscrire</span>
          <span v-else>Création d'un compte...</span>
        </button>

      </form>


    </div>
  </div>

  <div class="border-l-2 border-white/40 bg-[url('/public/static/br.jpeg')] bg-cover bg-center bg-no-repeat flex items-center justify-center ">
    <div class="text-white text-center p-8 backdrop-blur-md bg-black/30 rounded-lg shadow-md w-full max-w-md relative">
        
        <div v-if="error" class="bg-red-500 text-white rounded-xl mt-2 ">
          <UIcon name="i-material-symbols-warning" size="30" />
          <span class="text-sm font-semibold mt-2 block text-left px-3 pb-2">
            Les champs sont invalid ou déjà utilisés, veuillez réessayer.
          </span>
        </div>
        
      <div class="bg-[url('/public/static/moneygrow.png')] bg-contain absolute w-30 h-30 -top-20 right-40 z-10"></div>
      <h2 class="text-3xl font-bold mb-4">Bienvenue sur notre plateforme</h2>
      <p class="mb-6">Créez votre compte pour accéder à toutes nos fonctionnalités et commencer à profiter de nos services.</p>
      <NuxtLink to="/signIn" class="block rounded-lg w-max mx-auto p-2 bg-blue-600 hover:bg-blue-700 font-semibold">Déjà inscrit ? Connectez-vous ici</NuxtLink>
    </div>
    
  </div>

  </div>
</template>

<script setup lang="ts">
import { authClient } from '~/lib/auth/auth-client';
import IsValidateSignUp from '../Utils/validations/signUpValidator'
definePageMeta({
  layout: 'comercial',
})
const form = reactive({
  name: '',
  email: '',
  password: ''
});

const loading = ref(false);
const error = ref('');
async function handleSignUp() {
  loading.value = true;
  error.value = '';

  if (!IsValidateSignUp(form)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad request, tous les champs doivent être remplis et valides"
    });
  }

  try {
    // first i Sign up the user
    const { data } = await authClient.signUp.email({
      email: form.email,
      password: form.password,
      name: form.name,
      callbackURL: "/dashboard",
    });

    if (!data?.user?.id) {
      throw new Error("User creation failed");
    }

    // then i'll Create the store after checking 
    const shop = await $fetch('/api/shop/create', { 
      method: 'POST',
      body: {
        userId: data.user.id,
      },
    });
    console.log(shop)
    // 3. Redirect only AFTER store is created
    return await navigateTo('/dashboard'); 
  } catch (err : any) {
    error.value = err.message || "Signup failed";
    console.error("Signup error:", err);
  } finally {
    loading.value = false;
  }
}
</script>
