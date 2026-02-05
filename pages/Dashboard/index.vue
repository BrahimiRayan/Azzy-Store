<template>

  <div v-if="pending">
    <SkeletoneDashboard />
  </div>

  <div v-else class="max-sm:px-4 sm:px-8 max-sm:py-6 sm:py-6 lg:px-0 lg:py-0">
    
    <div class="mt-8" >

      <UBreadcrumb :items="item" 
        class="sm:mt-8 mt-2" 
        :ui="{
          linkLabel : 'max-sm:text-xs',
        }"
      />

      <USeparator class="text-(--green-grace) lg:w-xl mt-10 mx-auto " label="Statistiques des ventes et achats"
        :ui="{ label: 'font-extrabold p-2 rounded-xl border border-transparent hover:text-[--deep-green] hover:border-[var(--deep-green)] cursor-pointer transition-all duration-300 ease-in-out' }" />

      <p class="mb-10 mt-3 flex items-center">
        <UIcon name="i-game-icons-chart" class="text-(--green-grace) size-5 mr-2" />
        <span class="text-gray-400 text-sm font-bold ">
          Inspecter et suivre vos dépenses, ventes et bénéfices pour cette année.
        </span>
      </p>

      <!-- chart  -->
      <div class="p-4 border-2 border-white/20 rounded-lg lg:flex gap-8">

        <div class="lg:w-82 bg-white/5 rounded-lg sm:flex items-center justify-center lg:flex-col gap-8 mb-4 lg:mb-0">
          
          <div class="max-sm:flex max-sm:justify-between max-sm:w-full max-sm:mb-4 max-sm:p-1 w-[90%]">
              <span class="flex items-center ">
                <UAvatar icon="i-lucide-banknote-arrow-up" class="text-green-400 " size="lg"/>
                <h2 class="text-xs lg:text-sm text-white/50 font-extrabold">Chiffre d'affaires Annuel</h2>
            </span>

            <span>
              <p v-if="AnnuelSellings" class="text-xl max-sm:text-sm lg:text-3xl text-center mt-2 text-extraboald text-white">{{ AnnuelSellings }} <span class="max-sm:hidden text-xs">DZD</span></p> 
              <p v-else class="text-3xl text-center mt-2 text-extraboald text-white">--</p> 
            </span>
          </div>

          <div class="w-[90%] sm:border-l sm:border-r px-4 border-white/20 lg:border-l-0 lg:border-r-0 lg:p-0 max-sm:flex max-sm:justify-between max-sm:w-full max-sm:mb-4 max-sm:p-1">
            <span class="flex items-center ">
              <UAvatar icon="i-lucide-hand-coins" class="text-red-400 " size="lg"/>
              <h2 class="text-xs lg:text-sm text-white/50 font-extrabold">Coût d'achat Annuel</h2>
            </span>

            <span>
              <p v-if="Annuelbuyings" class="text-xl max-sm:text-sm lg:text-3xl text-center mt-2 text-extraboald text-white">{{ Annuelbuyings }} <span class="max-sm:hidden text-xs">DZD</span></p> 
              <p v-else class="text-3xl text-center mt-2 text-extraboald text-white">--</p> 
            </span>
          </div>


          <div class="max-sm:flex max-sm:justify-between max-sm:w-full max-sm:mb-4 max-sm:p-1 w-[90%]">
            <span class="flex items-center ">
              <UAvatar icon="i-lucide-trending-up-down" class="text-yellow-400 " size="lg"/>
              <h2 class="text-xs lg:text-sm text-white/50 font-extrabold">{{AnnuelBenifice >= 0 ? "Benifice Annuel" : "Pert"}}</h2>
            </span>

            <span>
              <p v-if="AnnuelBenifice" class="text-xl max-sm:text-sm lg:text-3xl text-center mt-2 text-extraboald text-white">{{ AnnuelBenifice }} <span class="max-sm:hidden text-xs">DZD</span></p> 
              <p v-else class="text-3xl text-center mt-2 text-extraboald text-white">--</p> 
            </span>
          
          </div>

        </div>
        
        <Chart :chartData="Cdatas" />
      </div>

    </div>

    <USeparator class="text-(--green-grace) lg:w-xl my-10 mx-auto " label="Informations de mois courant"
      :ui="{ label: 'font-extrabold p-2 rounded-xl border border-transparent hover:text-[--deep-green] hover:border-[var(--deep-green)] cursor-pointer transition-all duration-300 ease-in-out' }" />

    <p class="mt-2 flex items-center">
      <UIcon name="i-game-icons-info" class="text-(--green-grace) size-5 mr-2" />
      <span class="text-gray-400 text-sm font-bold">
        Vous trouverez ici les Informations générales de votre stock de produits pour ce mois.
      </span>
    </p>

    <StatesStatcard 
            :totalStockProducts="transactions?.stats.length" 
            :totalProductSelled="ThisMonthtotalSellings" 
            :totalProductBought="ThisMonthtotalBuyings "
            :totalCommand="transactions?.ordersNumber.total"
            :shopProducts="transactions?.stats"
            />

    <div v-if="transactions?.mvp" class="block">

        <USeparator class="text-(--green-grace) lg:w-xl my-10 mx-auto " label="Les MVPs"
          :ui="{ label: 'font-extrabold p-2 rounded-xl border border-transparent hover:text-[--deep-green] hover:border-[var(--deep-green)] cursor-pointer transition-all duration-300 ease-in-out' }" />

          <p class="mt-2 flex items-center ">
            <UIcon name="i-game-icons-podium-winner" class="text-(--green-grace) size-5 mr-2" />
            <span class="text-gray-400 text-sm font-bold">
              Les produits ayant généré le plus de chiffre d'affaires et vendu le plus d'unités cette année.
            </span>
          </p>
        <!-- les mvps -->
        <div>
          <div v-if="mostSellesByUnite && transactions.mvp[0] && mostSellesByUnite.transactions.totalSoldByunit !==0 && transactions.mvp[0].transactions.totalSoldByunit !==0" class="grid grid-cols-1 lg:grid-cols-2 rounded-lg bg-white/5 p-2 mt-4 lg:mt-12" >
            <div class="mt-32  flex flex-col items-center justify-center">
              <div class="w-42 h-42 bg-blue-400/30 rounded-full -mb-30 animate-bounce duration-4000 shadow-xl shadow-black">
                <div>
                  <img v-if="transactions.mvp[0].image" :src="transactions.mvp[0].image" class="w-42 h-42 rounded-full shadow-2xl shadow-green-300" :alt="transactions.mvp[0].name">
                  <img v-else src="../../assets/pics/no-image.png" class="w-42 h-42 rounded-full shadow-2xl shadow-white"  :alt="transactions.mvp[0].name">
                </div>
              </div>
  
              <div class="w-68 h-54 bg-[url('/number0.png')] bg-no-repeat bg-center bg-contain "></div>
              <div class=" text-center lg:w-92 -mt-10">
                <h2 class="text-2xl font-extrabold text-shadow-lg text-shadow-white/60 my-3">MVP</h2>
                <p class="text-xs my-2 text-white/50 ">Avec <span class="text-3xl text-green-500 font-black">{{ transactions.mvp[0].transactions.averagePuv *  transactions.mvp[0].transactions.totalSoldByunit }} </span> <span> DZD</span></p>
                <p class="text-sm text-white/50 border border-white/10 bg-white/5 p-2 rounded-lg">
                  <span class="block text-center text-lg text-green-500 font-extrabold">{{ transactions.mvp[0].name }}</span>
                  "Le produit leader en termes de <span class="text-white">revenus</span> sur l'année à ce jour."
                </p>
              </div>
            </div>
  
            <div v-if="mostSellesByUnite" class="mt-32  flex flex-col items-center justify-center" >
          
              <div class="w-42 h-42 bg-blue-400/30 rounded-full -mb-30 animate-bounce duration-4000 shadow-xl shadow-black flex items-center justify-center">
                <img v-if="mostSellesByUnite.image" :src="mostSellesByUnite.image" class="w-42 h-42 rounded-full shadow-2xl shadow-yellow-200" :alt="mostSellesByUnite.name">
                  <img v-else src="../../assets/pics/no-image.png" class="w-42 h-42 rounded-full shadow-2xl shadow-white"  :alt="mostSellesByUnite.name">
              </div>
              <div class="w-68 h-54 bg-[url('/number0.png')] bg-no-repeat bg-center bg-contain "></div>
              <div class=" text-center lg:w-92 -mt-10">
                <h2 class="text-2xl font-extrabold text-shadow-lg text-shadow-white/60 my-3">MVP</h2>
                
                <p class="text-xs my-2 text-white/50">Avec <span class="text-3xl font-black text-yellow-500">{{ mostSellesByUnite.transactions.totalSoldByunit }} </span> <span> Unités</span></p>
                <p class="text-sm text-white/50 border border-white/10 bg-white/5 p-2 rounded-lg">
                  <span class="block text-center text-lg text-yellow-500 font-extrabold">{{ mostSellesByUnite.name }}</span>
                  "Le produit leader en nombre <span class="text-white">d'unités vendues</span> sur l'année à ce jour."
                </p>
              </div>
            </div>
          </div>

          <div v-else class="rounded-lg bg-white/5 p-2 mt-2">
              <p class="text-2xl text-center text-white/60 my-20">Aucune transactions effectuées...</p>
          </div>
        </div>

    </div> 

  </div>

</template>

<script setup lang="ts">

// the breadcrumb item  
import type { BreadcrumbItem } from '@nuxt/ui';
import { fr_MONTHS } from '~/lib/consts';
import type { dashboaerdInformationFetchresponce, mvpType, ProductTransactionsArrayType } from '~/types/GeneraleT';
import { CalculateMonthlyBenifice, getSellesOrExpensesForMonths, getTheHighestByUnit } from '~/Utils/datasHelpers';

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
let mostSellesByUnite = ref<mvpType>()
const Cdatas = computed(() => {
   achats = getSellesOrExpensesForMonths(transactions.value?.transactions || [], "A");
   ventes = getSellesOrExpensesForMonths(transactions.value?.transactions || [], "V");
   const Benefice = CalculateMonthlyBenifice(ventes , achats);
   if(transactions.value){
     AnnuelSellings.value = getAnnualRevenue(transactions.value?.transactions);
     Annuelbuyings.value = getAnnualDepence(transactions.value?.transactions);
     AnnuelBenifice.value = Benefice.reduce((sum , b)=> sum + b , 0);
     mostSellesByUnite.value = getTheHighestByUnit(transactions.value.mvp);
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

