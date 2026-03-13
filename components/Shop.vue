<template>
    <div v-if="conf"
        :style="`--bg-color: ${conf.bgColor}B2 ;--bg-card :${conf.bgColor}50 ; --text-color: ${conf.textcolor}; --bg-pub : ${conf.bgColor}B3 ; --bg : ${conf.bgColor}`"
        class="wrapper p-5">

        <header class=" rounded-2xl flex items-center justify-between h-18"
            :style="`background-color : ${conf.bgColor};`">
           
            <h1 :style="`color : ${conf.textcolor};`" class="logo ml-3 font-extrabold text-xl lg:text-3xl">{{ conf.name }}</h1>
           

            <nav class="flex items-center justify-around gap-10">

                <ul class="flex items-center gap-3 mr-3">
                    <li>
                        <SendEmailtoShop v-if="conf.email" :shopMail="conf.email"
                            :shopProducts="shopProd.map(p => p.name)" :buttonType="'Simple'" />
                    </li>

                    <li>
                        <UButton icon="i-lineicons-phone" :to="`tel:${conf.phoneNumber}`"
                            class="bg-white/50 font-extrabold shadow shadow-black/70 hover:translate-y-1 transition-all duration-300 ease-in-out Contactbutton" />
                    </li>
                </ul>
            </nav>
        </header>

        <main class=" border-b-2 border-black/10 pb-20">

            <section class="mb-12 border-2 rounded-2xl mt-6 bg-linear-to-r from-inherit to-inherit/70">
                <div class="glass-effect rounded-2xl overflow-hidden border border-gray-700/50 shadow-xl">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                        <!-- Store Info -->
                        <div class="space-y-6">
                            <div>
                                <h2 class="text-4xl font-bold  text-white mb-4 leading-tight">
                                    Bienvenue à <span
                                        class="logo bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{{
                                        conf.name }}</span>
                                </h2>
                                <p class="text-gray-300 leading-relaxed whitespace-pre-line">{{ conf.description }}</p>
                            </div>

                            <!-- Store Stats -->
                            <div class="grid grid-cols-3 gap-4">
                                <div class="text-center p-4 rounded-2xl border-2 shadow-xl">
                                    <p class="text-2xl font-bold text-white">{{ shopProd.length }}</p>
                                    <p class="text-sm text-gray-400">Produits</p>
                                </div>
                                <div class="text-center p-4 rounded-2xl border-2 shadow-xl">
                                    <p class="text-2xl font-bold text-white">24/7</p>
                                    <p class="text-sm text-gray-400">Support</p>
                                </div>
                                <div class="text-center p-4 rounded-2xl border-2 shadow-xl">
                                    <p class="text-2xl font-bold text-white">{{ conf.Livrison ? 'Oui' : 'No' }}</p>
                                    <p class="text-sm text-gray-400">Livraison</p>
                                </div>
                            </div>

                            <!-- Address -->
                            <div class="w-full mr-auto">
                                <div v-if="conf.xcor !== 0 && conf.ycor !== 0 && conf.isMap" class="p-1 w-full">

                                    <div class="w-full mx-auto rounded-2xl border-2 overflow-hidden">
                                        <Map :xcor="conf.xcor" :ycor="conf.ycor" :nom="conf.name" />
                                        <!-- map from leflet -->
                                    </div>

                                    <div class="flex gap-2 items-center rounded-lg p-1 w-max h-fit self-end">
                                        <p v-if="conf.address" class="mt-2 text-sm font-bold">
                                            {{ conf.address }}
                                        </p>
                                    </div>
                                </div>

                                <div v-else-if="conf.address">
                                    <div class="flex gap-2 items-center rounded-lg p-1 bg-white/20 w-max mt-3">
                                        <UIcon name="i-lucide-map" size="24" />
                                        <p v-if="conf.address" class="mt-2 text-sm">
                                            {{ conf.address }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div class="relative">
                            <div class="relative h-full rounded-xl overflow-hidden bg-white/10">
                                <UCarousel v-slot="{ item }" loop :autoplay="{ delay: 3000 }" :items="ProdPics" :ui="{
                                    item: 'w-full h-full',
                                    container: 'h-full',

                                }" arrows class="h-full">
                                    <div class="h-full flex items-center justify-center p-8">
                                        <img :src="item"
                                            class="w-full h-auto max-h-96 object-contain rounded-lg bg-white p-4 shadow-lg"
                                            alt="product image" />
                                    </div>
                                </UCarousel>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section v-if="shopProd.length > 0">
                <h2 class="logo font-extrabold text-6xl mb-10 ml-4 underline">Nos produits</h2>
                <div id="products_holder" class="grid grid-cols-3 max-[1350px]:grid-cols-2 max-[970px]:grid-cols-1 gap-5">
                    <div v-for="product in shopProd" :key="product.id" class="">
                        <div v-if="conf.cardtype === 'A'">
                            <CardsTypeA :product="product" :fb="conf.fb_url" :ig="conf.ig_url" :email="conf.email"
                                :phone="conf.phoneNumber" :address="conf.address" :shipping="conf.Livrison"
                                :style="`--font-style: 'Great Vibes', cursive;`" />
                        </div>

                        <div v-else-if="conf.cardtype === 'B'">
                            <!-- B TYPE COMPONENET -->
                            <CardsTypeB :product="product" :fb="conf.fb_url" :ig="conf.ig_url" :email="conf.email"
                                :phone="conf.phoneNumber" :address="conf.address" :shipping="conf.Livrison"
                                :style="`--font-style: 'Great Vibes', cursive;`" />
                        </div>

                        <div v-else-if="conf.cardtype === 'C'">
                            <!-- C TYPE COMPONENET -->
                            <CardsTypeC :product="product" :fb="conf.fb_url" :ig="conf.ig_url" :email="conf.email"
                                :phone="conf.phoneNumber" :address="conf.address" :shipping="conf.Livrison"
                                :style="`--font-style: 'Great Vibes', cursive;`" />
                        </div>

                        <div v-else-if="conf.cardtype === 'D'">
                            <!-- D TYPE COMPONENET -->
                            <CardsTypeD :product="product" :fb="conf.fb_url" :ig="conf.ig_url" :email="conf.email"
                                :phone="conf.phoneNumber" :address="conf.address" :shipping="conf.Livrison"
                                :style="`--font-style: 'Great Vibes', cursive;`" />
                        </div>
                    </div>
                </div>
            </section>

            <div v-else class="flex flex-col items-center justify-center gap-6">
                <div
                    class="w-64 h-64 mx-auto bg-[url('~/assets/pics/emptyShop.png')] bg-contain bg-no-repeat bg-center">
                </div>
                <p class="text-2xl font-extrabold">Pas de produits à vendre...</p>
            </div>
        </main>

        <Vfooter />
    </div>
</template>

<script setup lang='ts'>
import type { shopProdtype } from '~/types/GeneraleT';
import type { ShopConfigType } from './ShopConf.vue';


const props = defineProps<{
    conf: ShopConfigType,
    shopProd: shopProdtype,
}>()
const ProdPics = computed(() => {
    return props.shopProd.map((elemnt) => {
        return elemnt.image
    })
})



//TODO: find a way to get the products using conf.products ... 



</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');


*,
p,
h1,
h2,
h3,
h4,
h5,
h6,
div,
span,
li,
a,
.Contactbutton {
    color: var(--text-color);
}

.logo {
    font-family: "Great Vibes", cursive;
    font-style: normal;
}

.wrapper {
    background-color: var(--bg-color);
}

.PubColor {
    background-color: var(--bg-pub);
}

.CardColor {
    background-color: var(--bg-card);
}

</style>