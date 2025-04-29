<template>
    <div class="chart-container">
      <Line :data="chartData" :options="options" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { Line } from 'vue-chartjs'
  import type { ChartOptions } from 'chart.js'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  } from 'chart.js'
import type { LinechartData } from '~/types/GeneraleT'
  
  // Register ChartJS components
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  )
  
  // Chart data

  const props = defineProps<{
    chartData: LinechartData, 
    chartTitle: string
  }>()

  // Chart options
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: props.chartTitle,
        color: 'rgba(255, 255, 255, 0.7)',
      },
      tooltip: {
        mode: 'index',
        intersect: false
        
      },
      colors: {
        enabled: true,
        forceOverride: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 12,
            weight: 'bold'
          }
        },

        grid: {
          color: 'rgba(200, 200, 200, 0.2)'
        }
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
            font: {
                size: 12,
                weight: 'bold'
            }
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)'
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  }
  </script>
  
  <style scoped>
  .chart-container {
    position: relative;
    width: 100%;
    height: 400px;
  }
  </style>