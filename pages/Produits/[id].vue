<template>
    <UBreadcrumb :items="item" class="my-8 " />


    <div class="flex items-center justify-between my-9 gap-5">

        <div class="flex flex-col items-center gap-2 border bg-black/10 rounded-xl p-5 flex-1">
            <h1 class="text-xl text-green-500 font-extrabold">Nombre vendus ce mois</h1>
            <div class="flex items-baseline gap-1">
                <span class="text-3xl font-extrabold">0</span>
                <p class="text-xs text-gray-400 ">unite</p>
            </div>
            <UIcon name="i-ic-outline-sell" class="text-[var(--green-grace)] size-6 mr-2" />
        </div>

        <div class="flex flex-col items-center gap-2 border bg-black/10 rounded-xl p-5 flex-1">
            <h1 class="text-xl text-green-500 font-extrabold">Généré ce mois-ci</h1>
            <div class="flex items-baseline gap-1">
                <span class="text-3xl font-extrabold">0</span>
                <p class="text-xs text-gray-400 ">DZD</p>
            </div>
            <UIcon name="i-tdesign-money" class="text-[var(--green-grace)] size-6 mr-2" />
        </div>

        <div class="flex flex-col items-center gap-2 border bg-black/10 rounded-xl p-5 flex-1">
            <h1 class="text-xl text-green-500 font-extrabold">Par rapport au dernier moins</h1>
            <div class="flex items-baseline gap-1">
                <span class="text-3xl font-extrabold" :class="isUp ?'text-white' : 'text-red-500'">13</span>
                <p class="text-xs text-gray-400 ">% <UIcon :name="isUp ? 'formkit-arrowup' : 'formkit-arrowdown'" class="size-6" :class=" isUp ?'text-[var(--green-grace)]' : 'text-red-500'" /></p>
            </div>
            <UIcon name="i-bx-stats" class="text-[var(--green-grace)] size-6 mr-2" />
        </div>

    </div>

    <div>
        <Chart :chartData="data" />

    </div>

    <USeparator class="text-[var(--green-grace)] w-xl my-10 mx-auto " 
        label="Informations de produit"
        :ui="{ label: 'font-extrabold p-2 rounded-xl border border-transparent hover:text-[--deep-green] hover:border-[var(--deep-green)] cursor-pointer transition-all duration-300 ease-in-out' }" />

    <ModifyProduct :product="product" />
</template>

<script setup lang='ts'>
import type { chartData, Produit } from '~/types/GeneraleT';
import type { BreadcrumbItem } from '@nuxt/ui';

const isUp = ref<boolean>(true) ;
const productname: string = 'produit name'; // will be gotten from bdd

// breadcrumb
const item: BreadcrumbItem[] =
    [
        {
            label: 'Dashboard',
            icon: 'i-material-symbols-dashboard-outline',
            to: '/'
        },
        {
            label: 'Produits',
            icon: 'i-lucide-box',
            to: '/produits'
        },
        {
            label: productname,
            icon: 'i-lucide-link',
        }
    ]

// product
const id = useRoute().params.id;
const product = ref<Produit>({
    id: id.toString(),
    name: 'produit name',
    img: 'https://img.sonofatailor.com/images/customizer/product/extra-heavy-cotton/ss/Black.jpg',
    category: 'Electronique',
    pua: 1000,
    puv: 2000,
    quantity: 100,
});

// chart    
const data: chartData = {
    labels: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [{
        label: 'Achats',
        // will be gotten from bdd
        data: [0, 0, 0, 0, 9800, 200900, 31000, 31100, 1200, 1300, 201400, 201500],
        borderColor: '#E74C3C',
        backgroundColor: '#E74C3C',

    },
    {
        label: 'Ventes',
        data: [0, 0, 0, 0, 300800, 300900, 301000, 301100, 301200, 301300, 301400, 301500],
        borderColor: '#2ECC71',
        backgroundColor: '#39FF14',
    },
    {
        label: 'Benefice',
        data: [0, 0, 0, 0, 0, 1000, 10, 0, 100000, 100000, 100000, 100000],
        borderColor: '#F1C40F',
        backgroundColor: '#F1C40F',
    }
    ]
}  
</script>

<style></style>