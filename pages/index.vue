<template>
    <div class="mt-8">
        <UBreadcrumb :items="item" class="mb-8 " />
        <USeparator 
               class="dark:text-[var(--green-grace)] light:text-yellow-600 w-xl my-10 mx-auto "
               label="Statistiques des ventes et achats"
               :ui="{ label: 'font-extrabold p-2 rounded-xl border border-transparent dark:hover:text-[--deep-green] dark:hover:border-[var(--deep-green)] light:hover:border-yellow-500 cursor-pointer transition-all duration-300 ease-in-out' }"
               />
        <USelectMenu 
          icon = "i-game-icons-choice"
          :content="{
            align: 'center',
            side: 'bottom',
            sideOffset: 8
          }"
          v-model="typeOfchart"
          value-key="id"
          :items="items"
          class="w-48 mb-5 ml-6 " 
          
          :ui="{
            input: 'dark:bg-[var(--deep-dark-blue)] dark:text-[var(--creamy-white)]',
            base: 'dark:bg-[var(--deep-dark-blue)] dark:text-[var(--creamy-white)]',

            item: 'dark:bg-[var(--deep-dark-blue)] dark:text-[var(--creamy-white)] hover:bg-[var(--deep-dark-blue)] hover:bg-[var(--green-grace)] focus:bg-[var(--green-grace)] focus:bg-[var(--green-grace)]',
          }"
          :uiMenu="{ body: { overflow: 'auto' } }" 
          />

        <highchart   
          :options="chartOptions"
        />
    </div>
    <USeparator 
               class="dark:text-[var(--green-grace)] light:text-yellow-600 w-xl my-10 mx-auto "
               label="Informations sur les produits" 
               :ui="{ label: 'font-extrabold p-2 rounded-xl border border-transparent dark:hover:text-[--deep-green] dark:hover:border-[var(--deep-green)] light:hover:border-yellow-500 cursor-pointer transition-all duration-300 ease-in-out' }"
               />
     <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod reiciendis porro tempore repudiandae error iure, quam modi maxime laudantium, dicta cumque eius! Odit veniam esse dolorem eum fugit ullam error? Facere iusto et eius hic rerum blanditiis tempore doloremque quos ipsa, dolore incidunt maiores qui, provident, odio possimus saepe officia quod repellat! Cum, dolores dolor temporibus odit, ex voluptas eaque sit nobis sunt illum laboriosam quis ad ipsum recusandae, autem laborum similique doloribus nisi tempore alias quidem minus cumque molestiae cupiditate? Tenetur rerum harum in aut earum facilis corporis, voluptatum quia sed repudiandae animi porro dolor adipisci quibusdam quo! Soluta dolores vel, dicta sequi eos beatae tempore tempora, dignissimos cupiditate obcaecati omnis repudiandae alias quas neque ducimus ex optio ea vitae quod, est quasi illo doloribus quaerat. Molestiae, officia fugiat. Veritatis dolores facere adipisci, dolorum possimus, eos nemo doloribus quibusdam quos, beatae quia corporis? Obcaecati laborum explicabo deleniti blanditiis corporis placeat ut atque vel voluptate iure architecto consequuntur, eos beatae, dignissimos assumenda rerum nulla voluptas rem sed ex aliquam veniam ipsum sint ducimus. Totam dolore eligendi expedita aliquid voluptatem, dolorum sit, omnis beatae dicta necessitatibus deleniti. Similique, repellendus vitae reprehenderit iure itaque nobis unde ratione maxime non repudiandae facere recusandae esse blanditiis distinctio, dolorem fugit tempore est! Dicta iste deleniti corporis beatae eum tempora, error alias maiores blanditiis amet repellat ipsa deserunt, sit dolore ullam omnis quasi dignissimos possimus animi repudiandae quam, obcaecati molestias fugiat aspernatur? Delectus laborum, libero omnis consequuntur tempora fugit optio possimus a, repudiandae sint ducimus obcaecati enim earum cum eaque ut eos. Distinctio ipsum cumque dolores reiciendis hic alias, soluta iusto ducimus, quam consequuntur excepturi similique sed aperiam! Ullam, reiciendis? At, esse! Placeat, vitae obcaecati. Adipisci non, blanditiis ab quam porro et autem ullam, ut enim repellendus eum neque aperiam quisquam quod voluptates eligendi laborum incidunt?
     </div>
  </template>
  
  <script setup lang="ts">
  
// the breadcrumb item  
import type { BreadcrumbItem } from '@nuxt/ui';
const item: BreadcrumbItem[] = 
    [
      {
        label: 'Dashboard',
        icon: 'i-material-symbols-dashboard-outline',
      },
    ]
// the chat items and the chart options 
const items = ref([
    { label: 'Histogramme', id: 'column' },
    { label: 'Courbe', id: 'line' },
    { label: 'Nuage de points', id: 'scatter' }
  ]);
  const typeOfchart = ref('column');
  const colorMode = useColorMode()
  const isDark = ref(computed(()=>colorMode.value === 'dark'));

  const chartOptions = computed(()=>({
  chart: {
    type: typeOfchart.value,
    backgroundColor: 'transparent' 
  },
  title: {
    text: '',
  },
  xAxis: {
    categories: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    crosshair: true,
    labels: {
      style: {
        color: isDark.value ?'#FFFFFF' : '#0f172b'
      }
    },
    title: {
      style: {
        color: isDark.value ?'#FFFFFF' : '#0f172b'
      }
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Montant en DA',
      style: {
        color: isDark.value ?'#FFFFFF' : '#0f172b',
      }

    },
    labels: {
      style: {
        color: isDark.value ?'#FFFFFF' : '#0f172b'
      }
    },
    gridLineColor: isDark.value ?'rgba(255, 255, 255, 0.1)' : 'rgba(0 ,0,0,0.2)' // Light grid lines for visibility
  },
  tooltip: {
    backgroundColor: '#333333', // Dark tooltip background
    style: {
      color: isDark.value ?'#FFFFFF' : '#0f172b'
    },
    headerFormat: '<span style="font-size:10px; color: white">{point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0; color: white"><b>{point.y:.1f} DA</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  legend: {
    itemStyle: {
      color: isDark.value ?'#FFFFFF' : '#0f172b'
    },
    itemHoverStyle: {
      color: '#DDDDDD' // Light gray on hover
    }
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0
    }
  },
  series: [
    {
      name: 'Achats',
      data: [200400, 200500, 200600, 400700, 200800, 200900, 201000, 201100, 201200, 201300, 201400, 201500],
      color: '#E74C3C'
    },
    {
      name: 'Ventes',
      data: [300400, 200500, 500600, 302700, 300800, 300900, 301000, 301100, 301200, 301300, 301400, 301500],
      color: '#2ECC71'
    },
    {
      name: 'Benefice',
      data: [100000, 100000, 100000, 100000, 0, 100000, 100000, 100000, 100000, 100000, 100000, 100000],
      color: '#F1C40F'
    }
  ]
}));
  </script>

