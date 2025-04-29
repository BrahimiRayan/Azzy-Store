<template>
        <UBreadcrumb :items="item" class="my-8 " />
        <div class="lg:w-[90%]">
                <LineChart :chartData :chartTitle="title"/>
        </div>

        <CommandTabs class="w-full mt-8" />


</template>
        
<script setup lang='ts'>
import type { BreadcrumbItem } from '@nuxt/ui';
import type { LinechartData } from '~/types/GeneraleT';
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

const title = '" Commande effectuées pour chaque mois "';
const datas : number[] =[65, 59, 80, 81, 56, 55, 40 , 0 , 7 , 99 , 12 , 1] ; 


const chartData : LinechartData = {
    labels: ['Jan', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
    datasets: [
      {
        label: "Commande effectuées",
        data: datas,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 3,
        tension: 0.3,
        fill: true

      }
    ]
  }
  
</script>
        
<style>
        
</style>