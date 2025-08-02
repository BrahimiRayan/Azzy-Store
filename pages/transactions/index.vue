<template>
   
   <div v-if="pending">
        <SkeletoneTransactions/>
   </div>

<div v-if="!pending">    
   <UBreadcrumb :items="item" class="mt-8 " />  

  <section class="grid grid-cols-3 gap-8 my-7">
     <div class="border-2 border-white/80 px-6 py-8 text-center rounded-xl">
       <UIcon name="i-lucide-arrow-right-left" size="26" class="text-green-500"/> 
        <h2 class="text-xl font-extrabold text-white/80 mb-4">Nombre de Transactions</h2>
        <p v-if="transaction && transaction.transactions.length > 0" class="text-3xl font-extrabold text-green-500">{{transaction.transactions.length}} <span class="text-xs text-white/70">Transactions</span></p>
        <p v-else class="text-3xl font-extrabold text-green-500">-- <span class="text-xs text-white/70">Transactions</span></p>
     </div>

     <div class="border-2 border-white/80 px-6 py-8 text-center rounded-xl ">
        <UIcon name="i-lucide-shopping-basket" size="26" class="text-green-500"/>
        <h2 class="text-xl font-extrabold text-white/80 mb-4">Transactions d'achats </h2>
        <p v-if="transaction && transaction.transactions.length > 0" class="text-3xl font-extrabold text-green-500">{{transaction.transactions.length - numberOfselles }}  <span class="text-xs text-white/70">Transactions</span></p>
        <p v-else class="text-3xl font-extrabold text-green-500">-- <span class="text-xs text-white/70">Transactions</span></p>
     </div>

     <div class="border-2 border-white/80 px-6 py-8 text-center rounded-xl ">
        <UIcon name="i-material-symbols-sell" size="26" class="text-green-500"/>
        <h2 class="text-xl font-extrabold text-white/80 mb-4">Transactions de ventes</h2>
        <p v-if="numberOfselles" class="text-3xl font-extrabold text-green-500">{{ numberOfselles }} <span class="text-xs text-white/70">Transactions</span></p>
        <p v-else class="text-3xl font-extrabold text-green-500">-- <span class="text-xs text-white/70">Transactions</span></p>
     </div>
  </section>


 <USeparator class="text-[var(--green-grace)] w-xl my-10 mx-auto " label="Mes Transactions"
      :ui="{ label: 'font-extrabold p-2 rounded-xl border border-transparent hover:text-[--deep-green] hover:border-[var(--deep-green)] cursor-pointer transition-all duration-300 ease-in-out' }" />

  <p class="my-4 flex items-center">
      <UIcon name="i-game-icons-info" class="text-[var(--green-grace)] size-5 mr-2" />
      <span class="text-gray-400 text-sm font-bold">
        Suivez en détail chacune de vos transactions d'achat et de vente.
      </span>
  </p>

  <div class="ml-4 mb-3">
      <div class="flex gap-2 items-center text-sm text-white/80 font-extrabold">
        <div class="w-3 h-3 bg-red-500 border mr-2"></div>
        Transaction d'achat.
      </div>

     <div class="flex gap-2 items-center text-sm text-white/80 font-extrabold">
        <div class="w-3 h-3 bg-green-500 border mr-2"></div>
        Transaction de vente.
      </div>
  </div>

  <section >
        <ul>
            <li class="grid grid-cols-8 text-center border rounded-xl p-4 mb-3 bg-white/10">
                <h2 class="flex items-center justify-center gap-x-2 text-sm font-extrabold">
                        <UIcon name="i-lucide-image" size="18" class="text-green-500" />
                        Avatar
                </h2>
                <h2 class="flex items-center justify-center gap-x-2 text-sm font-extrabold">
                        <UIcon name="i-lucide-box" size="18" class="text-green-500" />
                        Produits
                </h2>

                <h2 class="flex items-center justify-center gap-x-2 text-sm font-extrabold">
                        <UIcon name="i-material-symbols-category" size="18" class="text-green-500" />
                        Catégorie
                </h2>

                <h2 class="flex items-center justify-center gap-x-2 text-sm font-extrabold">
                        <UIcon name="i-lucide-coins" size="18" class="text-green-500" />
                        Prix U. Achat
                </h2>
                
                <h2 class="flex items-center justify-center gap-x-2 text-sm font-extrabold">
                        <UIcon name="i-lucide-hand-coins" size="18" class="text-green-500" />
                        Prix U. Vente
                </h2>

                <h2 class="flex items-center justify-center gap-x-2 text-sm font-extrabold">
                        <UIcon name="i-fluent-mdl2-quantity" size="18" class="text-green-500" />
                        Quantité
                </h2>

                <h2 class="flex items-center justify-center gap-x-2 text-sm font-extrabold">
                        <UIcon name="i-lucide-calendar" size="18" class="text-green-500" />
                        Date
                </h2>

                <h2 class="flex items-center justify-center gap-x-2 text-sm font-extrabold">
                       <UIcon name="i-lucide-arrow-right-left" size="18" class="text-green-500"/> 
                        Transaction
                </h2>
            </li>
            <span v-if="transaction && transaction.transactions.length > 0">

                    <li v-for="(t, index) in transaction.transactions" 
                        :key="index"
                        class="grid grid-cols-8 text-center shadow-sm hover:shadow-white/40 rounded-xl p-4 mb-3 items-center text-sm font-extrabold hover:scale-102 transition-all duration-300 ease-in-out"
                        :class="t.type ==='V' ? 'bg-white/20 hover:bg-green-700' : 'bg-white/20 hover:bg-red-800'"
                     >
                        <NuxtLink :to="`/produits/${t.idProduct}`">
                         <UAvatar :src="t.product.image" :alt="t.product.name" class="border rounded-lg bg-black/30" />
                        </NuxtLink>
                        
                        <NuxtLink :to="`/produits/${t.idProduct}`">
                         {{ t.product.name }}
                        </NuxtLink>
                        
                        <p>{{ t.product.type }}</p>
                        <p>{{ t.pua_t }}</p>
                        <p>{{ t.puv_t }}</p>
                        <p>{{ t.qte }}</p>
                        <p>{{ t.date }}</p>
                        <p>
                            <UIcon v-if="t.type === 'V'" name="i-lucide:arrow-up-narrow-wide" size="18" class="text-green-500"/>
                            <UIcon v-else name="i-lucide:arrow-down-narrow-wide" size="18" class="text-red-500"/>
                        </p>
                        
                    </li>
            </span>

            <div v-else class="border border-white/60 flex flex-col items-center justify-center">
                
                <div class="bg-[url('/assets/pics/Empty.png')] bg-no-repeat bg-center bg-contain w-90 h-80"><p class="text-sm text-center mt-10 font-extrabold text-white/70">Aucune transaction effectuée pour le moment !</p></div>
            </div>

        </ul>
  </section>
</div> 
  
</template>
    
<script setup lang='ts'>
import type { BreadcrumbItem } from '@nuxt/ui';
import type { TransactionsProducts } from '~/types/GeneraleT';

const item: BreadcrumbItem[] =
  [
  {
    label: 'Dashboard',
    icon: 'i-material-symbols-dashboard-outline',
    to: '/dashboard',
  },
  {
    label: 'Transactions',
    icon: 'i-lucide-arrow-right-left',
  },]

const { data : transaction , pending} = useFetch<TransactionsProducts>('/api/Transactions',{
    server : false,
    lazy : true
});

const numberOfselles = computed(() => {
        if (!transaction.value || transaction.value.transactions.length === 0) {
                return 0;
        }
        return transaction.value.transactions.reduce((sum, tran) => {
                return tran.type === 'V' ? sum + 1 : sum;
        }, 0);
});

</script>
    