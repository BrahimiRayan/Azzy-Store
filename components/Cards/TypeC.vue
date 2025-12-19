<template>
  <div class="group relative h-full rounded-xl bg-gradient-to-bl from-inherit to-gray-700 border border-gray-800 overflow-hidden hover:scale-105 hover:shadow-2xl hover:shadow-white/30 transition-all duration-300">
    
    <div class="absolute top-4 right-4 z-10 hover:scale-105  transition-all duration-300">
      <div class="px-3 py-1.5 bg-blue-600 text-white rounded-lg shadow-md">
        <div class="flex items-baseline gap-0.5">
          <span class="text-lg font-black">{{ product.puv }}</span>
          <span class="text-xs font-medium">DZD</span>
        </div>
      </div>
    </div>

    <div class="relative h-48 bg-black/70 border-b">
      <img 
        v-if="product.image" 
        :src="product.image" 
        :alt="product.name" 
        class="w-full h-full p-4 object-contain"
      />
    </div>

    <!-- Content -->
    <div class="p-4">
      
      <h3 class="font-semibold  text-white mb-2 line-clamp-2">
        {{ product.name }}
      </h3>

      <!-- Description -->
      <p v-if="product.description" class="text-sm text-gray-300 mb-3 line-clamp-2">
        {{ product.description }}
      </p>

      <!-- Features -->
      <div class="flex items-center gap-3 mb-4">
        <div class="flex items-center gap-1">
          <UIcon 
            :name="shipping ? 'i-mdi-check-circle' : 'i-mdi-close-circle'" 
            :class="shipping ? 'text-green-500' : 'text-red-500'" 
            class="text-sm" 
          />
          <span class="text-xs text-gray-500">Livraison</span>
        </div>
        
        <div v-if="address" class="flex items-center gap-1">
          <UIcon name="i-mdi-map-marker" class="text-blue-500 text-sm" />
          <span class="text-xs text-gray-500 truncate max-w-[80px]">{{ getCity(address) }}</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-between">
        <div class="flex gap-2">
          <a v-if="fb" :href="fb" target="_blank" class="p-1.5 text-gray-500 hover:text-blue-600">
            <UIcon name="i-mdi-facebook" class="text-lg" />
          </a>
          <a v-if="ig" :href="ig" target="_blank" class="p-1.5 text-gray-500 hover:text-pink-600">
            <UIcon name="i-mdi-instagram" class="text-lg" />
          </a>
          <a :href="`mailto:${email}`" class="p-1.5 text-gray-500 hover:text-red-600">
            <UIcon name="i-mdi-email" class="text-lg" />
          </a>
        </div>
        
        <a :href="`tel:${phone}`" class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
          Appellez !
        </a>
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
                    <UButton class="absolute top-2 left-4 z-10 hover:bg-black/90 text-white bg-black/80 cursor-pointer" icon="i-majesticons-open" />

                    <template #body>
                        <div class="w-[100%] h-[100%] flex justify-center items-center">
                            <img v-if="product.image" :src="product.image" :alt="product.name" class="w-[90%] h-[90%] object-contain" />
                        </div>
                    </template>
        </UModal>
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { productsCards } from '~/types/GeneraleT';

const props = defineProps<{
  product: productsCards,
  fb: string | null,
  ig: string | null,
  email: string,
  phone: string,
  address: string | null,
  shipping: boolean,
}>()

// Helper function
const getCity = (address: string) => {
  const parts = address.split(',')
  return parts[0].trim()
}
</script>