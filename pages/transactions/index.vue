<template>

  <div v-if="pending">
    <SkeletoneTransactions />
  </div>

  <div v-else class="min-h-screen bg-(--deep-dark-blue) max-sm:px-4 sm:px-8 max-sm:py-6 sm:py-6 lg:px-0 lg:py-0">    
    <UBreadcrumb :items="item" class="sm:mt-8 mt-2" 
      :ui="{
        linkLabel : 'max-sm:text-xs',
      }"/>
    <header class="bg-transparent mt-3 border-b border-gray-200/20 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            
            <h1 class="text-2xl font-bold text-gray-200">Transactions</h1>
            <p class="text-gray-300 text-sm">Gérez et suivez toutes vos opérations financières</p>
          </div>
          
            <div class="text-right">
              <p class="text-sm text-gray-200">Solde actuel</p>
              <p class="text-xl font-bold text-emerald-600">+{{ calculateTotalProfit() }} DZD</p>
            </div>
        </div>
      </div>
    </header>

    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Transactions -->
        <div class="group bg-white/5 rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-200">
          <div class="flex items-center justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
              <UIcon name="i-mdi-swap-horizontal" class="text-white text-2xl" />
            </div>
            <div class="text-right">
              <span class="text-xs font-medium text-gray-200">Total</span>
            </div>
          </div>
          <h3 class="text-lg font-semibold text-gray-300 mb-2">Transactions</h3>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-bold text-gray-300">
              {{ transaction?.transactions?.length || 0 }}
            </span>
            <span class="text-sm text-gray-200">opérations</span>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-100">
            <div class="flex items-center gap-2 text-sm text-gray-200">
              <UIcon name="i-mdi-trending-up" class="text-green-500" />
              <span>Toutes activités confondues</span>
            </div>
          </div>
        </div>

        <!-- Purchases -->
        <div class="group bg-white/5 rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-200">
          <div class="flex items-center justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-red-500 to-pink-600">
              <UIcon name="i-mdi-cart-arrow-down" class="text-white text-2xl" />
            </div>
            <div class="text-right">
              <span class="text-xs font-medium text-gray-200">Achats</span>
            </div>
          </div>
          <h3 class="text-lg font-semibold text-gray-300 mb-2">Transactions d'Achat</h3>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-bold text-red-600">
              {{ transaction!.transactions.length - numberOfselles || 0 }}
            </span>
            <span class="text-sm text-gray-200">opérations</span>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-100">
            <div class="flex items-center gap-2 text-sm text-gray-300">
              <UIcon name="i-mdi-arrow-down" class="text-red-500" />
              <span>Sortie de fonds</span>
            </div>
          </div>
        </div>

        <!-- Sales -->
        <div class="group bg-white/5 rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-200">
          <div class="flex items-center justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600">
              <UIcon name="i-mdi-cart-arrow-up" class="text-white text-2xl" />
            </div>
            <div class="text-right">
              <span class="text-xs font-medium text-gray-200">Ventes</span>
            </div>
          </div>
          <h3 class="text-lg font-semibold text-gray-300 mb-2">Transactions de Vente</h3>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-bold text-green-600">
              {{ numberOfselles || 0 }}
            </span>
            <span class="text-sm text-gray-200">opérations</span>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-100">
            <div class="flex items-center gap-2 text-sm text-gray-300">
              <UIcon name="i-mdi-arrow-up" class="text-green-500" />
              <span>Entrée de fonds</span>
            </div>
          </div>
        </div>

        <!-- Profit Summary -->
        <div class="group bg-white/5 rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-200">
          <div class="flex items-center justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
              <UIcon name="i-mdi-chart-line" class="text-white text-2xl" />
            </div>
            <div class="text-right">
              <span class="text-xs font-medium text-gray-200">Bénéfice</span>
            </div>
          </div>
          <h3 class="text-lg font-semibold text-gray-300 mb-2">Profit Total</h3>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-bold text-emerald-600">
              +{{ calculateTotalProfit() }}
            </span>
            <span class="text-sm text-gray-200">DZD</span>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-100">
            <div class="flex items-center gap-2 text-sm text-gray-300">
              <UIcon name="i-mdi-trending-up" class="text-emerald-500" />
              <span>Net positif</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Legend & Filters -->
      <div class="mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <!-- Legend -->
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-pink-600"></div>
              <span class="text-sm font-medium text-gray-200">Transaction d'achat</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
              <span class="text-sm font-medium text-gray-200">Transaction de vente</span>
            </div>
          </div>

        </div>
      </div>

      <!-- Transactions Table -->
      <div class="bg-white/5 rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <!-- Table Header -->
        <div class="px-6 py-4 border-b border-gray-200 bg-white/30">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-gray-200">Historique des Transactions</h2>
            <div class="flex items-center gap-2">
              <UIcon name="i-mdi-history" class="text-gray-200" />
              <span class="text-sm text-gray-300">{{ transaction?.transactions?.length || 0 }} enregistrements</span>
            </div>
          </div>
        </div>

        <!-- Table Content -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <!-- Desktop Table Header -->
            <thead class="hidden lg:table-header-group bg-gray-50/10">
              <tr class="text-left text-sm font-semibold text-gray-200 border-l-4 border-black/50">
                <th class="px-6 py-4 whitespace-nowrap">Produit</th>
                <th class="px-6 py-4 whitespace-nowrap">Catégorie</th>
                <th class="px-6 py-4 whitespace-nowrap">Prix Achat</th>
                <th class="px-6 py-4 whitespace-nowrap">Prix Vente</th>
                <th class="px-6 py-4 whitespace-nowrap">Quantité</th>
                <th class="px-6 py-4 whitespace-nowrap">Date</th>
                <th class="px-6 py-4 whitespace-nowrap">Type</th>
                <th class="px-6 py-4 whitespace-nowrap text-right">Montant</th>
              </tr>
            </thead>

            <!-- Empty State -->
            <tbody v-if="!transaction?.transactions?.length">
              <tr>
                <td colspan="8" class="px-6 py-16 text-center">
                  <div class="max-w-md mx-auto">
                    <div class="w-48 h-48 mx-auto mb-6 bg-white/10 rounded-2xl flex items-center justify-center">
                      <UIcon name="i-mdi-swap-horizontal-variant" class="text-gray-400 text-6xl" />
                    </div>
                    <h3 class="text-xl font-bold text-gray-300 mb-2">Aucune transaction</h3>
                    <p class="text-gray-300 mb-6">Commencez à enregistrer vos premières transactions</p>
                    
                    <ULink to="/products"
                      
                      class="bg-linear-to-r from-emerald-600 to-green-600 p-2 rounded-xl"
                    >
                      <UIcon name="i-mdi-plus" class="text-white text-sm" />
                      Ajouter une transaction
                    </ULink>
                  </div>
                </td>
              </tr>
            </tbody>

            <!-- Transactions List -->
            <tbody v-else>
              <template v-for="(t, index) in transaction.transactions" :key="index">
                <!-- Desktop Row -->
                <tr 
                  class="hidden lg:table-row group hover:bg-white/10 transition-colors duration-300"
                  :class="t.type === 'V' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'"
                >
                  <!-- Product -->
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <UAvatar 
                        :src="t.product?.image" 
                        :alt="t.product?.name"
                        size="md"
                        class="border-2 border-gray-200"
                      />
                      <div>
                        <p class="font-medium text-gray-200">{{ t.product?.name }}</p>
                        <p class="text-xs text-gray-400">ID: {{ t.idProduct.slice(0 , 12) }}...</p>
                      </div>
                    </div>
                  </td>

                  <!-- Category -->
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                      :class="t.type === 'V' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                    >
                      {{ t.product?.type }}
                    </span>
                  </td>

                  <!-- Purchase Price -->
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <UIcon name="i-mdi-arrow-down" class="text-red-500 text-sm" />
                      <span class="font-medium text-gray-200">{{ formatNumber(t.pua_t) }}</span>
                      <span class="text-xs text-gray-200">DZD</span>
                    </div>
                  </td>

                  <!-- Sale Price -->
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <UIcon name="i-mdi-arrow-up" class="text-green-500 text-sm" />
                      <span class="font-medium text-gray-200">{{ formatNumber(t.puv_t) }}</span>
                      <span class="text-xs text-gray-200">DZD</span>
                    </div>
                  </td>

                  <!-- Quantity -->
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <UIcon name="i-mdi-package-variant" class="text-blue-500 text-sm" />
                      <span class="font-medium text-gray-200">{{ t.qte }}</span>
                      <span class="text-xs text-gray-200">unités</span>
                    </div>
                  </td>

                  <!-- Date -->
                  <td class="px-6 py-4">
                    <div class="flex flex-col">
                      <span class="font-medium text-gray-200">{{ formatDate(t.date) }}</span>     
                    </div>
                  </td>

                  <!-- Type -->
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <div 
                        class="w-3 h-3 rounded-full"
                        :class="t.type === 'V' ? 'bg-green-500' : 'bg-red-500'"
                      ></div>
                      <span class="font-medium" :class="t.type === 'V' ? 'text-green-600' : 'text-red-600'">
                        {{ t.type === 'V' ? 'Vente' : 'Achat' }}
                      </span>
                    </div>
                  </td>

                  <!-- Amount -->
                  <td class="px-6 py-4 text-right">
                    <div class="flex flex-col items-end">
                      <span 
                        class="text-lg font-bold"
                        :class="t.type === 'V' ? 'text-green-600' : 'text-red-600'"
                      >
                        {{ t.type === 'V' ? '+' : '-' }}{{ formatNumber(t.qte * (t.type === 'V' ? t.puv_t : t.pua_t)) }}
                      </span>
                      <span class="text-xs text-gray-200">DZD</span>
                    </div>
                  </td>
                </tr>

                <!-- Mobile Card -->
                <tr class="lg:hidden">
                  <td class="p-4">
                    <div 
                      class="bg-white/5 rounded-xl border shadow-sm p-4 mb-3"
                      :class="t.type === 'V' ? 'border-green-200' : 'border-red-200'"
                    >
                      <!-- Card Header -->
                      <div class="flex items-start justify-between mb-3">
                        <div class="flex items-center gap-3">
                          <UAvatar 
                            :src="t.product?.image" 
                            :alt="t.product?.name"
                            size="md"
                            class="border-2"
                            :class="t.type === 'V' ? 'border-green-200' : 'border-red-200'"
                          />
                          <div>
                            <p class="font-bold text-gray-200">{{ t.product?.name }}</p>
                            <p class="text-xs text-gray-200">{{ t.product?.type }}</p>
                          </div>
                        </div>
                        <div class="text-right">
                          <div 
                            class="px-3 py-1 rounded-full text-xs font-bold"
                            :class="t.type === 'V' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                          >
                            {{ t.type === 'V' ? 'VENTE' : 'ACHAT' }}
                          </div>
                        </div>
                      </div>

                      <!-- Transaction Details -->
                      <div class="grid grid-cols-2 gap-4 mb-3">
                        <!-- Purchase Price -->
                        <div class="space-y-1">
                          <p class="text-xs text-gray-200">Prix Achat</p>
                          <div class="flex items-center gap-1">
                            <UIcon name="i-mdi-arrow-down" class="text-red-500 text-xs" />
                            <span class="font-medium text-gray-200">{{ formatNumber(t.pua_t) }}</span>
                            <span class="text-xs text-gray-200">DZD</span>
                          </div>
                        </div>

                        <!-- Sale Price -->
                        <div class="space-y-1">
                          <p class="text-xs text-gray-200">Prix Vente</p>
                          <div class="flex items-center gap-1">
                            <UIcon name="i-mdi-arrow-up" class="text-green-500 text-xs" />
                            <span class="font-medium text-gray-200">{{ formatNumber(t.puv_t) }}</span>
                            <span class="text-xs text-gray-200">DZD</span>
                          </div>
                        </div>

                        <!-- Quantity -->
                        <div class="space-y-1">
                          <p class="text-xs text-gray-200">Quantité</p>
                          <div class="flex items-center gap-1">
                            <UIcon name="i-mdi-package-variant" class="text-blue-500 text-xs" />
                            <span class="font-medium text-gray-200">{{ t.qte }}</span>
                            <span class="text-xs text-gray-200">unités</span>
                          </div>
                        </div>

                        <!-- Total Amount -->
                        <div class="space-y-1">
                          <p class="text-xs text-gray-200">Montant</p>
                          <div class="flex items-center gap-1">
                            <span 
                              class="font-bold text-lg"
                              :class="t.type === 'V' ? 'text-green-600' : 'text-red-600'"
                            >
                              {{ t.type === 'V' ? '+' : '-' }}{{ formatNumber(t.qte * (t.type === 'V' ? t.puv_t : t.pua_t)) }}
                            </span>
                            <span class="text-xs text-gray-200">DZD</span>
                          </div>
                        </div>
                      </div>

                      <!-- Date & Actions -->
                      <div class="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div class="flex items-center gap-2">
                          <UIcon name="i-mdi-calendar" class="text-gray-400 text-sm" />
                          <span class="text-xs text-gray-300">{{ formatDate(t.date) }}</span>
                        </div>
                        <UButton
                          icon="i-mdi-eye"
                          size="xs"
                          variant="ghost"
                          :to="`/produits/${t.idProduct}`"
                          class="text-gray-200 hover:text-gray-700"
                        >
                          Détails
                        </UButton>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <!-- Table Footer -->
        <div class="px-6 py-4 border-t border-gray-200 bg-gray-50/10">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div class="text-sm text-gray-300">
              Affichage de {{ transaction?.transactions?.length || 0 }} transactions
            </div>
            <div class="flex items-center gap-4">
              <UPagination
                v-if="transaction!.transactions.length > 10"
                
                :page-count="10"
                :total="transaction?.transactions.length"
              />

            </div>
          </div>
        </div>
      </div>

      <!-- Insights Section -->
      <div class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Profit Insights -->
        <div class="bg-white/5 rounded-2xl p-6 shadow-lg border border-gray-200">
          <h3 class="text-lg font-bold text-gray-300 mb-4">Insights Financiers</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-300">Bénéfice moyen par vente</span>
              <span class="font-bold text-emerald-600">+{{ calculateAverageProfit() }} DZD</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-300">Coût moyen par achat</span>
              <span class="font-bold text-red-600">-{{ calculateAverageCost() }} DZD</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-300">Taux de conversion</span>
              <span class="font-bold text-blue-600">{{ calculateConversionRate() }}%</span>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white/5 rounded-2xl p-6 shadow-lg border border-gray-200 lg:col-span-2">
          <h3 class="text-lg font-bold text-gray-300 mb-4">Activité Récente</h3>
          <div class="space-y-4">
            <div 
              v-for="(t, index) in recentTransactions"
              :key="index"
              class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50/10 transition-colors"
            >
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center"
                :class="t.type === 'V' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'"
              >
                <UIcon :name="t.type === 'V' ? 'i-mdi-cart-arrow-up' : 'i-mdi-cart-arrow-down'" />
              </div>
              <div class="flex-1">
                <p class="font-medium text-gray-200">{{ t.product?.name }}</p>
                <p class="text-sm text-gray-200">{{ formatDate(t.date) }}</p>
              </div>
              <div class="text-right">
                <p 
                  class="font-bold"
                  :class="t.type === 'V' ? 'text-green-600' : 'text-red-600'"
                >
                  {{ t.type === 'V' ? '+' : '-' }}{{ formatNumber(t.qte * (t.type === 'V' ? t.puv_t : t.pua_t)) }}
                </p>
                <p class="text-xs text-gray-200">DZD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang='ts'>
import type { BreadcrumbItem } from '@nuxt/ui';
import type { TransactionsProducts } from '~/types/GeneraleT';

const item: BreadcrumbItem[] = [
  {
    label: 'Dashboard',
    icon: 'i-material-symbols-dashboard-outline',
    to: '/dashboard',
  },
  {
    label: 'Transactions',
    icon: 'i-lucide-arrow-right-left',
  },
];

const { data: transaction, pending } = useFetch<TransactionsProducts>('/api/Transactions', {
  server: false,
  lazy: true
});

const numberOfselles = computed(() => {
  if (!transaction.value || transaction.value.transactions.length === 0) {
    return 0;
  }
  return transaction.value.transactions.reduce((sum, tran) => {
    return tran.type === 'V' ? sum + 1 : sum;
  }, 0);
});

// Helper Functions
const formatNumber = (num: number) => {
  return new Intl.NumberFormat('fr-DZ').format(num);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const calculateTotalProfit = () => {
  if (!transaction.value?.transactions?.length) return 0;
  
  return transaction.value.transactions.reduce((total, t) => {
    if (t.type === 'V') {
      return total + (t.qte * t.puv_t);
    } else {
      return total - (t.qte * t.pua_t);
    }
  }, 0);
};

const calculateAverageProfit = () => {
  const sales = transaction.value?.transactions?.filter(t => t.type === 'V') || [];
  if (!sales.length) return 0;
  
  const totalProfit = sales.reduce((sum, t) => sum + ((t.puv_t - t.pua_t) * t.qte), 0);
  return Math.round(totalProfit / sales.length);
};

const calculateAverageCost = () => {
  const purchases = transaction.value?.transactions?.filter(t => t.type !== 'V') || [];
  if (!purchases.length) return 0;
  
  const totalCost = purchases.reduce((sum, t) => sum + (t.pua_t * t.qte), 0);
  return Math.round(totalCost / purchases.length);
};

const calculateConversionRate = () => {
  const total = transaction.value?.transactions?.length || 0;
  const sales = numberOfselles.value;
  
  if (total === 0) return 0;
  return Math.round((sales / total) * 100);
};

const recentTransactions = computed(() => {
  if (!transaction.value?.transactions?.length) return [];
  return [...transaction.value.transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
});
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, opacity, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, #10B981 0%, #3B82F6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Hover effects */
.hover-lift:hover {
  transform: translateY(-2px);
}

/* Responsive table adjustments */
@media (max-width: 1024px) {
  .responsive-table {
    display: block;
  }
  
  .responsive-table thead {
    display: none;
  }
  
  .responsive-table tbody {
    display: block;
  }
  
  .responsive-table tr {
    display: block;
    margin-bottom: 1rem;
  }
  
  .responsive-table td {
    display: block;
    text-align: right;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .responsive-table td::before {
    content: attr(data-label);
    float: left;
    font-weight: 600;
    color: #4b5563;
  }
}
</style>