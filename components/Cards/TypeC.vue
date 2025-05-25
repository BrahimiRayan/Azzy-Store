<template>
        <div class="border-2 rounded-lg p-4 flex flex-col items-center CardColor relative shadow-lg shadow-black/80 hover:shadow-white/50 transition-all duration-300 ease-in-out" >
            <div class="w-[100px] h-[100px] bg-white absolute right-0 bottom-50 rotate-12 -z-10" 
                style="clip-path:polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);">

            </div>

          

            <div class="relative">
                <img v-if="product.img" :src="product.img" :alt="product.name" class="w-[100%] h-[300px] border-2 rounded-3xl  object-contain" />
                <UModal  
                 fullscreen
                :ui="{
                    overlay: 'bg-black/80',
                    body: 'bg-black/10 border-none outline-none ',
                    header: 'bg-black/90 border border-none ',
                    close : 'bg-red-500 hover:bg-red-600',
                    content: 'border-0 rounded-sm',
                    wrapper:'border-0'
                }"
                >
                    <UButton class="absolute bottom-2 right-4 bg-black/60 hover:bg-black/70 text-white" icon="i-majesticons-open"/>

                    <template #body>
                        <div class="w-[100%] h-[100%] flex justify-center items-center">
                            <img v-if="product.img" :src="product.img" :alt="product.name" class="w-[90%] h-[90%] object-contain" />
                        </div>
                    </template>
                </UModal>
            </div>


            <div class="mt-4 mb-2">
                <p class="text-xl font-bold">{{ product.name }}</p>
            </div>

              <div class="w-max p-2 self-start font-[--font-style] flex items-center gap-2">
                <UIcon name="i-grommet-icons-money" class="text-md text-yellow-400" />
                <p class="text-[11px]"><span class="text-2xl font-extrabold ">{{ product.puv }}</span> DZD</p>
            </div>
            <div class="self-start border-t-2 w-full pt-3 ">
                <p class="font-extrabold flex items-center gap-2"><span class="flex items-center gap-1"><UIcon name="i-carbon-delivery"/> Livraison :</span>
                    <span v-if="shipping" class="bg-green-500 rounded mt-1 text-center px-1 text-sm flex items-center justify-center gap-1"> OUI <UIcon name="i-mdi-check" class="text-white" /></span>
                    <span v-else class="bg-red-500 rounded mt-1 text-center px-1 text-sm flex items-center justify-center gap-1"> NON <UIcon name="i-mdi-close" class="text-white" /></span>
                </p>

                <p class="font-extrabold flex items-center gap-2 mb-3" v-if="address"><span class="flex items-center gap-1"><UIcon name="i-entypo-address"/> Addresse :</span> <span class="text-sm">{{ address }}</span></p>
                <span class="text-sm w-max px-2 py-1 rounded bg-white/10 flex items-center gap-1"><UIcon name="grommet-icons:contact" /> Contactez nous sur</span>
                <ul class="flex gap-3 align-center justify-center mt-6 mb-3">

                    <li v-if="fb">
                        <a :href="fb" target="_blank" class="flex items-center gap-2 py-1 px-2 bg-[#3b5998] rounded-md hover:-translate-y-1 transition-all duration-300 ease-in-out">
                            <UIcon name="i-mdi-facebook" class="text-2xl" />                            
                        </a>
                    </li>

                    <li v-if="ig">
                        <a :href="ig" target="_blank" class="flex items-center gap-2 py-1 px-2 bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-400 rounded-md hover:-translate-y-1.5 transition-all duration-300 ease-in-out">
                           <UIcon name="i-hugeicons-instagram" class="text-2xl" />                                                        
                        </a>
                    </li>

                     <li >
                        <a :href="`mailto:${email}`" target="_blank" class="flex items-center gap-2 py-1 px-2 bg-gradient-to-r from-red-500 to bg-red-700 rounded-md hover:-translate-y-2 transition-all duration-300 ease-in-out">
                           <UIcon name="i-material-symbols-mail" class="text-2xl" />
                        </a>
                    </li>
                </ul>

                    <span class="text-sm font-extrabold w-max px-2 py-1 rounded bg-white/10">OU Appelez nous</span>
                    <div class="mt-6">
                        <a :href="`tel:${phone}`" target="_blank"class="flex items-center justify-center gap-2 py-2 px-3 w-[90%] bg-green-600 hover:bg-green-500 transition-all duration-300 ease-in-out mx-auto rounded-md">
                           <UIcon name="i-lineicons-phone" class="text-2xl" />
                            <span class="text-md font-extrabold">{{ phone }}</span>
                            
                        </a>
                    </div> 
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
        address ?: string,
        shipping : boolean,
    }>()
</script>
    
<style>

</style>