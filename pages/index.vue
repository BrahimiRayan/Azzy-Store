<template>
    <div class="p-3 w-full">
        <div class="text-3xl text-amber-400 underline">
          {{ greeting }}
        </div>
        <p>lorem*600</p>
        <button>submit</button>
    </div>
  </template>
  
  <script setup lang="ts">
    var l : string = "hello"; 
  
    const greeting = ref<string | number>('')
  
    greeting.value = 32+"ew"
  </script>