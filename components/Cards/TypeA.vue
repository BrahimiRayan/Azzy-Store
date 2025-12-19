<template>
  <div class="relative h-full">
    
    <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
    <div class="h-full bg-gradient-to-br  to-inherit from-gray-800 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 hover:scale-[1.02] hover:border-slate-600/50 transition-all duration-300 flex flex-col">
      <div class="absolute -top-3 right-4 z-20">
        <div class="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full shadow-lg shadow-emerald-500/30">
          <UIcon name="i-mdi-tag" class="text-amber-200 text-sm" />
          <span class="font-black text-white text-lg">{{ product.puv }}</span>
          <span class="text-xs font-semibold text-amber-100 ml-0.5">DZD</span>
        </div>
      </div>

      
      <div class="relative mb-4 aspect-square rounded-xl overflow-hidden bg-gray-900/50 border  border-slate-700 group/image">
        <img 
          v-if="product.image" 
          :src="product.image" 
          :alt="product.name" 
          class="w-full h-full p-4 object-contain transition-transform duration-500 group-hover/image:scale-110"
        />
        
        
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
          
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
                    <UButton
                     size="xs"
                      class="bg-white/90 hover:bg-white text-slate-800 font-semibold transform translate-y-4 group-hover/image:translate-y-0 transition-transform duration-300"
                     >
                      <UIcon name="i-mdi-eye" class="text-sm mr-1" />
                      Quick View
                    </UButton>

                    <template #body>
                        <div class="w-[100%] h-[100%] flex justify-center items-center">
                            <img v-if="product.image" :src="product.image" :alt="product.name" class="w-[90%] h-[90%] object-contain" />
                        </div>
                    </template>
            </UModal>
          
 
        </div>
      </div>

      <!-- Product Info -->
      <div class="flex-1 flex flex-col px-1">
        <!-- Product Name -->
        <h3 class="text-base font-bold  text-white mb-2 line-clamp-2 h-12">
          {{ product.name }}
        </h3>

        <!-- Description Preview -->
        <div class="mb-3 flex-1">
          <p v-if="product.description" class="text-sm  text-slate-300 line-clamp-3 h-14">
            {{ product.description }}
          </p>
          <p v-else class="text-xs text-slate-500 italic text-center py-2">
            No description available
          </p>
        </div>

        <!-- Quick Info Bar -->
        <div class="flex items-center justify-between mb-4">
          <!-- Delivery Status -->
          <div class="flex items-center gap-2">
            <div :class="shipping ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'" class="p-1.5 rounded-lg">
              <UIcon 
                :name="shipping ? 'i-mdi-truck-fast' : 'i-mdi-truck-remove'" 
                class="text-sm" 
              />
            </div>
            <span class="text-xs font-semibold text-slate-300">
              {{ shipping ? 'Livraison' : 'Pas de Livraison' }}
            </span>
          </div>

          <!-- Location if available -->
          <div v-if="address" class="flex items-center gap-2">
            <div class="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
              <UIcon name="i-mdi-map-marker" class="text-sm" />
            </div>
            <span class="text-xs font-medium text-slate-400 truncate max-w-[80px]">
              {{ getCity(address) }}
            </span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3">
          <!-- Call Button -->
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

          <!-- Social Links -->
          <div class="flex items-center justify-center gap-2">
            <a v-if="fb" :href="fb" target="_blank" class="p-2 rounded-lg  bg-slate-800 hover:bg-blue-500 hover:text-white  text-slate-400 transition-all duration-300 hover:-translate-y-0.5">
              <UIcon name="i-mdi-facebook" class="text-lg" />
            </a>
            <a v-if="ig" :href="ig" target="_blank" class="p-2 rounded-lg  bg-slate-800 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 hover:text-white  text-slate-400 transition-all duration-300 hover:-translate-y-0.5">
              <UIcon name="i-mdi-instagram" class="text-lg" />
            </a>
            <a :href="`mailto:${email}`" class="p-2 rounded-lg  bg-slate-800 hover:bg-red-500 hover:text-white  text-slate-400 transition-all duration-300 hover:-translate-y-0.5">
              <UIcon name="i-mdi-email" class="text-lg" />
            </a>
            <a v-if="false" :href="`https://wa.me/${phone}`" class="p-2 rounded-lg  bg-slate-800 hover:bg-green-500 hover:text-white text-slate-400 transition-all duration-300 hover:-translate-y-0.5">
              <UIcon name="i-mdi-whatsapp" class="text-lg" />
            </a>
          </div>
        </div>
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

// Helper function to get city from address
const getCity = (address: string) => {
  const parts = address.split(',')
  return parts[0].trim()
}
</script>

<style scoped>
/* No custom CSS needed - everything is in Tailwind classes */
</style>