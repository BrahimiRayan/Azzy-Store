<template>
  <div class="min-h-screen flex items-center justify-center ">
    <div class="bg-white/10 p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Créer un compte</h1>
      
      <form @submit.prevent="handleSignUp" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium">Nom d'utilisateur</label>
          <input
            v-model="form.name"
            type="text"
            id="name"
            minlength="2"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
        </div>

        <div>
          <label for="email" class="block text-sm font-medium ">Email</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            minlength="6"
            required
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
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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

        <div v-if="error" class="text-red-500 text-sm mt-2">
          {{ error }}
        </div>
      </form>

      <div class="mt-4 text-center">
        <p class="text-sm text-gray-600">
          Vous avez déjà un compte ?
          <NuxtLink to="/signIn" class="text-blue-600 hover:text-blue-500">se connecter</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { authClient } from '~/lib/auth/auth-client';
import { hash } from 'bcryptjs';
import IsValidateSignUp from '../Utils/validations/signUpValidator'
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
    useRouter().push("/dashboard");
  } catch (err : any) {
    error.value = err.message || "Signup failed";
    console.error("Signup error:", err);
  } finally {
    loading.value = false;
  }
}
</script>
