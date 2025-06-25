<template>
     <header class="flex justify-between items-center px-2 rounded-b-md border-b border-black/20">
        <div class="flex items-center gap-8">
           <div class="w-[62px] h-[62px]">
               <NuxtLink to="/" class="w-full h-full">
              <img src="../assets/pics/Logo-dark.webp" class="w-full h-full" alt="">
               </NuxtLink>
           </div>

                <ul class="flex items-center gap-3">
                        <NuxtLink >
                        <li>
                                <p>somthing</p>
                        </li>
                        </NuxtLink >

                        <NuxtLink >
                        <li>
                                <p>somthing</p>
                        </li>
                        </NuxtLink >

                        <NuxtLink >
                        <li>
                        <p>somthing</p>
                        </li>
                        </NuxtLink >
                </ul>
   </div>

      <div class="flex items-center gap-3">
        <div v-if="session.data">
         <NuxtLink  to="/dashboard" class="bg-green-600 p-2 rounded-xl text-xs text-white font-extrabold flex items-center justify-center gap-2">
                <UAvatar :alt="session.data.user.name" size="sm" class="bg-green-800"/>
                <span> Dashboard</span>
        </NuxtLink >
         
        </div>
        
        <div v-else>
               
          <NuxtLink  to="/signUp" class="bg-green-500 p-2 rounded-xl text-sm text-black">
                Inscrire
          </NuxtLink >
          
          <NuxtLink  to="/signIn" class="text-green-500 rounded-xl border p-2 text-sm font-extrabold ml-3">
                Se connecter
          </NuxtLink >
        </div>
      </div>

</header>

        <slot />
</template>

<script setup lang='ts'>
import { authClient } from '~/lib/auth/auth-client';

const session = authClient.useSession()
</script>