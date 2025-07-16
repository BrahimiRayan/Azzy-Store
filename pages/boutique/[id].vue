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
    { 
      name: 'description', 
      content: () => pageMeta.description 
    },
    { property: 'og:title', content: () => pageMeta.title },
    { property: 'og:description', content: () => pageMeta.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `https://azzy-store.com${route.path}` },
    { property: 'og:image', content:'/Logo-light_soc.jpg' },
  ],
  titleTemplate: (title) => `${title} | Azze-store`,

});
</script>