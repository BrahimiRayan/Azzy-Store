<template>
    <div>
        <USlideover 
           :ui="{
            body: 'bg-[var(--deep-dark-blue)]',
            content: 'bg-[var(--deep-dark-blue)] overflow-y-auto',
            overlay: 'bg-black/50',
           }"
           :overlay="true"
        >
        <div class="flex items-center justify-end my-6">

            <UButton label="Configurer votre boutique" icon="i-vaadin-touch" variant="subtle" />
        </div>

            <template #content>
                <div>
                    <div class="flex items-center justify-center gap-2 py-6 border-b-2 border-white/50">
                        <UIcon name="i-raphael-magic" class="text-green-500" size="26"/>
                        <h1 class="text-xl font-extrabold">Costumer votre boutique ... </h1>
                    </div>

                    <form>
                        <div class="p-3 m-3">
                            <div >
                                <div class="flex items-center gap-2">
                                    <UIcon name="i-mdi-store-outline" class="text-green-500" size="20"/>
                                    <h2 class="text-lg font-extrabold text-green-500">Produits</h2>
                                </div>
                                <p class="text-sm text-white/60  mb-5">les produits que vous voulez d'ajouter a votre boutique ... </p>
                            </div>

                              <UInputMenu 
                                v-model="shopConfig.Products"
                                multiple 
                                placeholder = "Rechercher..."
                                :items="ProductsList"
                                :ui="{
                                    content: 'bg-[var(--deep-dark-blue)]',
                                    item :'hover:bg-green-500/30',
                                    tagsItemText: 'text-white/90 p-1 rounded-xl font-bold text-sm',
                                    tagsItem : 'rounded-lg ',
                                    tagsInput : 'border-2 border-white/60 rounded-md outline-none indent-1 p-1 placeholder:text-white/60 placeholder:text-xs',
                                    tagsItemDelete : 'bg-white/30 p-1 rounded-md text-white/80',
                                }"
                                />
                        </div>



                        <div class="flex flex-col gap-5 p-5">
                            
                            <USeparator label=" Apperence de boutique" class="w-ful text-green-500" :ui="{
                                label: 'border border-green-500 p-2 rounded-xl',
                             }"
                             icon="i-simple-icons-nuxtdotjs"
                             />
                            <!-- name  -->
                            <UFormField label="Nom " required hint="(obligatoire)" :ui="{
                                label: 'text-white/60',
                            }">
                                <UInput type="text" placeholder="Nom de la boutique" v-model="shopConfig.name" required class="w-full" />
                            </UFormField>
                            <!-- description -->
                            <UFormField label="Description " hint="(optionel)" :ui="{
                                label: 'text-white/60',
                            }">
                                 <UTextarea v-model="shopConfig.description" autoresize class="w-full" placeholder="Description de votre boutique enligne ... "/>
                            </UFormField>
                            <!-- color picker  -->
                            <UFormField label="Couleur de fond" hint="(optionel)" class="mb-5"  :ui="{
                                label: 'text-white/60',
                            }">
                                <div class="flex items-center justify-between">
                                    <UColorPicker v-model="shopConfig.bg" size="xs" />
                                    <div class="h-20 w-20 border border-green-500 flex items-center justify-center" :style="`background-color :${shopConfig.bg? shopConfig.bg : 'white'} ;`" ><span class="bg-white/79 text-black">{{ shopConfig.bg }}</span></div>
                                </div>
                            </UFormField>

                            <UFormField label="Couleur de text" hint="(optionel)" :ui="{
                                label: 'text-white/60',
                            }">
                                <div class="flex items-center justify-between">
                                    <UColorPicker v-model="shopConfig.textColor" size="xs" />
                                    <div class="flex items-center text-2xl font-extrabold justify-center" :style="`color :${shopConfig.textColor} ;`" > Exemple text</div>
                                </div>
                                
                            </UFormField>
                            <!-- social urls -->
                             <USeparator label="Information de contacts " class="w-ful text-green-500" :ui="{
                                label: 'border border-green-500 p-2 rounded-xl',
                             }" />
                            
                             <div class="p-4 flex flex-col gap-3">
                                    <!-- facebook -->
                                    <UFormField label="Lien Facebook" hint="(optionel)" :ui="{
                                        label: 'text-white/60',
                                    }">
                                        <UInput icon="i-stash-link-light" size="md" type="url" placeholder="Facebook URL" v-model="shopConfig.fb_url" class="w-full" />
                                    </UFormField>

                                    <!-- instagram -->
                                    <UFormField label="Lien Instagram" hint="(optionel)" :ui="{
                                        label: 'text-white/60',
                                    }">
                                        <UInput icon="i-stash-link-light" size="md" type="url" placeholder="Instagram URL" v-model="shopConfig.ig_url" class="w-full" />
                                    </UFormField>

                                    <UFormField label="Téléphone" required hint="(obligatoire)" :ui="{
                                        label: 'text-white/60',
                                    }">
                                        <UInput icon="i-proicons-phone" size="md" type="tel" placeholder="Téléphone" v-model="shopConfig.phone" required class="w-full" />
                                    </UFormField>

                                    <UFormField label="Email de contact" required hint="(obligatoire)" :ui="{
                                        label: 'text-white/60',
                                    }">
                                        <UInput icon="i-stash-link-light" size-md type="email" placeholder="Email de boutique" v-model="shopConfig.email" required class="w-full" />
                                    </UFormField>

                             </div>
                            
                             <USeparator label="Localisation " class="w-ful text-green-500" :ui="{
                                label: 'border border-green-500 p-2 rounded-xl',
                             }" />

                            <UFormField label="Adresse de la boutique (Google Maps)" hint="(optionel)" :ui="{ 
                                label: 'text-white/60',
                             }">
                                <UInput type='text' placeholder='Adresse de la boutique' v-model="shopConfig.address" required class="w-60" />
                            </UFormField>

                             <USwitch
                                v-model="ismap"
                                label="Vous sohaitez d'ajouter une map ? "
                                
                                :ui="{
                                    label: 'text-white/60',
                                    container: ismap ? 'bg-green-500 rounded-xl border border-black/20' : 'bg-gray-500 rounded-xl border border-black/20'  ,
                                    thumb : 'bg-black/80 rounded-full border',
                                    
                                }"
                            />

                            <div v-if="ismap" class="flex items-center justify-around gap-3">
                                <UFormField label="Coordonnées X" required :ui="{
                                    label: 'text-white/60',
                                }">
                                    <UInput type="number" placeholder="Coordonnées X" v-model="shopConfig.xcor" required />
                                </UFormField>
                                <UFormField label="Coordonnées Y" required :ui="{
                                    label: 'text-white/60',
                                }">
                                    <UInput type="number" placeholder="Coordonnées Y" v-model="shopConfig.ycor" required />
                                </UFormField>
                            </div>

                        </div>
                        <USeparator class="w-full mb-5" />
                        <div class="flex items-center mb-10 gap-3">
                            <UButton label="Confirmer" type="submit" class="bg-green-500 hover:bg-green-600 font-bold ml-4" />
                            <!-- //TODO:delete this in production  -->
                            <UButton label="Auto-fill" class="bg-red-500 hover:bg-red-600 font-bold" type="button"
                                @click="shopConfig = fetchedConf" />
                        </div>
                    </form>
                
                </div>
            </template>
        </USlideover>


    </div>
</template>
    
<script setup lang='ts'>
import type { shopConfT } from '~/types/GeneraleT';
const ProductsList = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const ismap = ref(false);

const shopConfig = ref<shopConfT>({
    name: '',
    description: '',
    Products: ["product1", "product2", "product3"],
    bg : '',
    fb_url : '',
    ig_url : '',
    phone : '',
    email : '',
    address : '',
    xcor : 0,
    ycor : 0,
}); 



const fetchedConf = ref<shopConfT>({
    name: 'My Shop',
    description: 'This is my shop',
    Products: ["product1", "product2", "product3" , "product4"],
    bg : '#4563f1',
    fb_url : 'https://facebook.com/myshop',
    ig_url : 'https://instagram.com/myshop',
    phone : '0555-555-555',
    email : 'myshop@gmail.com',
    address : '123 Main St, City, Country',
    xcor : 33.223453,
    ycor : -7.223453,
});



</script>
    
<style>
    
</style>