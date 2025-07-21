<template>

  <div v-if="pending">
    <p class="text-4xl">Pending ...</p>
  </div>
<div v-else>


  <div class="mt-8" >

    <UBreadcrumb :items="item" class="mb-8 "/>

    <USeparator class="text-[var(--green-grace)] w-xl mt-10 mx-auto " label="Statistiques des ventes et achats"
      :ui="{ label: 'font-extrabold p-2 rounded-xl border border-transparent hover:text-[--deep-green] hover:border-[var(--deep-green)] cursor-pointer transition-all duration-300 ease-in-out' }" />

    <p class="mb-10 mt-3 flex items-center">
      <UIcon name="i-game-icons-chart" class="text-[var(--green-grace)] size-5 mr-2" />
      <span class="text-gray-400 text-sm font-bold ">
        Inspecter et suivre vos dépenses, ventes et bénéfices pour cette année.
      </span>
    </p>

    <!-- chart  -->
    <div class="p-4 border-2 border-white/20 rounded-lg flex gap-8">

      <div class="w-82 bg-white/5 rounded-lg flex items-center justify-center flex-col gap-8">
        
        <div class="w-[90%]">
            <span class="flex items-center ">
              <UAvatar icon="i-lucide-banknote-arrow-up" class="text-green-400 " size="lg"/>
              <h2 class="text-sm text-white/50 font-extrabold">Chiffre d'affaires Annuel</h2>
          </span>

          <span>
            <p v-if="AnnuelSellings" class="text-3xl text-center mt-2 text-extraboald text-white">{{ AnnuelSellings }} <span class="text-xs">DZD</span></p> 
            <p v-else class="text-3xl text-center mt-2 text-extraboald text-white">--</p> 
          </span>
        </div>

        <div class="w-[90%]">
          <span class="flex items-center ">
            <UAvatar icon="i-lucide-hand-coins" class="text-red-400 " size="lg"/>
            <h2 class="text-sm text-white/50 font-extrabold">Coût d'achat Annuel</h2>
          </span>

          <span>
            <p v-if="Annuelbuyings" class="text-3xl text-center mt-2 text-extraboald text-white">{{ Annuelbuyings }} <span class="text-xs">DZD</span></p> 
            <p v-else class="text-3xl text-center mt-2 text-extraboald text-white">--</p> 
          </span>
        </div>


        <div class="w-[90%]">
          <span class="flex items-center ">
            <UAvatar icon="i-lucide-trending-up-down" class="text-yellow-400 " size="lg"/>
            <h2 class="text-sm text-white/50 font-extrabold">{{AnnuelBenifice >= 0 ? "Benifice Annuel" : "Pert"}}</h2>
          </span>

          <span>
            <p v-if="AnnuelBenifice" class="text-3xl text-center mt-2 text-extraboald text-white">{{ AnnuelBenifice }} <span class="text-xs">DZD</span></p> 
            <p v-else class="text-3xl text-center mt-2 text-extraboald text-white">--</p> 
          </span>
         
        </div>

      </div>
      
      <Chart :chartData="Cdatas" />
    </div>

  </div>

  <USeparator class="text-[var(--green-grace)] w-xl my-10 mx-auto " label="Informations de mois courant"
    :ui="{ label: 'font-extrabold p-2 rounded-xl border border-transparent hover:text-[--deep-green] hover:border-[var(--deep-green)] cursor-pointer transition-all duration-300 ease-in-out' }" />

  <p class="mt-2 flex items-center">
    <UIcon name="i-game-icons-info" class="text-[var(--green-grace)] size-5 mr-2" />
    <span class="text-gray-400 text-sm font-bold">
      Vous trouverez ici les Informations générales de votre stock de produits pour ce mois.
    </span>
  </p>

  <StatesStatcard 
          :totalStockProducts="transactions?.stats.length" 
          :totalProductSelled="ThisMonthtotalSellings" 
          :totalProductBought="ThisMonthtotalBuyings "
          :totalCommand="34"
          :shopProducts="transactions?.stats"
          />

  <div class="mt-32  flex flex-col items-center justify-center">
    <div class="w-42 h-42 bg-blue-400 rounded-full -mb-30 animate-bounce duration-4000 shadow-xl shadow-black">
      <img src="../../assets/pics/no-image.png" class="w-42 h-42 rounded-full shadow-2xl shadow-white"  alt="">
    </div>
    <div class="w-68 h-54 bg-[url('/number0.png')] bg-no-repeat bg-center bg-contain "></div>
    <div class=" text-center w-92 -mt-10">
      <h2 class="text-2xl font-extrabold text-shadow-lg text-shadow-white/60 my-3">MVP</h2>
      <p class="text-sm text-white/50 border border-white/10 bg-white/5 p-2 rounded-lg">"Le produit leader en termes de revenus sur l'année à ce jour."</p>
    </div>
  </div>
</div>  
</template>

<script setup lang="ts">

// the breadcrumb item  
import type { BreadcrumbItem } from '@nuxt/ui';
import { fr_MONTHS } from '~/lib/consts';
import type { dashboaerdInformationFetchresponce, ProductTransactionsArrayType } from '~/types/GeneraleT';
import { CalculateMonthlyBenifice, getSellesOrExpensesForMonths } from '~/Utils/datasHelpers';

const month = new Date().getMonth()


const item: BreadcrumbItem[] =
  [
    {
      label: 'Dashboard',
      icon: 'i-material-symbols-dashboard-outline',
    },
  ]

  const { data : transactions , pending } = useFetch<dashboaerdInformationFetchresponce>(`/api/Transactions/dashboard` , {
    lazy : true,
    server : false
  });

  function getAnnualRevenue(
  transactions: ProductTransactionsArrayType
): number {
  return transactions
    .filter(t => t.TransactionType === "V")
    .reduce((total, transaction) => total + transaction.totalSaleAmount, 0);
}

function getAnnualDepence(
  transactions: ProductTransactionsArrayType
): number {
  return transactions
    .filter(t => t.TransactionType === "A")
    .reduce((total, transaction) => total + transaction.totalPurchaseAmount, 0);
}



let achats : ProductTransactionsArrayType = []
let ventes : ProductTransactionsArrayType = []
let AnnuelSellings = ref<number>(0);
let Annuelbuyings = ref<number>(0);
let AnnuelBenifice = ref<number>(0);

let ThisMonthtotalSellings = ref<number>(0);
let ThisMonthtotalBuyings  = ref<number>(0)

const Cdatas = computed(() => {
   achats = getSellesOrExpensesForMonths(transactions.value?.transactions || [], "A");
   ventes = getSellesOrExpensesForMonths(transactions.value?.transactions || [], "V");
   const Benefice = CalculateMonthlyBenifice(ventes , achats);
   if(transactions.value){
     AnnuelSellings.value = getAnnualRevenue(transactions.value?.transactions);
     Annuelbuyings.value = getAnnualDepence(transactions.value?.transactions);
     AnnuelBenifice.value = Benefice.reduce((sum , b)=> sum + b , 0);
    }
   ThisMonthtotalSellings.value = ventes[month].totalQuantity
   ThisMonthtotalBuyings.value = achats[month].totalQuantity
  return {
    labels: fr_MONTHS,
    datasets: [
      {
        label: 'Achats',
        data: achats.map(t => t.totalPurchaseAmount),
        borderColor: '#E74C3C',
        backgroundColor: '#E74C3C',
      },
      {
        label: 'Ventes',
        data: ventes.map(t => t.totalSaleAmount),
        borderColor: '#2ECC71',
        backgroundColor: '#39FF14',
      },
        {
        label: 'Benefice',
        data: Benefice,
        borderColor: '#F1C40F',
        backgroundColor: '#F1C40F',
    }
    ]
  };
});

</script>

