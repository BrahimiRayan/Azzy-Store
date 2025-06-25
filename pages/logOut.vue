<template>
    <div class="w-full h-full flex items-center justify-center">
        <div class="text-xl my-30">
            <div class="bg-[url('/public/static/infinityloader.webp')] h-40 w-40 bg-no-repeat bg-contain z-20 hover:shadow-2xl shadow-green-500 mx-auto transition-all duration-300 ease-in-out"></div>
            Déconnexion en cours, veuillez patienter...
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import { handelLogout } from '~/lib/auth/auth-client';

onMounted(async ()=>{
    await handelLogout()
})
</script>