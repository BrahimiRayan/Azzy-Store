<template>
     <header class="border-b border-white/20 flex justify-between items-center px-2">
        <div class="flex items-center gap-8">
           <div class="w-[62px] h-[62px]">
              <img src="../assets/pics/Logo-dark.webp" class="w-full h-full" alt="">
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
        <p>github link</p>
        <NuxtLink v-if="session.data" to="/dashboard" class="bg-green-500 p-2 rounded-xl text-xs text-black">Mon dashboard ({{ session.data?.user.name }})</NuxtLink >
        
        <NuxtLink v-else to="/signIn" class="bg-green-500 p-2 rounded-xl text-xs text-black">sign in/up</NuxtLink >
      </div>

</header>

        <slot />
</template>

<script setup lang='ts'>
import { authClient } from '~/lib/auth/auth-client';

const session = authClient.useSession()
</script>