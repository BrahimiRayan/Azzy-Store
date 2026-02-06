<template>
    <div v-if="pending || isTransactionsPending">
        <SkeletoneProduct />
    </div>
    
    <div v-else-if="error || !product" class="flex items-center justify-center h-screen">
        <h1 class="text-2xl text-red-500 font-extrabold">Produit non trouvé</h1>
    </div>

    <div v-else class="max-sm:px-4 sm:px-8 max-sm:py-6 sm:py-6 lg:px-0 lg:py-0">
        <UBreadcrumb :items="item" class="sm:mt-8 mt-2" :ui="{
            linkLabel : 'max-sm:text-xs',
        }"/>
        <USelectMenu 
            icon="i-lucide-calendar-1"
            v-model="Monthvalue" 
            :items="months"
            class="w-48 mt-4 lg:mt-0" 
            placeholder="Choisir un moin..."
            :ui="{
                
                content : 'bg-[var(--deep-dark-blue)] ring-white/20',
                item : 'border-b-1 border-white/20 hover:bg-white/10 p-2',
                input : 'bg-[var(--deep-dark-blue)]',
                base : 'bg-[var(--deep-dark-blue)] ring-white/40 ring-2',
            }"
            />
        <div class="flex max-sm:flex-col sm:flex-col items-center justify-between my-9 gap-y-3 ">

            <div class="flex lg:flex-col sm:justify-between max-sm:justify-between items-center gap-2 border bg-black/10 rounded-xl p-5 flex-1 sm:w-full max-sm:w-full">
                <h1 class="text-sm lg:text-xl text-green-500 font-extrabold">Nombre vendus ce mois</h1>
                <div class="flex items-baseline gap-1">
                    <span v-if="NumberOfmonthSelles" class="text-lg lg:text-3xl font-extrabold">{{NumberOfmonthSelles}}</span>
                    <span v-else class="text-3xl font-extrabold">--</span>
                    <p class="text-xs text-gray-400 ">unite</p>
                </div>
                <UIcon name="i-ic-outline-sell" class="text-(--green-grace) size-4 lg:size-6 mr-2" />
            </div>

            <div class="flex lg:flex-col sm:justify-between max-sm:justify-between items-center gap-2 border bg-black/10 rounded-xl p-5 flex-1 sm:w-full max-sm:w-full">
                
                    <h1 class="text-sm lg:text-xl font-extrabold" :class="MonthBenifice < 0 ? 'text-red-500' : MonthBenifice > 0 ? 'text-green-500' : 'text-gray-400' ">Situation financière : 
                        {{ 
                            MonthBenifice < 0 ? 'Perte' : MonthBenifice > 0 ? 'Bénéfice' : 'Équilibre' 
                        }}
                    </h1>    
                
                <div class="flex items-baseline gap-1">
                    <span v-if="MonthBenifice" class="text-3xl font-extrabold">{{MonthBenifice}}</span>
                    <span v-else class="text-3xl font-extrabold">--</span>
                    <p class="text-xs text-gray-400 ">DZD</p>
                </div>
                <UIcon 
                :name="MonthBenifice < 0 ? 'i-hugeicons-trade-down' : MonthBenifice > 0 ? 'i-hugeicons-trade-up' : 'i-tdesign-money' "
                class="lg:size-6 size-4 mr-2" 
                :class="MonthBenifice < 0 ? 'text-red-500' : MonthBenifice > 0 ? 'text-green-500' : 'text-gray-400' "
                />
            </div>

            <div class="flex lg:flex-col sm:justify-between max-sm:justify-between items-center gap-2 border bg-black/10 rounded-xl p-5 flex-1 sm:w-full max-sm:w-full">
                <h1 class="text-sm lg:text-xl text-green-500 font-extrabold">Chiffre d'affaires brut</h1>
                <div class="flex items-baseline gap-1">
                    <p class="text-lg lg:text-3xl font-extrabold">{{BruteSum}}</p>
                    <p class="text-xs text-gray-400 ">DZD</p>
                </div>
                <UIcon name="i-bx-stats" class="text-(--green-grace) size-4 lg:size-6 mr-2" />
            </div>

        </div>

        <div>
            <Chart :chartData="data" />

        </div>

        <USeparator class="text-(--green-grace) lg:w-xl my-10 mx-auto " label="Informations de produit"
            :ui="{ label: 'font-extrabold p-2 rounded-xl border border-transparent hover:text-[--deep-green] hover:border-[var(--deep-green)] cursor-pointer transition-all duration-300 ease-in-out' }" />

        <ModifyProduct :produit="product" @refresh-product="refresh" />
    </div>
</template>

<script setup lang='ts'>
import type { ProductTransactionsArrayType, ProductTransactionsType, Produit } from '~/types/GeneraleT';
import type { BreadcrumbItem } from '@nuxt/ui';
import { CalculateMonthlyBenifice, getSellesOrExpensesForMonths } from '~/Utils/datasHelpers';
import { fr_MONTHS } from '~/lib/consts';


const id = useRoute().params.id;

const date = new Date()
const months = ref([
  { label: 'Janvier', value: 1 },
  { label: 'Février', value: 2 },
  { label: 'Mars', value: 3 },
  { label: 'Avril', value: 4 },
  { label: 'Mai', value: 5 },
  { label: 'Juin', value: 6 },
  { label: 'Juillet', value: 7 },
  { label: 'Août', value: 8 },
  { label: 'Septembre', value: 9 },
  { label: 'Octobre', value: 10 },
  { label: 'Novembre', value: 11 },
  { label: 'Décembre', value: 12 }
])

const current = months.value.find(m=> m.value === date.getMonth() +1)
const Monthvalue = ref(current)

const month = computed(()=>{
    if(!Monthvalue.value) return date.getMonth()
    return months.value.findIndex(item => item.label === Monthvalue.value?.label);
})




// get the product
const { data: product, pending, error, refresh } = useFetch<Produit>(`/api/products/${id}`, {
    lazy: true,
    server: false,
}
);

const { data: transactions, pending: isTransactionsPending } = useFetch<ProductTransactionsType>(`/api/Transactions/${id}`, {
    lazy: true,
    server: false,
})

// breadcrumb
const item = computed<BreadcrumbItem[]>(() => [
    {
        label: 'Dashboard',
        icon: 'i-material-symbols-dashboard-outline',
        to: '/dashboard'
    },
    {
        label: 'Produits',
        icon: 'i-lucide-box',
        to: '/produits'
    },
    {
        label: product.value?.name || '', // Gestion du loading
        icon: 'i-lucide-link',
    }
])


// chart   
let achats : ProductTransactionsArrayType = []
let ventes : ProductTransactionsArrayType = []
let NumberOfmonthSelles = ref<number>(0);
let MonthBenifice = ref<number>(0);
let BruteSum = ref<number>(0);

const data = computed(() => {
   achats = getSellesOrExpensesForMonths(transactions.value?.data || [], "A");
   ventes = getSellesOrExpensesForMonths(transactions.value?.data || [], "V");
   const Benefice = CalculateMonthlyBenifice(ventes , achats);

   NumberOfmonthSelles.value = ventes[month.value].totalQuantity
   MonthBenifice.value = ventes[month.value].totalSaleAmount - achats[month.value].totalPurchaseAmount
   BruteSum.value = ventes[month.value].totalSaleAmount

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
