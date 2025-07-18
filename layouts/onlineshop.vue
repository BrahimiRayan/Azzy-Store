<template>
    <slot/>
</template>


<script>
useHead({
  link: [
    { rel: 'stylesheet', href: '/css/OnlineGlobal.css' }
  ]
})
</script>

<style scoped>
body { 
    background-color:  rgba(0, 0, 0, 0.863) !important;
    padding : 0 !important;
    margin: 0;
}
</style>