<template>
    <div v-for="product in cardProducts" :key="product.id"
      class=" relative hover:scale-98 transition-all duration-300 ease-in-out flex items-center gap-1.5 h-50 mb-3 bg-white/10 rounded-xl">
      <div class="h-full w-[40%] border-r-4 border-red-500">
        <NuxtImg :src="product.img" class="h-full w-full rounded-l-2xl" :alt="product.name" placeholder="/no-img.png"
          loading="lazy" format="webp" />
      </div>
      <div class="text-sm font-bold w-[55%]">
        <h1 class="text-lg text-red-500 mb-5">{{ TitleLimit(product.name) }}</h1>
        <p class="flex justify-between mb-2"><span>Catégorie </span> <UBadge :class="Catecolor(product.category)">{{ product.category }}</UBadge></p>
        
        <p class="flex justify-between mb-2">
          <UTooltip 
            :delay-duration="0" 
              :content="{
                align: 'center',
                side: 'right',
                sideOffset: 8
              }"
            text="Valeur du stock à l'achat" 
            :ui="{
            content : 'bg-gray-900 ring-0'
          }">
           <span class="text-xs cursor-help" data>Coût total </span>  
          </UTooltip>
           <span class="text-green-500">{{product.quantity * product.pua}} DZD</span>
        </p>
        
        <p class="flex justify-between mb-2">
          <UTooltip
           :delay-duration="0"
           :content="{
                align: 'center',
                side: 'right',
                sideOffset: 8
              }"
           text="Stock au prix de marché" 
           :ui="{
            content : 'bg-gray-900 ring-0'
          }">
          <span class="text-xs cursor-help">Valeur de revente </span> 
          </UTooltip>
          <span class="text-green-500">{{product.quantity * product.puv}} DZD</span>
        </p>
        
        <p class="flex justify-between mb-2">
          <UTooltip 
          :delay-duration="1"
          :content="{
                align: 'center',
                side: 'right',
                sideOffset: 8
              }" 
          text="Marge bénéficiaire prévisionnelle" 
          :ui="{
            content : 'bg-gray-900 ring-0'
          }">
          <span class="text-xs cursor-help">Profit estimé </span> 
          </UTooltip>
          <span class="text-green-500">{{(product.quantity * product.puv) - (product.quantity * product.pua)}} DZD</span>
        </p>
        
      </div>

      <div class="absolute top-0 right-0">
        <UButton icon="i-lucide-pencil"
          class="ml-auto bg-transparent text-green-500 hover:text-green-700 hover:bg-transparent size-9 transition-colors duration-300 ease-in-out"
          size="sm" :to="`/Produits/${product.id}`" />
      </div>
    </div>
</template>
    
<script setup lang='ts'>
import { Catecolor } from '~/Composables/useTheme';
import type { Produit } from '~/types/GeneraleT';
import { TitleLimit } from '~/Utils/generalUIhelpers';

defineProps<{
    cardProducts:Produit[];
}>();


</script>
