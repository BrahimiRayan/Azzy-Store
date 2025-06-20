<template>
    <div class="w-full h-full flex items-center justify-center">
        <div class="bg-red-500 text-8xl">
            Login out , please wait ...
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import { handelLogout } from '~/lib/auth/auth-client';

onMounted(async ()=>{
    await handelLogout()
})
</script>