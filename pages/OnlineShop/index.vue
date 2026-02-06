<template>
    <div v-if="pending">
        <SkeletoneOnlineShop/>
    </div>
    <div v-else class="max-sm:px-4 sm:px-8 max-sm:py-6 sm:py-6 lg:px-0 lg:py-0">
    <UBreadcrumb :items="item" 
        class="sm:mt-8 mt-2" 
        :ui="{
          linkLabel : 'max-sm:text-xs',
        }"
      />
       
        <div v-if="!isOnline?.res.isOnline">
            <OnlineShopPolitics @isOnlineUpdated="reloadPage"/>
        </div>
    
        <div v-else>
            <ShopConf/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { SkeletoneOnlineShop } from '#components';
import type { BreadcrumbItem } from '@nuxt/ui';


const item: BreadcrumbItem[] =
[
        {
                label: 'Dashboard',
                icon: 'i-material-symbols-dashboard-outline',
                to: '/dashboard'
        },
        {
                label: 'Boutique en ligne',
                icon: 'i-solar-shop-linear',
        },
]

type isOnlineFetchres = {
    res : {
        isOnline : boolean
    }
}


const {data :isOnline , pending , refresh} = useFetch<isOnlineFetchres>(`/api/shop/isOnline`, {
    server : false,
    lazy : true
})

function reloadPage (){
    refresh()
    return
}
</script>