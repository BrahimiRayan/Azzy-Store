<template>
        <div class="border-2 rounded-lg p-4 flex flex-col items-center CardColor relative bg-[var(--deep-dark-blue)] shadow-lg shadow-black/80 hover:shadow-white/50 transition-all duration-300 ease-in-out">
            <div class="w-[100px] h-[100px] bg-white absolute right-0 top-0 rotate-12 -z-10" 
                style="clip-path:polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);">

            </div>

            <div class="mt-4 mb-2">
                <p class="text-xl font-bold">{{ product.name }}</p>
            </div>

          

            <div class="relative">
                <img v-if="product.image" :src="product.image" :alt="product.name" class="w-[100%] h-[300px] border-2 rounded-3xl  object-contain" />
                <UModal  
                 :title="product.name || 'Product name' "
                 :description="product.description?.slice(0 , 400) || 'No descreption'"
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
                            <img v-if="product.image" :src="product.image" :alt="product.name" class="w-[90%] h-[90%] object-contain" />
                        </div>
                    </template>
                </UModal>
            </div>


              <div class="w-max p-2 self-start font-[--font-style] flex items-center gap-2">
                <UIcon name="i-grommet-icons-money" class="text-md text-yellow-400" />
                <p class="text-[11px]"><span class="text-2xl font-extrabold ">{{ product.puv }}</span> DZD</p>
            </div>

            <div class="h-18 w-full overflow-y-scroll p-2 bg-white/10 rounded-lg mb-2 ">
                <p v-if="product.description" class="indent-2 text-sm">{{ product.description }}</p>
                <p v-else class="text-center mt-4.5 font-extrabold"> Aucune Description.</p>
            </div>

            <div class="self-start border-t-2 w-full pt-3 ">
                <p class="font-extrabold flex items-center text-sm gap-2"><span class="flex items-center gap-1"><UIcon name="i-carbon-delivery"/> Livraison :</span>
                    <span v-if="shipping" class="bg-green-500 text-white rounded mt-1 text-center px-1 text-sm flex items-center justify-center gap-1"> OUI <UIcon name="i-mdi-check" class="text-white" /></span>
                    <span v-else class="bg-red-500 text-white rounded mt-1 text-center px-1 text-sm flex items-center justify-center gap-1"> NON <UIcon name="i-mdi-close" class="text-white" /></span>
                </p>

                <p class="font-extrabold flex items-center gap-2 mb-3 text-sm" v-if="address"><span class="flex items-center gap-1"><UIcon name="i-entypo-address"/> Addresse :</span> <span class="text-sm">{{ address }}</span></p>
               
                <ul class="flex gap-3 align-center justify-center mt-6 mb-3">

                    <li v-if="fb">
                        <a :href="fb" target="_blank" class="flex items-center gap-2 py-1 px-2 bg-white/20 rounded-md hover:-translate-y-1 transition-all duration-300 ease-in-out">
                            <UIcon name="i-mdi-facebook" class="text-2xl" />                            
                        </a>
                    </li>

                    <li v-if="ig">
                        <a :href="ig" target="_blank" class="flex items-center gap-2 py-1 px-2 bg-white/20 rounded-md hover:-translate-y-1.5 transition-all duration-300 ease-in-out">
                           <UIcon name="i-hugeicons-instagram" class="text-2xl" />                                                        
                        </a>
                    </li>

                     <li >
                        <a :href="`mailto:${email}`" target="_blank" class="flex items-center gap-2 py-1 px-2 bg-white/20 rounded-md hover:-translate-y-2 transition-all duration-300 ease-in-out">
                           <UIcon name="i-material-symbols-mail" class="text-2xl" />
                        </a>
                    </li>
                </ul>

                
                    <div class="mt-6">
                        <a :href="`tel:${phone}`" target="_blank"class="flex items-center justify-center gap-2 py-2 px-3 w-[90%] bg-green-600 hover:bg-green-500 transition-all duration-300 ease-in-out mx-auto rounded-md">
                           <UIcon name="i-lineicons-phone" class="text-2xl" />
                            <span class="text-md font-extrabold">{{ addHyphensBetweenPairs(phone) }}</span>
                            
                        </a>
                    </div> 
            </div>

        </div>
</template>
    
<script setup lang='ts'>
import type { productsCards } from '~/types/GeneraleT';
import { addHyphensBetweenPairs } from '~/Utils/generalUIhelpers';

    const props = defineProps<{
        product :productsCards,
        fb : string | null,
        ig : string | null,
        email : string,
        phone : string,
        address : string | null,
        shipping : boolean,
    }>()
</script>
    
<style>

</style>