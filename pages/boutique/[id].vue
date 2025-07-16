<template>

    
    <div v-if="pending">
      <SkeletoneOnlineShop />
    </div>

    <div v-else>
      <div v-if="error" class="bg-red-500 rounded-xl p-4 w-max text-left text-lg my-8 text-white">
        Problème : Erreur serveur 500, veuillez rafraîchir la page.
      </div>
      <Shop v-if="data" :conf="data.Shopconfig.shopConf" :shopProd="data.ShopProducts"/>
    </div>

</template>

<script setup lang="ts">
import type { sh } from '~/components/ShopConf.vue';
import type { shopProdtype } from '~/types/GeneraleT';

definePageMeta({
  layout: 'onlineshop',
});

const route = useRoute();

interface ShopData {
  Shopconfig: { shopConf: sh };
  ShopProducts: shopProdtype;
}


const shopId = computed(() => {
  const id = String(route.params.id);
  if (!id || id.length < 30) {
    throw createError({
      statusCode: 400,
      message: 'Invalid shop ID',
      fatal: true
    });
  }
  return id;
});

const { data, pending, error } = useFetch<ShopData>(
  `/api/eshop/${shopId.value}`,
  {
    lazy: true,
  }
);


const pageMeta = reactive({
  title: 'Azze-store',
  description: 'We are a shop selling products'
});


watch(
  () => data.value?.Shopconfig?.shopConf,
  (shopConf) => {
    if (shopConf) {
      pageMeta.title = shopConf.name || pageMeta.title;
      pageMeta.description = shopConf.description || pageMeta.description;
    }
  },
  { immediate: true }
);

useHead({
  title: () => pageMeta.title,
  meta: [
    // Critical OG Tags
    { property: 'og:title', content: () => pageMeta.title || 'Azzy Store' },
    { property: 'og:description', content: () => pageMeta.description || 'Discover our products' },
    { 
      property: 'og:image', 
      content: 'https://azzy-store.vercel.app/Logo-light_soc.jpg?v=1' // Cache buster
    },
    { property: 'og:url', content: `https://azzy-store.vercel.app${route.path}` },
    { property: 'og:type', content: 'website' },

    // Image Dimensions (Required by Facebook)
    { property: 'og:image:width', content: '800' }, // Actual width of your image
    { property: 'og:image:height', content: '800' }, // Actual height
    { property: 'og:image:type', content: 'image/jpeg' },

    // Cache Control Fix
    { property: 'og:image:secure_url', content: 'https://azzy-store.vercel.app/Logo-light_soc.jpg' },
    { 'http-equiv': 'Cache-Control', content: 'public, max-age=31536000, immutable' }
  ],
  titleTemplate: (title) => `${title} | Azze-store`
});
</script>