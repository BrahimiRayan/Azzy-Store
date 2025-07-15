<template>
        <div v-if="mpanding || pending">
          <SkeletoneOrders/>
        </div>

        <div v-else>
          <UBreadcrumb :items="item" class="my-8 " /> 
          <div class="lg:w-[90%]">
                  <LineChart :chartData :chartTitle="title"/>
          </div>
          <div class="w-full mt-16">
              <CommandTabs v-if="produits" :myProducts="produits" @refresh-orders="RefreshMonthlyOrders"/>
          </div>
        </div>


</template>
        
<script setup lang='ts'>
import type { BreadcrumbItem } from '@nuxt/ui';
import { fr_MONTHS } from '~/lib/consts';
import type { LinechartData, Produit } from '~/types/GeneraleT';
import { TitleLimit } from '~/Utils/generalUIhelpers';
const item: BreadcrumbItem[] =
[
        {
                label: 'Dashboard',
                icon: 'i-material-symbols-dashboard-outline',
                to: '/'
        },
        {
                label: 'Commandes',
                icon: 'i-lets-icons-paper',
        },
]

interface ProductsResponse {
  products: Produit[]
}

const produits  = ref<Produit[]>([]);
const {data , pending} = useFetch<ProductsResponse>('/api/products' , {
  lazy : true,
  server : false,
  immediate : true
});

watchEffect(() => {
  if (data.value?.products) {
    produits.value = data.value.products.map((p: any , index) => ({
      index: index + 1,
      id: p.id,
      name: TitleLimit(p.name , 32),
      img: p.image || '/no-img.png',
      category: p.type,
      pua: p.pua,
      puv: p.puv,
      quantity: p.qte
    }));
  }
  
});

// line chart

type MonthlyordersFetchResponse = {
  monthlyorders : {
    month : number ,
    orderCount : number
  }[]
}

const {data : M_orders , pending : mpanding , refresh} = useFetch<MonthlyordersFetchResponse>('/api/order/ordersbymonth' , {
  server : false,
  lazy : true,
});

function RefreshMonthlyOrders(){
  refresh();
}

let datas : number[] = []
const title = '" Commande effectuées pour chaque mois "';

const chartData : LinechartData = {
    labels: fr_MONTHS,
    datasets: [
      {
        label: "Commande effectuées",
        data: datas,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 3,
        tension: 0.3,
        // fill: true

      }
    ]
}

watchEffect(() => {
  if (M_orders.value?.monthlyorders) {
    datas = M_orders.value?.monthlyorders.map((order)=>(
      order.orderCount
    )) || []
  }

  chartData.datasets[0].data = datas
});
  
</script>
        
<style>
        
</style>