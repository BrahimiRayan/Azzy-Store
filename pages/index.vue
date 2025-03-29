<template>
    <div>
        <h1 class="text-2xl text-primary mb-8">Dashboard</h1>
        <USelect 
          placeholder="Select status"
          icon = "i-game-icons-choice"
          :content="{
            align: 'center',
            side: 'right',
            sideOffset: 8
          }"
          v-model="typeOfchart"
          :items="items"
          class="w-48" 
          :ui="{
            base: 'bg-[var(--deep-dark-blue)] text-[var(--creamy-white)]',
            item: 'dark:bg-[var(--deep-dark-blue)] dark:text-[var(--creamy-white)] hover:bg-[var(--deep-dark-blue)] hover:bg-[var(--green-grace)] focus:bg-[var(--green-grace)] focus:bg-[var(--green-grace)]',
          }"
          />
        <highchart   
          :options="chartOptions"
        />
    </div>
  </template>
  
  <script setup lang="ts">
  const items = ref([
    { label: 'Histogramme', value: 'column' },
    { label: 'Courbe', value: 'line' },
    { label: 'Nuage de points', value: 'scatter' }
  ]);
  const typeOfchart = ref('column');
  const chartOptions = computed(()=>({
  chart: {
    type: typeOfchart.value,
    backgroundColor: 'transparent' 
  },
  title: {
    text: 'Les gains de l\'année pour produits de stock',
    style: {
      color: '#FFFFFF' // White title
    }
  },
  xAxis: {
    categories: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    crosshair: true,
    labels: {
      style: {
        color: '#FFFFFF' // White axis labels
      }
    },
    title: {
      style: {
        color: '#FFFFFF' // White axis title
      }
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Gain en (DA)',
      style: {
        color: '#FFFFFF' 
      }
    },
    labels: {
      style: {
        color: '#FFFFFF' // White numbers
      }
    },
    gridLineColor: 'rgba(255, 255, 255, 0.1)' // Light grid lines for visibility
  },
  tooltip: {
    backgroundColor: '#333333', // Dark tooltip background
    style: {
      color: '#FFFFFF' // White tooltip text
    },
    headerFormat: '<span style="font-size:10px; color: white">{point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0; color: white"><b>{point.y:.1f} mm</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  legend: {
    itemStyle: {
      color: '#FFFFFF' // White legend text
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
      data: [200400, 200500, 200600, 400700, 200800, 200900, 201000, 201100, 201200, 201300, 201400, 201500]
    },
    {
      name: 'Ventes',
      data: [300400, 200500, 500600, 302700, 300800, 300900, 301000, 301100, 301200, 301300, 301400, 301500]
    },
    {
      name: 'Benefice',
      data: [100000, 100000, 100000, 100000, 0, 100000, 100000, 100000, 100000, 100000, 100000, 100000]
    }
  ]
}));
  </script>

