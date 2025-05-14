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

            <UButton label="Configurer votre boutique" icon="i-vaadin-touch" class="" variant="subtle" />
        </div>

            <template #content>
                <div>
                    <div class="border border-yellow-500 flex items-center justify-center p-6">
                        <h1 class="text-xl ">Costumer votre boutique ... </h1>
                    </div>

                    <form>
                        <div class="flex flex-col gap-5 p-5">
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
                            <UFormField label="Couleur de fond" hint="(optionel)" :ui="{
                                label: 'text-white/60',
                            }">
                                <UColorPicker v-model="shopConfig.bg" />
                                
                            </UFormField>
                            <!-- social urls -->
                            <h3>Information de contacts : </h3>
                             <div class="p-4 flex flex-col gap-3">
                                    <!-- facebook -->
                                    <UFormField label="Lien Facebook" hint="(optionel)" :ui="{
                                        label: 'text-white/60',
                                    }">
                                        <UInput icon="i-dashicons-facebook" size="md" type="url" placeholder="Facebook URL" v-model="shopConfig.fb_url" class="w-full" />
                                    </UFormField>

                                    <!-- instagram -->
                                    <UFormField label="Lien Instagram" hint="(optionel)" :ui="{
                                        label: 'text-white/60',
                                    }">
                                        <UInput icon="i-dashicons-instagram" size="md" type="url" placeholder="Instagram URL" v-model="shopConfig.ig_url" class="w-full" />
                                    </UFormField>

                                    <UFormField label="Téléphone" required hint="(obligatoire)" :ui="{
                                        label: 'text-white/60',
                                    }">
                                        <UInput icon="i-proicons-phone" size="md" type="tel" placeholder="Téléphone" v-model="shopConfig.phone" required class="w-full" />
                                    </UFormField>

                                    <UFormField label="Email de contact" required hint="(obligatoire)" :ui="{
                                        label: 'text-white/60',
                                    }">
                                        <UInput icon="i-dashicons-email-alt" size-md type="email" placeholder="Email de boutique" v-model="shopConfig.email" required class="w-full" />
                                    </UFormField>

                             </div>
                            
                            <UFormField label="Adresse de la boutique (Google Maps)" required :ui="{ 
                                label: 'text-white/60',
                             }">
                                <UInput type='text' placeholder='Adresse de
                                    la boutique (Google Maps)' v-model="shopConfig.address" required class="w-60" />
                            </UFormField>
                            <UFormField label="Coordonnées X" required :ui="{
                                label: 'text-white/60',
                            }">
                                <UInput type="number" placeholder="Coordonnées X" v-model="shopConfig.xcor" required class="w-60" />
                            </UFormField>
                            <UFormField label="Coordonnées Y" required :ui="{
                                label: 'text-white/60',
                            }">
                                <UInput type="number" placeholder="Coordonnées Y" v-model="shopConfig.ycor" required class="w-60" />
                            </UFormField>
                        </div>
                        <USeparator class="w-full mb-5" />
                        <div class="flex items-center mb-10 gap-3">
                            <UButton label="Confirmer" type="submit" class="bg-green-500 hover:bg-green-600 font-bold" />
                            <UButton label="Annuler" class="bg-red-500 hover:bg-red-600 font-bold" type="button"
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

const shopConfig = ref<shopConfT>({
    name: '',
    description: '',
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