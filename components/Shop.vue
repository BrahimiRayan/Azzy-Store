<template>
    <div v-if="conf" :style="`--bg-color: ${conf.bgColor}59 ;--bg-card :${conf.bgColor}50 ; --text-color: ${conf.textcolor}; --bg-pub : ${conf.bgColor}B3 ; --bg : ${conf.bgColor}`" class="wrapper rounded-xl p-5 border">
        

     <header class=" rounded-2xl flex items-center justify-between h-18" :style="`background-color : ${conf.bgColor};`">
        <h1 :style="`color : ${conf.textcolor};`" class="logo ml-3 font-extrabold text-3xl">{{ conf.name }}</h1>

        <nav class="flex items-center justify-around gap-10">
            <UInput type="text" icon="i-line-md-search" placeholder="Rechercher ... " class="cursor-pointer"
                variant="none"
                :ui="{
                    base: `rounded-md placeholder:text-[${conf.textcolor}] text-[${conf.textcolor}] text-sm`,
                    root: `border-2 rounded-lg hover:border-[${conf.textcolor}] focus-within:border-[${conf.textcolor}] transition-all duration-300 ease-in-out `,
                }"
            />

            <ul class="flex items-center gap-3 mr-3">
                <li>
                    <UButton icon="i-mynaui-envelope" label="email" :to="`mailto:${conf.email}`" class="bg-white/50 hover:bg-red-500 hover:text-white font-extrabold shadow shadow-black/70 hover:translate-y-1 transition-all duration-300 ease-in-out"/>
                </li>
                
                <li>
                    <UButton icon="i-lineicons-phone" label="phone" :to="`tel:${conf.phoneNumber}`" class="bg-white/50 hover:bg-blue-500 hover:text-white font-extrabold shadow shadow-black/70 hover:translate-y-1 transition-all duration-300 ease-in-out"/>
                </li>
            </ul>
        </nav>
     </header>

    <main>
        <!-- pub -->
        <section class="PubColor grid grid-cols-2 place-items-center gap-5 my-12 border h-120 w-[80%] mx-auto rounded-xl">
            <!-- carosel and description-->
             <div class="w-[100%] ml-5">
                <h2 class="logo font-extrabold text-6xl mb-10 ml-4">{{ conf.name }}</h2>
                <p>{{ conf.description }}</p>
                <address v-if="conf.address" class="border border-white/40 cursor-pointer rounded-xl bg-black/20 p-2 w-max mt-8">{{ conf.address }}</address>
            </div>
                        
            <div class="border-l-2 border-white/30 border-dashed w-full h-full overflow-hidden flex items-center justify-center ">
                <UCarousel
                    v-slot="{ item }"
                    loop
                    :autoplay="{ delay: 5000 }"
                    :items="ProdPics"
                    :ui="{ item: 'w-full h-full' }"
                >
                    <!-- Container to constrain image dimensions -->
                    <div class="w-full h-full flex items-center justify-center p-1">
                    <img 
                        :src="item" 
                        class="w-[500px] aspect-square object-scale-down rounded-2xl"
                        alt="product image" 
                    />
                    </div>
                </UCarousel>
            </div>
        </section>

        <section v-if="shopProd.length > 0">
            <h2 class="logo font-extrabold text-6xl mb-10 ml-4 underline">Nos produits</h2>
            <div id="products_holder" class="grid grid-cols-3 gap-5">
                <div v-for="product in shopProd"  :key="product.id">
                    <div v-if="conf.cardtype ==='A'" >
                        <CardsTypeA 
                            :product="product"
                            :fb="conf.fb_url"
                            :ig="conf.ig_url"
                            :email="conf.email"
                            :phone="conf.phoneNumber"
                            :address="conf.address"
                            :shipping="conf.Livrison"
                            :style="`--font-style: 'Great Vibes', cursive;`"
                        />
                    </div>

                    <div v-else-if="conf.cardtype ==='B'">
                        <!-- B TYPE COMPONENET -->
                        <CardsTypeB 
                            :product="product"
                            :fb="conf.fb_url"
                            :ig="conf.ig_url"
                            :email="conf.email"
                            :phone="conf.phoneNumber"
                            :address="conf.address"
                            :shipping="conf.Livrison"
                            :style="`--font-style: 'Great Vibes', cursive;`"
                        />    
                    </div>

                    <div v-else-if="conf.cardtype ==='C' ">
                        <!-- C TYPE COMPONENET -->
                         <CardsTypeC 
                            :product="product"
                            :fb="conf.fb_url"
                            :ig="conf.ig_url"
                            :email="conf.email"
                            :phone="conf.phoneNumber"
                            :address="conf.address"
                            :shipping="conf.Livrison"
                            :style="`--font-style: 'Great Vibes', cursive;`"
                        />    
                    </div>

                    <div v-else-if="conf.cardtype ==='D' ">
                        <!-- D TYPE COMPONENET -->
                         <CardsTypeD 
                            
                            :product="product"
                            :fb="conf.fb_url"
                            :ig="conf.ig_url"
                            :email="conf.email"
                            :phone="conf.phoneNumber"
                            :address="conf.address"
                            :shipping="conf.Livrison"
                            :style="`--font-style: 'Great Vibes', cursive;`"
                        />
                    </div>
                </div>
            </div>
        </section>

        <div v-else>
            No Products selected...
        </div>
    </main>

    <footer class="flex items-center overflow-hidden justify-between mt-10 p-3 rounded-xl" :style="`background-color : ${conf.bgColor};`">
        <div>
            <p class="logo text-3xl my-3 font-extrabold">{{ conf.name }}</p>
            <h2 class="py-1 px-2 rounded bg-black/30 w-max">Nos contacts</h2>
 
            <ul class="flex gap-3 align-center justify-center mt-6 mb-3">

                    <li v-if="conf.fb_url">
                        <a :href="conf.fb_url" target="_blank" class="flex items-center gap-2 py-1 px-2 bg-white/30 rounded-md hover:-translate-y-1 transition-all duration-300 ease-in-out">
                            <UIcon name="i-mdi-facebook" class="text-2xl" />                            
                        </a>
                    </li>

                    <li v-if="conf.ig_url">
                        <a :href="conf.ig_url" target="_blank" class="flex items-center gap-2 py-1 px-2 bg-white/20 rounded-md hover:-translate-y-1.5 transition-all duration-300 ease-in-out">
                           <UIcon name="i-hugeicons-instagram" class="text-2xl" />                                                        
                        </a>
                    </li>

                     <li >
                        <a :href="`mailto:${conf.email}`" target="_blank" class="flex items-center gap-2 py-1 px-2 bg-white/20 rounded-md hover:-translate-y-2 transition-all duration-300 ease-in-out">
                           <UIcon name="i-material-symbols-mail" class="text-2xl" />
                        </a>
                    </li>
                </ul>


        </div>
        
        <div v-if="conf.xcor !== 0 && conf.ycor !==0">
            
            <div class=" w-[300px] rounded-2xl border overflow-hidden">
                <Map 
                    :xcor="conf.xcor" 
                    :ycor="conf.ycor" 
                    :nom="conf.name"
                />
                <!-- map from leflet -->
            </div>

            <p v-if="conf.address" class="mt-2 text-sm">
                {{ conf.address }}
            </p>
        </div>

        <div v-else>
            <p v-if="conf.address">
                {{ conf.address }}
            </p>
        </div>
    </footer>
    </div>
</template>
    
<script setup lang='ts'>
import type { shopProdtype } from '~/types/GeneraleT';
import type { ShopConfigType } from './ShopConf.vue';


    const props = defineProps<{
        conf :ShopConfigType,
        shopProd : shopProdtype,
    }>()

const ProdPics = [
  'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',  // Backpack
  'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',  // Shirt
  'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',  // Jeans
  'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',  // Tech
  'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',  // Jewelry
  'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg'  // Electronics
];


//TODO: find a way to get the products using conf.products ... 

        
    
</script>

<style scoped>

    @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');


    *,p, h1, h2, h3, h4, h5, h6,div, span, li, a{
        color: var(--text-color);
    }

    .logo{
        font-family: "Great Vibes", cursive;
        font-style: normal;
    }

    .wrapper{
        background-color: var(--bg-color);
    }

    .PubColor{
        background-color: var(--bg-pub);
    }
    .CardColor{
        background-color: var(--bg-card);
    }
</style>