<template>

    
    <div v-if="pending">
      <SkeletoneOnlineShop />
    </div>

    <div v-else>

      <div v-if="error" class="bg-red-500 rounded-xl p-4 w-max text-left text-lg my-8 text-white">
        Problème : Erreur serveur 500, veuillez rafraîchir la page.
      </div>
      <div class="relative">
        <Shop v-if="data" :conf="data.Shopconfig.shopConf" :shopProd="shopProd"/>
        <SendEmailtoShop v-if="data && data.Shopconfig.shopConf.email" :shopMail="data.Shopconfig.shopConf.email" :shopProducts="shopProdnames" :buttonType ="'Floating'"/>

      </div>
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


// shopprods
const shopProd = computed<shopProdtype>(() => {
  if (!data.value?.ShopProducts) return [];
  return data.value.ShopProducts.filter(product => 
    data.value?.Shopconfig.shopConf.products.some(p => p === product.id)
  );
});


const shopProdnames = computed<string[]>(()=>{
  if (!shopProd.value) return [];
  return shopProd.value.map(prod => prod.name);
})

// meta tags ... 

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
      content: () => pageMeta.description,
      
      key: 'description'
    },
    
    { 
      property: 'og:title', 
      content: () => pageMeta.title || 'Azzy Store',
      key: 'og:title' 
    },
    { 
      property: 'og:description', 
      content: () => pageMeta.description || 'Discover our products',
      key: 'og:description' 
    },
    { 
      property: 'og:image', 
      content: 'https://azzy-store.vercel.app/Logo-light_soc.jpg?v=1',
      key: 'og:image' 
    },
    { 
      property: 'og:url', 
      // Make reactive to route changes
      content: () => `https://azzy-store.vercel.app${route.fullPath}`,
      key: 'og:url' 
    },
    { 
      property: 'og:type', 
      content: 'website',
      key: 'og:type' 
    },

    // Image Dimensions
    { property: 'og:image:width', content: '1200', key: 'og:image:width' },
    { property: 'og:image:height', content: '630', key: 'og:image:height' },
    { property: 'og:image:type', content: 'image/jpg', key: 'og:image:type' },

    // Twitter Cards (Recommended)
    { name: 'twitter:card', content: 'summary_large_image', key: 'twitter:card' },
    { name: 'twitter:title', content: () => pageMeta.title || 'Azzy Store', key: 'twitter:title' },
    { name: 'twitter:description', content: () => pageMeta.description || 'Discover our products', key: 'twitter:description' },
    { name: 'twitter:image', content: 'https://azzy-store.vercel.app/Logo-light_soc.jpg?v=1', key: 'twitter:image' },
    
    // Remove Cache-Control meta tag - this should be set via HTTP headers instead
  ],
  titleTemplate: (title) => `${title} | Azzy-store` // Fixed brand name consistency
});
</script>

<style>
/* Transition styles */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active form,
.modal-leave-active form {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-from form,
.modal-leave-to form {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>