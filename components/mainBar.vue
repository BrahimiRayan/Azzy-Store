<template>
    <nav class="sticky z-50 top-0 h-[64px] bg-[var(--deep-dark-blue)] border-b border-white/10 flex items-center text-primary justify-between w-full mx-auto py-2 px-5">
      <div class="flex gap-8">
        <UButton 
          :class="['bg-transparent text-secondary hover:shadow-sm hover:-translate-x-1 shadow-green-500 font-extrabold h-8 w-8 flex items-center justify-center my-auto transition-all duration-300 ease-in-out']" 
          color="neutral" 
          variant="subtle" 
          icon="i-eva-menu-arrow-outline"
          @click="toggleDrawer"
          
        />
        <NuxtLink to="/">
          <div class="w-[62px] h-[62px]">
              <img src="../assets/pics/Logo-dark.webp" class="w-full h-full" alt="">
              <!-- <img src="../assets/pics/Logo-light.webp" class="w-full h-full" alt=""> -->
        </div>
        </NuxtLink>

      </div>
      
      <ul class="flex items-center gap-8 relative">
        <li>
          <USlideover
           title="🔔 Mes notes "
           description="Ajouter, supprimer et voir les notes définies par les employés du magasin"
           icon="i-lucide-bell"
           :ui="{
                overlay: 'bg-black/50',
                content: 'bg-[var(--deep-dark-blue)] text-[var(--creamy-white)]',
                description : 'hidden', 
                close : 'bg-red-600 hover:bg-red-700'
            }"
           >    
            <UButton :class="['h-8 w-8 flex hover:shadow-sm hover:-translate-y-1 shadow-green-500 justify-center bg-transparent text-[var(--green-grace)] transition-all duration-300 ease-in-out']" icon="i-lucide-mail" color="neutral" variant="subtle" />
            <template #body>
              <NontificationNoteCard />
            </template>
          </USlideover>
        </li>

        <li>
          <button @click="showBox = !showBox" class="cursor-pointer">
            <UAvatar :alt="showBox ? 'X' : session.data?.user.name "
              class=" hover:shadow-md hover:scale-130  transition-all duration-300 ease-in-out" 
              :class="showBox ? 'bg-red-600 text-white shadow-red-500' : 'text-[var(--deep-dark-blue)] bg-[var(--green-grace)] shadow-green-500'"
              :ui="{
              fallback : 'font-extrabold'
              }"
            />
          </button>

          <div v-if="showBox" 
               class="absolute top-10 right-0 bg-[var(--deep-dark-blue)] border border-white/10 rounded-lg shadow-lg p-4 z-50 min-w-48"
               @click.stop>
            <div class="flex flex-col gap-2">
              <p class="text-sm text-gray-400">{{ session.data?.user.name }}</p>
              <p class="text-xs text-gray-500">{{ session.data?.user.email }}</p>
              <hr class="border-white/10">
              <button class="text-left text-sm hover:text-green-400 transition-colors">
                Profil
              </button>
              <NuxtLink to="/logOut" >
              <button class="text-left w-full text-sm hover:text-red-400 transition-colors">
                 Déconnexion
                </button>
              </NuxtLink>
            </div>
          </div>

        </li>
      </ul>
    </nav>
  </template>
  
  <script setup lang="ts">
import { authClient } from '~/lib/auth/auth-client';

const showBox =ref<boolean>(false);
  // props and emits
  const props = defineProps({
    isOpen: Boolean
  });

  const session = authClient.useSession();
  
  const emit = defineEmits(['update-open']);

  const toggleDrawer = () => {
    emit('update-open', !props.isOpen);
  };

  
  </script>

