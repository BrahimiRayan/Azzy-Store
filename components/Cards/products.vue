<template>
  <div 
    v-for="product in cardProducts" 
    :key="product.id"
    class="group relative bg-blue-950/30 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 overflow-hidden border border-gray-200 hover:border-yellow-500 mb-6"
  >
    <!-- Progress Indicator -->
    <div class="absolute top-0 right-0 w-24 h-24 overflow-hidden">
      <div class="absolute -right-12 -top-12 w-24 h-24 bg-emerald-100 rounded-full opacity-50"></div>
    </div>
    
    <div class="flex items-stretch min-h-[200px]">
      <!-- Left Column - Image & Basics -->
      <div class="w-1/3 border-r border-gray-100">
        <div class="p-6 h-full flex flex-col">
          <!-- Image -->
          <div class="relative w-full h-32 mb-4 overflow-hidden rounded-lg">
            <NuxtImg 
              :src="product.img" 
              class="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
              :alt="product.name" 
              placeholder="/no-img.png"
              loading="lazy" 
              format="webp"
            />
          </div>
          
          <!-- Basic Info -->
          <div class="space-y-3">
            <div>
              <h3 class="text-sm font-bold text-gray-100 mb-1 line-clamp-3">
                {{ TitleLimit(product.name, 35) }}
              </h3>
              <div 
                class="inline-block px-3 py-1 rounded-full text-xs font-bold text-white"
                :class="Catecolor(product.category)"
              >
                {{ product.category }}
              </div>
            </div>
            
            <div class="flex flex-col items-center gap-2 text-gray-200">
              <div class="flex items-center gap-2">
                <UIcon name="i-mdi-cube-outline" class="text-sm" />
                <h2 class="text-sm font-bold">{{ product.quantity }} </h2> 
              </div>
              <p class="text-xs">unités en stock</p>
            </div>
          </div>
          <div class="mt-auto pt-4 ">
            <UButton 
              icon="i-mdi-eye"
              label="Plus"
              variant="outline"
              class="w-full bg-green-500 hover:bg-green-600 text-black text-xs transition-colors"
              :to="`/Produits/${product.id}`"
            />
          </div>
        </div>

      </div>

      <!-- Middle Column - Unit Prices -->
      <div class="w-1/3 border-r border-gray-100">
        <div class="p-6 h-full flex flex-col">
          <h4 class="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">Prix unitaires</h4>
          
          <div class="space-y-6">
            <!-- Purchase Price -->
            <div>
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-medium text-gray-300">Achat</span>
                <UTooltip :ui="{content : 'bg-red-500'}" text="Prix d'achat par unité">
                  <UIcon name="i-mdi-information-outline" class="text-gray-300 text-sm cursor-help" />
                </UTooltip>
              </div>
              <div class="text-2xl font-bold text-green-600 leading-tight">
                {{ formatCompact(product.pua) }}
              </div>
              <div class="text-xs text-gray-300 mt-1">Coût par unité</div>
            </div>
            
            <!-- Sale Price -->
            <div>
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-medium text-gray-300">Vente</span>
                <UTooltip :ui="{content : 'bg-red-500'}" text="Prix de vente par unité">
                  <UIcon name="i-mdi-information-outline" class="text-gray-300 text-sm cursor-help" />
                </UTooltip>
              </div>
              <div class="text-2xl font-bold text-green-600 leading-tight">
                {{ formatCompact(product.puv) }}
              </div>
              <div class="text-xs text-gray-300 mt-1">Prix marché</div>
            </div>
            
            <!-- Unit Margin -->
            <div>
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-medium text-gray-300">Marge unitaire</span>
                <UTooltip :ui="{content : 'bg-red-500'}" text="Différence entre prix de vente et d'achat">
                  <UIcon name="i-mdi-information-outline" class="text-gray-400 text-sm cursor-help" />
                </UTooltip>
              </div>
              <div class="text-2xl font-bold text-green-600 leading-tight">
                {{ formatCompact(product.puv - product.pua) }}
              </div>
              <div class="text-sm font-extrabold text-green-400  mt-1">
                {{ calculateProfitMargin(product.pua, product.puv) }}% 
                <span class="text-xs text-white">de marge</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Totals -->
      <div class="w-1/3">
        <div class="p-6 h-full flex flex-col">
          <h4 class="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">Valeurs totales</h4>
          
          <div class="space-y-6 flex-1">
            <!-- Total Cost -->
            <div>
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-medium text-gray-300">Coût total</span>
                <UTooltip :ui="{content : 'bg-red-500'}" text="Valeur totale du stock à l'achat">
                  <UIcon name="i-mdi-information-outline" class="text-gray-400 text-sm cursor-help" />
                </UTooltip>
              </div>
              <div class="text-2xl font-bold text-green-600 leading-tight">
                {{ formatCompact(product.quantity * product.pua) }}
              </div>
              <div class="text-xs text-gray-300 mt-1">
                {{ product.quantity }} × {{ formatCompact(product.pua) }} DZD
              </div>
            </div>
            
            <!-- Total Revenue -->
            <div>
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-medium text-gray-300">Valeur de revente</span>
                <UTooltip :ui="{content : 'bg-red-500'}" text="Valeur totale du stock au prix de vente">
                  <UIcon name="i-mdi-information-outline" class="text-gray-400 text-sm cursor-help" />
                </UTooltip>
              </div>
              <div class="text-2xl font-bold text-green-600 leading-tight">
                {{ formatCompact(product.quantity * product.puv) }}
              </div>
              <div class="text-xs text-gray-300 mt-1">Potentiel de vente</div>
            </div>
            
            <!-- Total Profit -->
            <div>
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-medium text-gray-300">Profit total</span>
                <UTooltip :ui="{content : 'bg-red-500'}" text="Bénéfice potentiel total">
                  <UIcon name="i-mdi-information-outline" class="text-gray-400 text-sm cursor-help" />
                </UTooltip>
              </div>
              <div class="text-2xl font-bold text-green-600 leading-tight">
                {{ formatCompact((product.quantity * product.puv) - (product.quantity * product.pua)) }}
              </div>
              <div class="text-xs text-green-500 font-medium mt-1">
                Bénéfice estimé
              </div>
            </div>
          </div>
          

        </div>
      </div>
    </div>
    
    <div class="border-t border-gray-100 bg-gray-50/80 px-6 py-3">
      <div class="flex items-center gap-x-2">
          <UIcon name="i-mdi-chart-line" class="text-emerald-500" />
          <span class="text-sm font-medium text-gray-800">Rentabilité:</span>
          <span class="text-sm font-bold text-green-600">{{ calculateProfitMargin(product.pua, product.puv) }}%</span>
        </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { Catecolor } from '~/Composables/useTheme';
import type { Produit } from '~/types/GeneraleT';
import { TitleLimit } from '~/Utils/generalUIhelpers';

defineProps<{
  cardProducts: Produit[];
}>();

// Formater les nombres en format compact (ex: 1.5K, 2.3M)
const formatCompact = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace('.', ',') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace('.', ',') + 'K';
  }
  return new Intl.NumberFormat('fr-DZ').format(num);
};

// Calculer le pourcentage de marge
const calculateProfitMargin = (pua: number, puv: number) => {
  if (pua === 0) return 0;
  const margin = ((puv - pua) / pua) * 100;
  return Math.round(margin * 10) / 10;
};
</script>