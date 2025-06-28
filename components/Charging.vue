<template>
    <div class="flex items-center flex-col justify-center h-screen ">
        <div class="bg-[url('/public/static/infinityloader.webp')] w-40 h-40 bg-contain" ></div>
        <span class="text-4xl"> {{ text? text : "Chargement ..." }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
    text?: string;
}>();
</script>