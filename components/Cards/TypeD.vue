<template>
  <div class="group relative h-full rounded-3xl bg-gradient-to-br from-gray-700 via-inherit to-inherit  border-0 shadow-sm hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-700 overflow-hidden">
    <div class="absolute inset-0 opacity-15 group-hover:opacity-30 transition-opacity duration-700">
      <div class="absolute top-0 right-0 w-32 h-32 bg-gray-500 rounded-full -translate-y-16 translate-x-16"></div>
      <div class="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full translate-y-20 -translate-x-20"></div>
    </div>

    <div class="relative z-20 p-3 pt-6">
      
      <div class="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full  bg-red-900/30 text-red-400  text-xs font-medium">
        <UIcon name="i-mdi-tag-outline" class="text-xs" />
        <span>Offre Limitée</span>
      </div>

      
      <h3 class="text-2xl font-bold text-white mb-2 leading-tight">
        {{ product.name }}
      </h3>

      
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-baseline gap-2">
          <span class="text-3xl font-black  text-white">{{ product.puv }}</span>
          <span class="text-sm font-medium  text-gray-400">DZD</span>
        </div>
        
        <div class="flex items-center gap-1">
          <div class="rounded-full w-3 h-3 animate-pulse bg-green-400"></div>
        </div>
      </div>

      
      <div class="mb-6">
        <p v-if="product.description" class=" text-gray-200 leading-relaxed line-clamp-2">
          {{ product.description }}
        </p>
        <p v-else class=" text-gray-500 italic">
          No description available
        </p>
      </div>

      
      <div class="grid grid-cols-2 gap-3 mb-1">
        
        <div class="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r  to-gray-900/50">
          <div :class="shipping ? 'text-green-500' : 'text-red-500'" class="p-2 rounded-lg  bg-gray-800 shadow-sm">
            <UIcon :name="shipping ? 'i-mdi-check' : 'i-mdi-close'" class="text-lg" />
          </div>
          <div>
            <p class="text-sm font-medium  text-gray-300">Livraison</p>
            <p class="text-xs  text-gray-400">{{ shipping ? 'Disponible' : 'Pas Disponible' }}</p>
          </div>
        </div>

        
        <div v-if="address" class="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r  from-gray-800/50 to-gray-900/50">
          <div class="p-2 rounded-lg  bg-gray-800 shadow-sm text-blue-500">
            <UIcon name="i-mdi-map-marker" class="text-lg" />
          </div>
          <div>
            <p class="text-sm font-medium  text-gray-300 truncate">{{ getCity(address) }}</p>
            <p class="text-xs  text-gray-400">Localisation</p>
          </div>
        </div>
      </div>


    </div>

    <div class="relative z-10 pt-4 px-8">
      <div class="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br  from-gray-800/80 to-gray-900/80 group-hover:from-blue-900/20 transition-all duration-500">

        <img 
          v-if="product.image" 
          :src="product.image" 
          :alt="product.name" 
          class="w-full h-full p-4 object-contain transition-transform duration-700 group-hover:scale-110"
        />
      </div>
        
      <UModal  
        :title="product.name || 'Product name' "
        :description="product.description?.slice(0 , 400) || 'No descreption'"
        fullscreen
            :ui="{
                    overlay: 'bg-black/80',
                    body: 'bg-black/90 border-none outline-none ',
                    header: 'bg-black/90 border border-none ',
                    close : 'bg-red-500 hover:bg-red-600',
                    content: 'border-0 rounded-sm text-white',
                    description : 'whitespace-pre-line max-h-30 overflow-scroll p-2 rounded-lg bg-white/10',
                    title : 'text-2xl font-extrabold',
                    wrapper:'border-0'
                }"
                >
            <UButton class="absolute opacity-0 top-6 left-8 z-10 group-hover:opacity-100 hover:bg-black/90 text-white bg-black/80 cursor-pointer transition-all duration-200" icon="i-majesticons-open" />

            <template #body>
                <div class="w-[100%] h-[100%] flex justify-center items-center">
                    <img v-if="product.image" :src="product.image" :alt="product.name" class="w-[90%] h-[90%] object-contain" />
                </div>
            </template>
        </UModal>
    </div>


    <div class="p-8 pt-6">
     <div class="flex items-center gap-3 mb-6">
        
          <a :href="`tel:${phone}`" class="block w-full">
            <div class="flex items-center justify-between bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl p-3 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 group/phone">
              <div class="flex items-center gap-3">
                <div class="p-1.5 bg-white/20 rounded-full group-hover/phone:scale-110 transition-transform duration-300">
                  <UIcon name="i-mdi-phone" class="text-lg" />
                </div>
                <div class="text-left">
                  <p class="text-xs font-semibold opacity-90">Appelez sur</p>
                  <p class="text-sm font-black tracking-wide">{{ addHyphensBetweenPairs(phone) }}</p>
                </div>
              </div>
              <UIcon name="i-mdi-arrow-right" class="text-lg opacity-0 group-hover/phone:opacity-100 transition-opacity duration-300" />
            </div>
          </a>
        
        <a v-if="false" :href="`https://wa.me/${phone}`" class="p-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30">
          <UIcon name="i-mdi-whatsapp" class="text-xl" />
        </a>
      </div>

      
      <div class="flex items-center justify-center gap-4">
        <a v-if="fb" :href="fb" target="_blank" class="text-gray-400  hover:text-blue-400 transition-colors">
          <UIcon name="i-mdi-facebook" class="text-xl" />
        </a>
        <a v-if="ig" :href="ig" target="_blank" class="text-gray-400  hover:text-pink-400 transition-colors">
          <UIcon name="i-mdi-instagram" class="text-xl" />
        </a>
        <a :href="`mailto:${email}`" class="text-gray-400  hover:text-red-400 transition-colors">
          <UIcon name="i-mdi-email" class="text-xl" />
        </a>
      </div>
    </div>

  </div>
</template>

<script setup lang='ts'>
import type { productsCards } from '~/types/GeneraleT';
import { addHyphensBetweenPairs } from '~/Utils/generalUIhelpers';

const props = defineProps<{
  product: productsCards,
  fb: string | null,
  ig: string | null,
  email: string,
  phone: string,
  address: string | null,
  shipping: boolean,
}>()

const modal = ref()


const getCity = (address: string) => {
  const parts = address.split(',')
  return parts[0].trim()
}
</script>

<style scoped>

.group:hover .shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.25);
}
</style>