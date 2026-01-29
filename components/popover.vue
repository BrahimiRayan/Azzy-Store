<template>

<UPopover
    v-model:open="showBox"
    :ui="{
        content : 'bg-[var(--deep-dark-blue)] ring-white/30 shadow-lg shadow-black/30 rounded-md p-4 w-48',
        
    }",
    :content="{
        align: 'center',
        side: 'bottom',
    }"
    >
        <button @click="toggleshowBox" label="Open" class="cursor-pointer">
                   <UAvatar :alt="showBox ? 'X' : session.data?.user.name "
                     class=" hover:shadow-md hover:scale-130  transition-all duration-300 ease-in-out" 
                     :class="showBox ? 'bg-red-600 text-white shadow-red-500' : 'text-[var(--deep-dark-blue)] bg-[var(--green-grace)] shadow-green-500'"
                     :ui="{
                     fallback : 'font-extrabold'
                     }"
                   />
           </button>

        <template #content>

            <div class="flex flex-col gap-2">
                <UAvatar 
                    :alt="session.data?.user.name" 
                    :class="'h-16 w-16 mx-auto text-[var(--deep-dark-blue)] bg-[var(--green-grace)] shadow-green-500'"
                    :ui="{
                        fallback : 'font-extrabold text-2xl',
                        
                    }"
                />
                <p class="text-center text-sm text-gray-400">{{ session.data?.user.name }}</p>
                <p class="text-center text-xs text-gray-500">{{ session.data?.user.email }}</p>
                <hr class="border-white/10 mb-3">

                <NuxtLink to="/settings">
                    <button class="flex items-center text-left text-sm hover:text-green-400 transition-colors">
                        <UIcon name="i-lucide-settings-2" class="mr-2" />
                        Paramètre
                    </button>
                </NuxtLink>

                <NuxtLink to="/logOut">
                    <button class="flex items-center text-left w-full text-sm hover:text-red-400 transition-colors">
                        <UIcon name="i-lucide-log-out" class="mr-2" />
                        Déconnexion
                    </button>
                </NuxtLink>
            </div>

        </template>
    </UPopover>

</template>

<script setup lang="ts">
import { authClient } from '~/lib/auth/auth-client';
let showBox = ref<boolean>(false);
const toggleshowBox = () => {
    showBox.value = !showBox.value;
};
const session = authClient.useSession();
</script>