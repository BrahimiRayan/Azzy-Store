<template>
    <div v-if="conf" :style="`--bg-color: ${conf.bgColor}B2 ;--bg-card :${conf.bgColor}50 ; --text-color: ${conf.textcolor}; --bg-pub : ${conf.bgColor}B3 ; --bg : ${conf.bgColor}`" class="wrapper p-5">
    
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
        <section class="PubColor grid grid-cols-2 place-items-center gap-5 my-12 border-2 h-120 w-[80%] mx-auto rounded-xl">
            <!-- carosel and description-->
             <div class="w-[100%] ml-5">
                <h2 class="logo font-extrabold text-6xl mb-10 ml-4">{{ conf.name }}</h2>
                <p class="whitespace-pre-line">{{ conf.description }}</p>
                <address v-if="conf.address" class="border border-white/40 cursor-pointer rounded-xl bg-black/20 p-2 w-max mt-8">{{ conf.address }}</address>
            </div>
                        
            <div class="border-l-2 border-white/30 border-dashed w-full h-full overflow-hidden flex items-center justify-center ">
                <UCarousel
                    v-slot="{ item }"
                    loop
                    :autoplay="{ delay: 3000  }"
                    :items="ProdPics"
                    :ui="{ item: 'w-full h-full' }"
                >
                    
                    <div class="w-full h-full flex items-center justify-center p-1">
                    <img 
                        :src="item" 
                        class="w-[500px] aspect-square object-scale-down rounded-2xl bg-white"
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

    <footer 
        class="grid  items-center gap-x-4 overflow-hidden mt-10 p-3 rounded-xl" 
        :class="(conf.xcor === 0 && conf.ycor ===0 && !conf.isMap && !conf.address) ? 'grid-cols-2' : 'grid-cols-3'"
        :style="`background-color : ${conf.bgColor};`">
        <div>
            <p class="logo text-3xl my-3 font-extrabold">{{ conf.name }}</p>
            <h2 class="py-1 px-2 rounded bg-black/30 w-max">Nos contacts</h2>
 
            <ul class="flex gap-4 align-center justify-center mt-6 mb-3 flex-col w-max">

                    <li v-if="conf.fb_url">
                        <a :href="conf.fb_url" target="_blank" class="flex items-center gap-2 py-1 px-2 bg-white/30 hover:bg-blue-600 rounded-md hover:-translate-y-1 transition-all duration-300 ease-in-out">
                            <UIcon name="i-mdi-facebook" class="text-2xl" />
                            <span v-if="conf.fb_url.length > 28">{{ conf.fb_url.slice(0 , 27) }}... </span>                           
                            <span v-else> {{ conf.fb_url }}</span>
                        </a>
                    </li>

                    <li v-if="conf.ig_url">
                        <a :href="conf.ig_url" target="_blank" class="flex items-center gap-2 py-1 px-2 bg-white/20 hover:bg-pink-600  rounded-md hover:-translate-y-1.5 transition-all duration-300 ease-in-out">
                           <UIcon name="i-hugeicons-instagram" class="text-2xl" />
                               <span v-if="conf.ig_url.length > 28">{{ conf.ig_url.slice(0 , 27) }}... </span>                           
                               <span v-else> {{ conf.ig_url }}</span> 
                        </a>
                    </li>

                     <li >
                        <a :href="`mailto:${conf.email}`" target="_blank" class="flex items-center gap-2 py-1 px-2 bg-white/20 hover:bg-red-600  rounded-md hover:-translate-y-2 transition-all duration-300 ease-in-out">
                           <UIcon name="i-material-symbols-mail" class="text-2xl" />
                            <span v-if="conf.email.length > 28">{{ conf.email.slice(0 , 27) }}... </span>                           
                           <span v-else> {{ conf.email }}</span>   
                        </a>
                    </li>
                </ul>


        </div>

        <div class="bg-white/20 rounded-lg text-center p-2">
            <p class="text-shadow-sm text-shadow-black/20">Vous souhaitez créer une boutique en ligne ? Nous vous offrons bien plus !</p>
            
            <p class="mt-8 text-sm flex flex-col items-center justify-center gap-2 text-shadow-sm text-shadow-black/20">
                <span>Commancer la votre a</span>
                    <a href="/" target="_blank" rel="noopener">
                        <img src="../assets/pics/Logo-dark.webp" class="w-20 h-20 bg-[var(--deep-dark-blue)] shadow-lg shadow-black/20 hover:shadow-green-600 rounded-2xl transition-all duration-500 ease-in-out cursor-pointer"/>
                        <span class="hidden">Azzy-store</span>
                    </a>          

            </p>

        </div>
        
        <div class="w-max ml-auto">
            <div v-if="conf.xcor !== 0 && conf.ycor !==0 && conf.isMap">
                
                <div class=" w-[300px] rounded-2xl border overflow-hidden">
                    <Map 
                        :xcor="conf.xcor" 
                        :ycor="conf.ycor" 
                        :nom="conf.name"
                    />
                    <!-- map from leflet -->
                </div>
    
                <div class="flex gap-2 items-center rounded-lg p-1  bg-white/20 w-max mt-3">
                    <UIcon name="lucide-map-pin-house" size="24"/>
                    <p v-if="conf.address" class="mt-2 text-sm ">
                        {{ conf.address }}
                    </p>
                </div>
            </div>
    
            <div v-else-if="conf.address">
                <div class="flex gap-2 items-center rounded-lg p-1 bg-white/20 w-max mt-3">
                    <UIcon name="lucide-map-pin-house" size="24"/>
                    <p v-if="conf.address" class="mt-2 text-sm">
                        {{ conf.address }}
                    </p>
                </div>
            </div>
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
const ProdPics = computed(()=>{
    return props.shopProd.map((elemnt)=>{
        return elemnt.image
    })
})



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