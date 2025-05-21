<template>
        <div class="border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center PubColor ">
            <div class="w-max p-2 self-start">
                <p class="text-sm"><span class="text-2xl font-[800]">{{ product.puv }}</span> DZD</p>
            </div>

            <div class="relative">
                <img v-if="product.img" :src="product.img" :alt="product.name" class="h-[98%] border-2 rounded-md w-[98%] object-center" />
                <UModal  

                :ui="{
                    overlay: 'bg-black/80',
                    body: 'bg-[var(--deep-dark-blue)] border-none outline-none ',
                    header: 'bg-[var(--deep-dark-blue)] border border-none ',
                    close : 'bg-red-500 hover:bg-red-600',
                    content: 'border rounded-sm',
                }"
                >
                    <UButton class="absolute bottom-2 right-4 bg-black/60 hover:bg-black/70 text-white" icon="i-majesticons-open"/>

                    <template #body>
                        <div class="w-[100%] h-[100%] flex justify-center items-center">
                            <img v-if="product.img" :src="product.img" :alt="product.name" class="w-[90%]" />
                        </div>
                    </template>
                </UModal>
            </div>

            <div class="mt-4 mb-2">
                <p class="text-xl font-bold">{{ product.name }}</p>
            </div>

            <div class="self-start border-t-2 w-full pt-3 ">
                <ul class="flex flex-col gap-2 ">
                    <span class="text-sm font-extrabold">Contactez nous sur</span>
                    <li v-if="fb">
                        <a :href="fb" target="_blank" class="flex items-center gap-2 py-1 px-3 w-[40%] bg-[#3b5998] rounded-md">
                            <UIcon name="i-mdi-facebook" class="text-2xl" />
                            <span class="text-sm">Facebook</span>
                        </a>
                    </li>
                    <li v-if="ig">
                        <a :href="ig" target="_blank" class="flex items-center gap-2 py-1 px-3 w-[40%] bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-400 rounded-md">
                           <UIcon name="i-hugeicons-instagram" class="text-2xl" />
                            <span class="text-sm">Instagram</span>
                            
                        </a>
                    </li>

                     <li >
                        <a :href="`mailto:${email}`" target="_blank" class="flex items-center gap-2 py-1 px-3 w-[40%] bg-gradient-to-r from-red-500 to bg-red-800 rounded-md">
                           <UIcon name="i-material-symbols-mail" class="text-2xl" />
                            <span class="text-sm">Email</span>
                            
                        </a>
                    </li> 
                   
                    <span class="text-sm font-extrabold">OU Appelez nous</span>
                    <li >
                        <a :href="`tel:${phone}`" target="_blank"class="flex items-center justify-center gap-2 py-2 px-3 w-[90%] bg-green-600 hover:bg-green-500 transition-all duration-300 ease-in-out mx-auto rounded-md">
                           <UIcon name="i-lineicons-phone" class="text-2xl" />
                            <span class="text-md font-extrabold">Email</span>
                            
                        </a>
                    </li> 
                    
                </ul>
            </div>

        </div>
</template>
    
<script setup lang='ts'>
import type { Produit } from '~/types/GeneraleT';

    const props = defineProps<{
        product :Produit,
        fb? : string,
        ig ?: string,
        email : string,
        phone : string,
    }>()
</script>
    
<style>
</style>