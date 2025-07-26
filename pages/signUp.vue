<template>
  <div class="fixed inset-0 bg-gradient-to-br from-emerald-900 to-blue-900 -z-10"></div>
  <div class="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden my-3 shadow-2xl/30 shadow-white max-w-6xl mx-auto min-h-screen">
   
    <div class="flex items-center justify-center p-6 lg:p-12 bg-gradient-to-br from-slate-900/80 to-slate-800/80 order-last lg:order-first">
      <div class="backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl shadow-black/30 p-8 w-full max-w-md transition-all duration-300 ease-in-out hover:shadow-white/40 border border-white/10">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-white mb-2">Créer un compte</h1>
          <p class="text-white/70">Commencez votre voyage avec nous</p>
        </div>
        
        <form @submit.prevent="handleSignUp" class="space-y-5">
          <div>
            <label for="name" class="block text-sm font-medium text-white/80 mb-1.5">Nom d'utilisateur <span class="text-rose-400">*</span></label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UIcon name="i-heroicons-user" class="text-gray-400" />
              </div>
              <input
                v-model="form.name"
                type="text"
                id="name"
                minlength="2"
                autocomplete="off"
                autofocus
                placeholder="John Doe"
                required
                class="pl-10 mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
              >
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-white/80 mb-1.5">Email <span class="text-rose-400">*</span></label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UIcon name="i-heroicons-envelope" class="text-gray-400" />
              </div>
              <input
                v-model="form.email"
                type="email"
                id="email"
                autocomplete="off"
                placeholder="john.doe@example.com"
                minlength="6"
                required
                class="pl-10 mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
              >
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-white/80 mb-1.5">Mot de passe <span class="text-rose-400">*</span></label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UIcon name="i-heroicons-lock-closed" class="text-gray-400" />
              </div>
              <input
                v-model="form.password"
                type="password"
                id="password"
                autocomplete="off"
                required
                placeholder="••••••••"
                minlength="8"
                class="pl-10 mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
              >
            </div>
            <p class="mt-1 text-xs text-white/50">Minimum 8 caractères</p>
          </div>

          <div class="pt-2">
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-md font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-all duration-300 group"
            >
              <span v-if="!loading" class="flex items-center">
                S'inscrire
                <UIcon name="i-heroicons-arrow-right-20-solid" class="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
              </span>
              <span v-else class="flex items-center">
                <UIcon name="i-heroicons-arrow-path-20-solid" class="animate-spin mr-2" />
                Création en cours...
              </span>
            </button>
          </div>
        </form>

        <div class="mt-6 pt-6 border-t border-white/10">
          <p class="text-center text-sm text-white/60">
            En créant un compte, vous acceptez nos <br>
            <a href="#" class="text-emerald-400 hover:underline">Conditions d'utilisation</a> et notre <a href="#" class="text-emerald-400 hover:underline">Politique de confidentialité</a>.
          </p>
        </div>
      </div>
    </div>

    <!-- Right Column - Welcome Section -->
    <div class="border-b-2 lg:border-r-0 lg:border-b-0 border-white/20 bg-gradient-to-bl from-emerald-700/90 to-emerald-900/90 flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
      <!-- Decorative elements -->
      <div class="absolute -top-20 -right-20 w-40 h-40 bg-emerald-400/10 rounded-full filter blur-xl"></div>
      <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-400/10 rounded-full filter blur-xl"></div>
      
      <div class="text-white text-center p-8 backdrop-blur-sm bg-black/20 rounded-2xl shadow-lg w-full max-w-md relative z-10">
        <div v-if="error" class="bg-rose-600/90 text-white rounded-xl p-3 mb-6 flex items-start gap-2 animate-fade-in">
          <UIcon name="i-material-symbols-warning" class="text-xl mt-0.5" />
          <span class="text-sm font-medium">
            Les champs sont invalides ou Email est déjà utilisés, veuillez réessayer.
          </span>
        </div>
        
        <div class="mb-6">
          <div class="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-400/30">
            <UIcon name="i-heroicons-user-plus" class="text-4xl text-emerald-300" />
          </div>
          <h2 class="text-4xl font-bold tracking-tight mb-3">Bienvenue</h2>
          <p class="text-lg text-white/90">Créez votre compte pour accéder à toutes nos fonctionnalités exclusives.</p>
        </div>
        
        <div class="space-y-4">
          
          <NuxtLink 
            to="/signIn" 
            class="inline-flex items-center justify-center rounded-xl py-3 px-6 bg-white/10 hover:bg-white/20 text-white font-medium shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 mt-6 border border-white/20"
          >
            Déjà inscrit ? Se connecter
            <UIcon name="i-heroicons-arrow-right-20-solid" class="ml-2 text-sm" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

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
const toast = useToast()
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

    if (!data?.user || !data.user.id) {
    toast.add({
      title: 'Echéc',
      description: 'Produit ajouté avec succès',
      color: 'error',
      icon: 'lucide-alert-triangle',
      ui: {
        root: 'bg-gray-800 rounded-lg p-4',
        progress : 'text-red-500'
      },
      });
      throw new Error("User creation failed");
    }

    if(!data.user.emailVerified){
    toast.add({
            title: 'Succès',
            description: "Compte créé avec succès. Veuillez vérifier votre email pour confirmer votre inscription.",
            color: 'success',
            icon: 'lucide-check-circle',
            ui: {
              root: 'bg-gray-800 rounded-lg p-4',
              progress : 'text-green-500'
            },
        });
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
    return await navigateTo('/verify-creation'); 
  } catch (err : any) {
    error.value = err.message || "Signup failed";
    console.error("Signup error:", err);
  } finally {
    loading.value = false;
  }
}
</script>
