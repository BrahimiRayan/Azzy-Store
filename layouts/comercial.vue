<template>
 
<nav class="sticky top-0 z-1000  bg-[var(--deep-dark-blue)]/80 backdrop-blur-md border-b border-white/10">
      <div class="max-w-7xl mx-auto px-6 py-4 ">

        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <NuxtLink to="/">
                <img src="../assets/pics/Logo-dark.webp" alt="Azzy-Store" class="w-10 h-10 rounded-lg" />
            </NuxtLink>
            <span class="text-xl font-bold text-green-500">AzzyStore</span>
            <span class="text-[8px] text-red-400/80 font-bold mt-4 -ml-2">Beta v0.1</span>
          </div>
          

          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink href="/#features" class="text-white/80 hover:text-green-500 transition-colors duration-300">Fonctionnalités</NuxtLink>
            <NuxtLink href="/#how-it-works" class="text-white/80 hover:text-green-500 transition-colors duration-300">Comment ça marche</NuxtLink>
            <NuxtLink href="/#pricing" class="text-white/80 hover:text-green-500 transition-colors duration-300">Tarifs</NuxtLink>

        <div class="flex items-center gap-3">
        <div v-if="session.data">
         <NuxtLink  to="/dashboard" class="bg-green-600 px-2 py-1 rounded-xl text-xs text-white font-extrabold flex items-center justify-center gap-2">
                <UAvatar :alt="session.data.user.name" size="xs" class="bg-green-800"/>
                <span> Dashboard</span>
        </NuxtLink >
         
        </div>
        
        <div v-else>
               
          <NuxtLink  to="/signUp" class="bg-green-500 px-2 py-1 rounded-xl text-sm text-black hover:text-white/90 border border-transparent hover:border-white/90 transition-all duration-400 ease-in-out">
                Inscrire
          </NuxtLink >
          
          <NuxtLink  to="/signIn" class="text-green-500 rounded-xl border px-2 py-1 text-sm font-extrabold ml-3 hover:bg-gradient-to-r from-green-500 to-green-700 hover:text-white/90 transition-all duration-400 ease-in-out">
                Se connecter
          </NuxtLink >
        </div>
      </div>
          </div>

          <!-- Mobile Menu Button -->
          <button @click="toggleMenu" class="md:hidden text-white/80">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div v-if="isMenuOpen" class="md:hidden mt-4 space-y-4 pb-4">
            <NuxtLink href="/#features" class="block text-white/80 hover:text-green-500 hover:translate-x-2 transition-all duration-300">Fonctionnalités</NuxtLink>
            <NuxtLink href="/#how-it-works" class="block text-white/80 hover:text-green-500 hover:translate-x-2 transition-all duration-300">Comment ça marche</NuxtLink>
            <NuxtLink href="/#pricing" class="block text-white/80 hover:text-green-500 hover:translate-x-2 transition-all duration-300">Tarifs</NuxtLink>

       
        <div class="flex items-center gap-3">
        <div v-if="session.data">
         <NuxtLink  to="/dashboard" class="bg-green-600 px-2 py-1 rounded-xl text-xs text-white font-extrabold flex items-center justify-center gap-2">
                <UAvatar :alt="session.data.user.name" size="xs" class="bg-green-800"/>
                <span> Dashboard</span>
        </NuxtLink >
         
        </div>
        
        <div v-else >
               
          <NuxtLink  to="/signUp" class="bg-green-500 px-2 py-1 rounded-xl text-sm text-black hover:text-white/90 border border-transparent hover:border-white/90 transition-all duration-400 ease-in-out">
                Inscrire
          </NuxtLink >
          
          <NuxtLink  to="/signIn" class="text-green-500 rounded-xl border px-2 py-1 text-sm font-extrabold ml-3 hover:bg-gradient-to-r from-green-500 to-green-700 hover:text-white/90 transition-all duration-400 ease-in-out">
                Se connecter
          </NuxtLink >
        </div>
      </div>
        </div>
      </div>
    </nav>
        <slot />

    <footer class="border-t border-white/10 py-12">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div class="flex items-center space-x-3 mb-4">
              <img src="../assets/pics/Logo-dark.webp" alt="Azzy-Store" class="w-8 h-8 rounded" />
              <span class="text-lg font-bold text-green-500">AzzyStore</span>
            </div>
            <p class="text-white/60 text-sm">
              L'outil de gestion complet pour les petites businesses qui veulent grandir.
            </p>
          </div>
          
          <div>
            <h4 class="text-white font-semibold mb-4">Produit</h4>
            <div class="space-y-2 text-sm text-white/60">
              <a href="#" class="block hover:text-green-500 transition-colors duration-300">Fonctionnalités</a>
              <a href="#" class="block hover:text-green-500 transition-colors duration-300">Tarifs</a>
              <a href="#" class="block hover:text-green-500 transition-colors duration-300">API</a>
            </div>
          </div>
          
          <div>
            <h4 class="text-white font-semibold mb-4">Support</h4>
            <div class="space-y-2 text-sm text-white/60">
              <a href="#" class="block hover:text-green-500 transition-colors duration-300">Centre d'aide</a>
              <a href="#" class="block hover:text-green-500 transition-colors duration-300">Contact</a>
              <a href="#" class="block hover:text-green-500 transition-colors duration-300">Status</a>
            </div>
          </div>
          
          <div>
            <h4 class="text-white font-semibold mb-4">Entreprise</h4>
            <div class="space-y-2 text-sm text-white/60">
              <a href="#" class="block hover:text-green-500 transition-colors duration-300">À propos</a>
              <a href="#" class="block hover:text-green-500 transition-colors duration-300">Blog</a>
              <a href="#" class="block hover:text-green-500 transition-colors duration-300">Carrières</a>
            </div>
          </div>
        </div>
        
        <div class="pt-8 border-t border-white/10 text-center text-white/40 text-sm">
          &copy; 2024 AzzyStore. Tous droits réservés. | 
          <a href="#" class="hover:text-green-500 transition-colors duration-300">Mentions légales</a> | 
          <a href="#" class="hover:text-green-500 transition-colors duration-300">Confidentialité</a>
        </div>
      </div>
    </footer>
</template>

<script setup lang='ts'>
import { authClient } from '~/lib/auth/auth-client';
const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
const session = authClient.useSession()
</script>