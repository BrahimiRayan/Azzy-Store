<template>
        <div v-if="productsLisPending || fetchedConfisPending">
                <SkeletoneOnlineShop/>
        </div>

        <div v-else>
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
                        <UButton label="Configurer votre boutique" icon="i-vaadin-touch" class="border bg-green-600 hover:bg-green-500 cursor-pointer"/>
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
                                            base: 'p-3 bg-[var(--deep-dark-blue)] ',
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
                                            class="w-full" :ui="{
                                                base : 'bg-[var(--deep-dark-blue)]'
                                            }" />
                                    </UFormField>
                                    <!-- description -->
                                    <UFormField label="Description " hint="(optionel)" :ui="{
                                        label: 'text-white/60',
                                    }">
                                        <UTextarea v-model="shopConfig.description" autoresize class="w-full"
                                            placeholder="Description de votre boutique enligne ... " :ui="{
                                                base : 'bg-[var(--deep-dark-blue)]',
                                            }" />
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
                                                v-model="shopConfig.fb_url" class="w-full" :ui="{base : 'bg-[var(--deep-dark-blue)]'}"/>
                                        </UFormField>
        
                                        <!-- instagram -->
                                        <UFormField label="Lien Instagram" hint="(optionel)" :ui="{
                                            label: 'text-white/60',
                                        }">
                                            <UInput icon="i-stash-link-light" size="md" type="url" placeholder="Instagram URL"
                                                v-model="shopConfig.ig_url" class="w-full" :ui="{base : 'bg-[var(--deep-dark-blue)]'}"/>
                                        </UFormField>
        
                                        <UFormField label="Téléphone" required hint="(obligatoire)" :ui="{
                                            label: 'text-white/60',
                                        }">
                                            <UInput icon="i-proicons-phone" size="md" type="tel" placeholder="Téléphone"
                                                v-model="shopConfig.phoneNumber" required class="w-full" :ui="{base : 'bg-[var(--deep-dark-blue)]'}"/>
                                        </UFormField>
        
                                        <UFormField label="Email de contact" required hint="(obligatoire)" :ui="{
                                            label: 'text-white/60',
                                        }">
                                            <UInput icon="i-stash-link-light" size-md type="email"
                                                placeholder="Email de boutique" v-model="shopConfig.email" required
                                                class="w-full" :ui="{base : 'bg-[var(--deep-dark-blue)]'}"/>
                                        </UFormField>
        
                                    </div>
        
                                    <USeparator label="Localisation " class="w-ful text-green-500" :ui="{
                                        label: 'border-2 border-green-500 p-2 rounded-xl',
                                    }" />
        
                                    <UFormField label="Adresse de la boutique (Google Maps)" hint="(optionel)" :ui="{
                                        label: 'text-white/60',
                                    }">
                                        <UInput type='text' placeholder='Adresse de la boutique' v-model="shopConfig.address"
                                            class="w-60" :ui="{base : 'bg-[var(--deep-dark-blue)]'}"/>
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
                                                required :ui="{base : 'bg-[var(--deep-dark-blue)]'}"/>
                                        </UFormField>
                                        <UFormField label="Coordonnées Y" required :ui="{
                                            label: 'text-white/60',
                                        }">
                                            <UInput type="number" placeholder="Coordonnées Y" v-model="shopConfig.ycor"
                                                required :ui="{base : 'bg-[var(--deep-dark-blue)]'}"/>
                                        </UFormField>
                                    </div>
        
                                </div>
                                <USeparator class="w-full mb-5" />
                                <div class="mb-10">
                                    <UButton label="Confirmer" type="submit"
                                        class="bg-green-500 text-white/90 px-8  hover:bg-green-600 font-bold ml-4" />
                                    
                                </div>
                            </form>
        
                        </div>
                    </template>
                </USlideover>
            </div>
            <div class="rounded-2xl overflow-hidden">
                <Shop :conf="shopConfig" :shopProd="shopProd"/>
            </div>
            <Shoplinkready v-if="HostUrl" :storeUrl="HostUrl"/>

        </div>


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

let HostUrl = useRuntimeConfig().public.BaseUrl

export type ProductsLResp = {
    products : typeof productsTable.$inferSelect[] | []
} 
export type sh = typeof shopConfTable.$inferSelect 
type resultQuery = {
    conf : sh 
} | undefined
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


const ProductsL = ref<ProductsLResp>({products : []});
const {data : ProductsLdata , pending : productsLisPending} = useFetch<ProductsLResp>('/api/products', {
    server : false,
    lazy : true
});

watchEffect(()=>{
    if(ProductsLdata.value?.products){
        ProductsL.value = ProductsLdata.value
    };
})

const Selectedproduct = ref<{ id: string ; label: string; }[]>([]) 

const ProductsList = computed(() => {
  return ProductsL.value?.products.map(product => ({
    id: product.id,
    label: product.name
  })) || [];
});

// fetch the config 

const fetchedConf = ref<resultQuery>(undefined);
const {data : fetchedConfdata , pending : fetchedConfisPending} = useFetch<resultQuery>('/api/shop/conf' , {
    server : false,
    lazy : true
});

watchEffect(()=>{
    if(fetchedConfdata.value?.conf){
        fetchedConf.value = fetchedConfdata.value;  
        HostUrl = useRuntimeConfig().public.BaseUrl 
        HostUrl = HostUrl +`boutique/${fetchedConfdata.value.conf.idShop}`
    }

    if(fetchedConf.value?.conf ){
    shopConfig.value = fetchedConf.value.conf
    
    if (ProductsL.value?.products && shopConfig.value.products) {
    Selectedproduct.value = shopConfig.value.products
        .map(id => {
            const product = ProductsL.value.products.find(p => p.id === id);
            return product ? { id: product.id, label: product.name } : null;
        }).filter(Boolean) as { id: string; label: string }[]; 
// this is coolest line I ever wrote , so the result of map will be like this 
// for exmp: [ {id: '1', label: 'Product A'}, null, {id: '3', label: 'Product C'} ] 
// then this line with filter(Boolean) it will remove the null value and I can use 
// this technique to remove from  arrays those values (null, undefined, false, 0, "", NaN)
        }
    }
})

// this will watch and change accourding to my cards type
const selectedOption = ref(fetchedConf.value?.conf.cardtype || "A");
const selectOption = (value : card_t) => {
    selectedOption.value = value;
};

watch( selectedOption , (newval)=>{
    shopConfig.value.cardtype = newval ;
});

watchEffect(()=>{
    if(shopConfig.value.isMap === false){
        shopConfig.value.xcor = 0 ;
        shopConfig.value.ycor = 0;    
    }
})

// this will get to me the shop products that are in the conf.
const shopProd = computed<shopProdtype>(() => {
  if (!ProductsL.value?.products) return [];
  return ProductsL.value.products.filter(product => 
    Selectedproduct.value.some(p => p.id === product.id)
  );
});

// submit the config...
const toast = useToast();
const SubmitConfig = async ()=>{
    // i need only the id's of the products that selected
    shopConfig.value.products = Selectedproduct.value.map((p)=>{
        return p.id
    });
    
    if(!shopConfig.value.name || !shopConfig.value.description||
        !shopConfig.value.email || !shopConfig.value.phoneNumber ||
        !shopConfig.value.idShop || !shopConfig.value.cardtype || 
        !shopConfig.value.id 
    ){
        toast.add({
            title: 'Erreur',
            description: "Un champ est manquant ou des données sont incorrectes, veuillez remplir tous les champs obligatoires ou corriger les erreurs.",
            color: 'warning',
            icon: 'lucide-alert-triangle',
            ui: {
            root: 'bg-gray-900/90 rounded-lg p-4',
            progress : 'bg-red-600'
            },
        });
        return 
    }

    if(shopConfig.value.products.length === 0){
        toast.add({
            title: 'Erreur',
            description: "Vous devez sélectionner au moins un produit à afficher dans votre boutique !",
            color: 'warning',
            icon: 'lucide-alert-triangle',
            ui: {
            root: 'bg-gray-900/90 rounded-lg p-4',
            progress : 'bg-red-600'
            },
        });
        return 
    }

    if(shopConfig.value.isMap){
        if(shopConfig.value.xcor === 0 || shopConfig.value.ycor === 0  ){
        toast.add({
            title: 'Erreur',
            description: "Les coordonnées de la carte ne doivent pas être égales à zéro. Veuillez saisir des coordonnées valides.",
            color: 'warning',
            icon: 'lucide-alert-triangle',
            ui: {
            root: 'bg-gray-900/90 rounded-lg p-4',
            progress : 'bg-red-600'
            },
        });
            return 
        }
    }

    try {
        await $fetch('/api/eshop' , {
            method : 'PUT',
            body : {
                shopConfig : shopConfig.value
            }
        });

        toast.add({
            title: 'Succès',
            description: "La configuration de votre boutique a bien été mise à jour.",
            color: 'success',
            icon: 'lucide-alert-triangle',
            ui: {
            root: 'bg-gray-900/90 rounded-lg p-4',
            progress : 'bg-green-600'
            },
        });
        
        return
    } catch (error ) {
        throw error
    }
 

    
}

</script>
