<template>
  <LMap
    style="height: 200px ;" 
    :zoom="8"
    :center="[xcor || 50, ycor || 50]"
    :use-global-leaflet="false"
  >
    <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
      layer-type="base"
      name="OpenStreetMap"
    />
    <LMarker :lat-lng="[xcor || 50 , ycor || 50]" draggable />
  </LMap>
 
</template>

<script setup lang="ts">
const props = defineProps<{
    xcor?: number,
    ycor?: number,
    nom: string
}>()
</script>