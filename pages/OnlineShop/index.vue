<template>
    <UBreadcrumb :items="item" class="my-8" />
    <div v-if="!isOnline?.res.isOnline">
        <OnlineShopPolitics/>
    </div>

    <div v-else>
        <ShopConf/>
    </div>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';
import { authClient } from '~/lib/auth/auth-client';

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
const session = authClient.useSession();

const {data :isOnline , pending} = useFetch<isOnlineFetchres>(`/api/shop/isOnline/${session.value.data?.user.id}`, {
    server : false,
    lazy : true
})
</script>