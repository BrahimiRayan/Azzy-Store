<template>
    <div v-if="pending">
        <SkeletoneOnlineShop/>
    </div>
    <div v-else>

        <UBreadcrumb :items="item" class="my-8" />
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
                to: '/'
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