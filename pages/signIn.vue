<template>
  <div class="fixed inset-0 bg-gradient-to-br from-emerald-900 to-blue-900 -z-10"></div>
  <div class="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden my-3 shadow-2xl/30 shadow-white max-w-6xl mx-auto">
    
    <div class="border-b-2 lg:border-r-2 lg:border-b-0 border-white/20 bg-gradient-to-bl from-emerald-700/90 to-emerald-900/90 flex items-center justify-center p-6 lg:p-12">
      <div class="text-white text-center p-8 backdrop-blur-sm bg-black/20 rounded-2xl shadow-lg w-full max-w-md relative overflow-hidden">
        <!-- Decorative elements -->
        <div class="absolute -top-20 -right-20 w-40 h-40 bg-emerald-400/10 rounded-full filter blur-xl"></div>
        <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-400/10 rounded-full filter blur-xl"></div>
        
        <div v-if="errorSignin" class="bg-rose-600/90 text-white rounded-xl p-3 mb-6 flex items-start gap-2 animate-fade-in">
          <UIcon name="i-material-symbols-warning" class="text-xl mt-0.5" />
          <span class="text-sm font-medium">
            Email ou mot de passe incorrect ! Veuillez réessayer.
          </span>
        </div>
        
        <div class="relative z-10">
          <h1 class="text-4xl font-bold mb-6 tracking-tight">Bon retour&nbsp;!</h1>
          <p class="text-lg mb-6 text-white/90">Veuillez vous connecter pour continuer</p>
          
          <div class="space-y-4">
            <p class="text-white/80">Nouveau ici ?</p>
            <NuxtLink 
              to="/signUp" 
              class="inline-flex items-center justify-center rounded-xl py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
            >
              Créer un compte
              <UIcon name="i-heroicons-arrow-right-20-solid" class="ml-2 text-sm" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    
    <div class="flex items-center justify-center p-6 lg:p-12 bg-gradient-to-br from-slate-900/80 to-slate-800/80">
      <div class="backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl shadow-black/30 p-8 w-full max-w-md transition-all duration-300 ease-in-out hover:shadow-white/40 border border-white/10">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-white mb-2">Connexion</h1>
          <p class="text-white/70">Accédez à votre espace personnel</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-white/80 mb-1.5">Email</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UIcon name="i-heroicons-envelope" class="text-gray-400" />
              </div>
              <input
                v-model="form.email"
                type="email"
                id="email"
                required
                autocomplete="username"
                class="pl-10 mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                placeholder="votre@email.com"
              >
            </div>
          </div>
  
          <div>
            <label for="password" class="block text-sm font-medium text-white/80 mb-1.5">Mot de passe</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UIcon name="i-heroicons-lock-closed" class="text-gray-400" />
              </div>
              <input
                v-model="form.password"
                type="password"
                id="password"
                required
                minlength="8"
                autocomplete="current-password"
                class="pl-10 mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                placeholder="••••••••"
              >
            </div>
          </div>
  
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                v-model="form.rememberMe"
                class="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-white/20 rounded bg-white/5"
              >
              <label for="remember-me" class="ml-2 block text-sm text-white/70">Se souvenir de moi</label>
            </div>
  
            <div class="text-sm">
              <NuxtLink 
                to="/forgot-password" 
                class="font-medium text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
              >
                Mot de passe oublié ?
              </NuxtLink>
            </div>
          </div>
  
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-md font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-all duration-300 group"
          >
            <span v-if="!loading" class="flex items-center">
              Se connecter
              <UIcon name="i-heroicons-arrow-right-20-solid" class="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
            </span>
            <span v-else class="flex items-center">
              <UIcon name="i-heroicons-arrow-path-20-solid" class="animate-spin mr-2" />
              Connexion...
            </span>
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-white/10">
          <p class="text-center text-sm text-white/60">
            En vous connectant, vous acceptez nos <br>
            <a href="#" class="text-emerald-400 hover:underline">Conditions d'utilisation</a> et notre <a href="#" class="text-emerald-400 hover:underline">Politique de confidentialité</a>.
          </p>
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
import IsValidateSignIn from '~/Utils/validations/signInValidator';

definePageMeta({
  layout: 'comercial',
})

const toast = useToast();

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
    },
  {
    onError: (ctx) => {
      // Handle the error
      if (ctx.error.status === 403) {
        toast.add({
          title: 'Echéc',
          description: 'Please verify your email address',
          color: 'error',
          icon: 'lucide-alert-triangle',
          ui: {
            root: 'bg-gray-800 rounded-lg p-4',
            progress : 'text-red-500'
          },
        });
      }else{
        toast.add({
          title: 'Echéc',
          description: ctx.error.message,
          color: 'error',
          icon: 'lucide-alert-triangle',
          ui: {
            root: 'bg-gray-800 rounded-lg p-4',
            progress : 'text-red-500'
          },
        });
      }
    },
  }
  );

    if (error || !data?.user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password'
      });
    }

    
    const shop = await $fetch(`/api/shop/${data.user.id}`);
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
