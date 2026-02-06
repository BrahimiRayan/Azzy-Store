<template>
        <MainBar :is-open="open" @update-open="handleDrawerToggle"/>
        <UDrawer 
            title="aside" 
            description="links to other routes"
            v-model:open="open"
             direction="left"
              :dismissible="true" 
              :overlay="false" 
              :handle="false" 
            
              :ui="{
                content: 'bg-[var(--deep-dark-blue)] text-[var(--creamy-white)] ring-white/30 rounded-none', 
                description:'hidden',
                title:'hidden',
            }"
        >
            
            <template #content>
             <UButton class="absolute top-1 right-1" color="neutral" :class="['bg-transparent' ,'text-primary' ,'hover:bg-red-600/90' , 'rounded-3xl']" variant="solid" icon="i-lucide-x" @click="open = false" size="sm" />
  
            <div class="w-60 min-h-full size-full m-6 flex flex-col " >
                <div class="w-[90%] bg-light-primary rounded-2xl self-center flex p-3 items-center">
                    
                    <UAvatar v-if="session.data?.user.image" :src="session.data?.user.image as string " alt="user image" class="w-[40px] h-[40px] rounded-full bg-amber-300 mr-2"/>
                    <UAvatar v-else :alt="session.data?.user.name" class="w-[40px] h-[40px] rounded-full bg-green-600 mr-2"/>
                    <div class="flex flex-col gap-1">
                        <h1 v-if="session.data" class="text-xs font-semibold text-green-600">{{ session.data?.user.name }}</h1>
                        <h1 v-else class="text-xs font-semibold text-secondary">Welcom </h1>
                        <p class="text-[10px] text-gray-500">Plan : Gratuit</p>
                        
                    </div>
                </div>

                <nav class="flex items-start flex-col justify-between mt-10 h-[380px]">
                    <div class="flex items-start flex-col justify-around w-full">
                        <NuxtLink class=" mb-2 flex items-center w-full py-3 pl-3 rounded-xl hover:bg-[var(--green-grace)]/80 transition-all duration-350 ease-in-out" :class=" Currentroute.path === route.path ? 'bg-green-700' : ''" v-for="(route, index) in Routes" :key="index" :to="route.path">
                            <UIcon class="mr-5 size-5" :name="route.icon" />
                            {{ route.name }}
                        </NuxtLink>
                    </div>

                    <NuxtLink
                        to="/logOut"
                        class="bg-red-500 hover:bg-red-600 rounded-xl p-2 w-full flex items-center justify-center text-white font-semibold transition-all duration-300 ease-in-out"
                        @click=""
                    >
                        <UIcon class="mr-2 size-5" name="i-material-symbols-logout" />
                        <span>Déconnecter</span>
                    </NuxtLink>
                </nav>
            </div>
            

        </template>

        
        </UDrawer>
                <slot/>
        <Vfooter />
</template>
    
<script setup lang='ts'>
import { authClient } from '~/lib/auth/auth-client';

// types
type route = {
    name : string , 
    path : string , 
    icon : string
}
// refs
const open = ref(false)

// datas
const Routes :route [] = [
        {
            name : 'Dashboard',
            path : '/Dashboard',
            icon : 'i-material-symbols-dashboard-outline'
        },
        {
            name : 'Produits',
            path : '/Produits' , 
            icon : 'i-fluent-mdl2-product-variant'
        },
        {
            name : 'Commande',
            path : '/Commande' ,
            icon : 'i-lsicon-order-outline'
        },
        {
            name : 'Boutique en ligne',
            path : '/OnlineShop' , 
            icon : 'i-solar-shop-linear'
        },
        {
            name : 'Mes Transactions',
            path : '/transactions' , 
            icon : 'i-lucide-arrow-right-left'
        }
];

// functions
const handleDrawerToggle = (newValue:boolean) => {
     open.value = newValue;
};

const Currentroute = useRoute();
const session = authClient.useSession();


    
    
</script>