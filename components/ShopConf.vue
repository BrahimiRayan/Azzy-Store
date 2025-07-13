<template>
            <div>
                <USlideover 
                title="controle panel"
                description="controle panel of your online shop"
                :ui="{
                    body: 'bg-[var(--deep-dark-blue)]',
                    content: 'bg-[var(--deep-dark-blue)] overflow-y-auto',
                    overlay: 'bg-black/50',
                    description: 'hidden',
                    title: 'hidden'
                }" :overlay="true">

                    <div class="flex items-center ml-auto my-6 w-max">
                        <UButton label="Configurer votre boutique" icon="i-vaadin-touch" variant="subtle" class="border"/>
                    </div>
        
                    <template #content>
                        <div>
                            <div class="flex items-center justify-center gap-2 py-6 border-b-2 border-white/50">
                                <UIcon name="i-raphael-magic" class="text-green-500" size="26" />
                                <h1 class="text-xl font-extrabold">Costumer votre boutique </h1>
                            </div>
        
                            <form @submit.prevent="SubmitConfig">

                                <div class="p-3 m-3">
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <UIcon name="i-mdi-store-outline" class="text-green-500" size="20" />
                                            <h2 class="text-lg font-extrabold text-green-500">Produits</h2>
                                        </div>
                                        <p class="text-sm text-white/60  mb-5">les produits que vous voulez d'ajouter a votre
                                            boutique ... </p>
                                    </div>
                                    
                                    <!-- !!HERE IS THE INPUT MENU DEEP SEEK -->
                                    <UInputMenu v-model="Selectedproduct" :items="ProductsList" multiple placeholder="Rechercher..."
                                        :ui="{
                                            base: 'p-3',
                                            content: 'bg-[var(--deep-dark-blue)]',
                                            item: 'hover:bg-green-500/30',
                                            tagsItemText: 'text-white/90 p-1 rounded-xl font-bold text-sm',
                                            tagsItem: 'rounded-lg ',
                                            tagsInput: 'border-2 border-white/60 rounded-md outline-none indent-1 p-1 placeholder:text-white/60 placeholder:text-xs',
                                            tagsItemDelete: 'bg-white/30 p-1 rounded-md text-white/80',
                                        }" />
        
        
                                    <USwitch v-model="shopConfig.Livrison" label="Vous sohaitez d'ajouter une livraison ? "
                                        unchecked-icon="i-lucide-x" checked-icon="i-lucide-check" class="mt-5" :ui="{
                                            label: 'text-white/60',
                                            container: shopConfig.Livrison ? 'bg-green-500 rounded-xl border border-black/20' : 'bg-gray-500 rounded-xl border border-black/20',
                                            thumb: 'bg-black/80 rounded-full border',
        
                                        }" />
        
                                </div>
        
        
        
                                <div class="flex flex-col gap-5 p-5">
        
                                    <USeparator label=" Apperence de boutique" class="w-ful text-green-500" :ui="{
                                        label: 'border-2 border-green-500 p-2 rounded-xl',
                                    }" icon="i-simple-icons-nuxtdotjs" />
                                    <!-- name  -->
                                    <UFormField label="Nom " required hint="(obligatoire)" :ui="{
                                        label: 'text-white/60',
                                    }">
                                        <UInput type="text" placeholder="Nom de la boutique" v-model="shopConfig.name" required
                                            class="w-full" />
                                    </UFormField>
                                    <!-- description -->
                                    <UFormField label="Description " hint="(optionel)" :ui="{
                                        label: 'text-white/60',
                                    }">
                                        <UTextarea v-model="shopConfig.description" autoresize class="w-full"
                                            placeholder="Description de votre boutique enligne ... " />
                                    </UFormField>
        
                                    <p class="text-white/60 text-md">Choisisez un type des cards </p>
                                    <div class="grid grid-cols-2 place-items-center p-3 items-center" >
                                    <div
                                        v-for="option in LoyoutOptions"
                                        :key="option.value"
                                        class="flex flex-col w-max items-center gap-2 p-2 mr-2 mb-2 border-2 border-white/40 rounded-lg hover:scale-95 cursor-pointer transition-all duration-300 ease-in-out"
                                        :style=" selectedOption === option.value ? 'border-color : green ; background-color : rgba(0 , 255, 0 , 0.2)' : ''  "
                                        @click="selectOption(option.value)"
                                        >
                                            <img :src="option.src" :alt="option.label" class="w-35 h-35 rounded-lg" />
                                            <div class="text-white/90 font-bold text-sm">
                                                <span>
                                                    {{ option.label }}
                                                </span>
                                                
                                            </div>
                                          
                                        </div>
                                    </div>
        
        
                                    <!-- color picker  -->
                                    <UFormField label="Couleur de fond" hint="(optionel)" class="mb-5" :ui="{
                                        label: 'text-white/60',
                                    }">
                                        <div class="flex items-center justify-between">
                                            <UColorPicker v-model="shopConfig.bgColor" size="xs" />
                                            <div class="h-20 w-20 border border-green-500 flex items-center justify-center"
                                                :style="`background-color :${shopConfig.bgColor ? shopConfig.bgColor : 'white'} ;`"><span
                                                    class="bg-white/79 text-black">{{ shopConfig.bgColor }}</span></div>
                                        </div>
                                    </UFormField>
        
                                    <UFormField label="Couleur de text" hint="(optionel)" :ui="{
                                        label: 'text-white/60',
                                    }">
                                        <div class="flex items-center justify-between">
                                            <UColorPicker v-model="shopConfig.textcolor" size="xs" />
                                            <div class="flex items-center text-2xl font-extrabold justify-center"
                                                :style="`color :${shopConfig.textcolor} ;`"> Exemple text</div>
                                        </div>
        
                                    </UFormField>
                                    <!-- social urls -->
                                    <USeparator label="Information de contacts " class="w-ful text-green-500" :ui="{
                                        label: 'border-2 border-green-500 p-2 rounded-xl',
                                    }" />
        
                                    <div class="p-4 flex flex-col gap-3">
                                        <!-- facebook -->
                                        <UFormField label="Lien Facebook" hint="(optionel)" :ui="{
                                            label: 'text-white/60',
                                        }">
                                            <UInput icon="i-stash-link-light" size="md" type="url" placeholder="Facebook URL"
                                                v-model="shopConfig.fb_url" class="w-full" />
                                        </UFormField>
        
                                        <!-- instagram -->
                                        <UFormField label="Lien Instagram" hint="(optionel)" :ui="{
                                            label: 'text-white/60',
                                        }">
                                            <UInput icon="i-stash-link-light" size="md" type="url" placeholder="Instagram URL"
                                                v-model="shopConfig.ig_url" class="w-full" />
                                        </UFormField>
        
                                        <UFormField label="Téléphone" required hint="(obligatoire)" :ui="{
                                            label: 'text-white/60',
                                        }">
                                            <UInput icon="i-proicons-phone" size="md" type="tel" placeholder="Téléphone"
                                                v-model="shopConfig.phoneNumber" required class="w-full" />
                                        </UFormField>
        
                                        <UFormField label="Email de contact" required hint="(obligatoire)" :ui="{
                                            label: 'text-white/60',
                                        }">
                                            <UInput icon="i-stash-link-light" size-md type="email"
                                                placeholder="Email de boutique" v-model="shopConfig.email" required
                                                class="w-full" />
                                        </UFormField>
        
                                    </div>
        
                                    <USeparator label="Localisation " class="w-ful text-green-500" :ui="{
                                        label: 'border-2 border-green-500 p-2 rounded-xl',
                                    }" />
        
                                    <UFormField label="Adresse de la boutique (Google Maps)" hint="(optionel)" :ui="{
                                        label: 'text-white/60',
                                    }">
                                        <UInput type='text' placeholder='Adresse de la boutique' v-model="shopConfig.address"
                                            class="w-60" />
                                    </UFormField>
        
                                    <USwitch v-model="shopConfig.isMap" label="Vous sohaitez d'ajouter une map ? "
                                     unchecked-icon="i-lucide-x" checked-icon="i-lucide-check"
                                     :ui="{
                                        label: 'text-white/60',
                                        container: shopConfig.isMap ? 'bg-green-500 rounded-xl border border-black/20' : 'bg-gray-500 rounded-xl border border-black/20',
                                        thumb: 'bg-black/80 rounded-full border',
        
                                    }" />
        
                                    <div v-if="shopConfig.isMap" class="flex items-center justify-around gap-3">
                                        <UFormField label="Coordonnées X" required :ui="{
                                            label: 'text-white/60',
                                        }">
                                            <UInput type="number" placeholder="Coordonnées X" v-model="shopConfig.xcor"
                                                required />
                                        </UFormField>
                                        <UFormField label="Coordonnées Y" required :ui="{
                                            label: 'text-white/60',
                                        }">
                                            <UInput type="number" placeholder="Coordonnées Y" v-model="shopConfig.ycor"
                                                required />
                                        </UFormField>
                                    </div>
        
                                </div>
                                <USeparator class="w-full mb-5" />
                                <div class="flex items-center mb-10 gap-3">
                                    <UButton label="Confirmer" type="submit"
                                        class="bg-green-500 hover:bg-green-600 font-bold ml-4" />
                                    <!-- //TODO:delete this in production  -->
                                    <UButton label="Auto-fill" class="bg-red-500 hover:bg-red-600 font-bold" type="button"
                                        @click="console.log(Selectedproduct)" />
                                </div>
                            </form>
        
                        </div>
                    </template>
                </USlideover>
            </div>

            <Shop :conf="shopConfig" :shopProd="shopProd"/>
             

</template>

<script setup lang='ts'>

import type { card_t, shopProdtype } from '~/types/GeneraleT';
import desing1 from '~/assets/pics/design1.png';
import desing2 from '~/assets/pics/design2.png';
import desing3 from '~/assets/pics/design3.png';
import desing4 from '~/assets/pics/design4.png';
import { productsTable, shopConfTable } from '~/lib/db/schema';

const LoyoutOptions :{value: card_t , label :string , src : string}[] = [
  { value: 'A', label: 'Option A' , src : desing1},
  { value: 'B', label: 'Option B' , src : desing2},
  { value: 'C', label: 'Option C'  , src : desing3},
  { value: 'D', label: 'Option D' , src : desing4},
];

export type ProductsLResp = {
    products : typeof productsTable.$inferSelect[]
}
type sh = typeof shopConfTable.$inferSelect 
type resultQuery = {
    conf : sh 
}
export type ShopConfigType = Omit<sh , "idShop" | "id">

const shopConfig = ref<sh>({
        id:'',
        idShop : '',
        name: 'generic shop',
        description: '',
        products: [],
        Livrison: false,
        cardtype : "B",
        bgColor: '',
        textcolor: '',
        fb_url: '',
        ig_url: '',
        phoneNumber: '',
        email: '',
        address: '',
        isMap : true,
        xcor: 0,
        ycor: 0,
});

const {data : ProductsL} = await useFetch<ProductsLResp>('/api/products', {
    server : false,
});


const Selectedproduct = ref<{ id: string ; label: string; }[]>([]) 

const ProductsList = computed(() => {
  return ProductsL.value?.products.map(product => ({
    id: product.id,
    label: product.name
  })) || [];
});

// fetch the config 
const {data : fetchedConf} = await useFetch<resultQuery>('/api/shop/conf' , {
    server : false
});


if(fetchedConf.value){
    shopConfig.value = fetchedConf.value.conf
}

// card types
const selectedOption = ref(fetchedConf.value?.conf.cardtype || "A");
const selectOption = (value : card_t) => {
    selectedOption.value = value;
};

watch( selectedOption , (newval)=>{
    shopConfig.value.cardtype = newval ;
});


const shopProd = computed<shopProdtype>(() => {
  if (!ProductsL.value?.products) return [];
  return ProductsL.value.products.filter(product => 
    Selectedproduct.value.some(p => p.id === product.id)
  );
});

const SubmitConfig = ()=>{
    shopConfig.value.products = Selectedproduct.value.map((p)=>{
        return p.id
    });
    console.log(shopConfig.value);
}
</script>
