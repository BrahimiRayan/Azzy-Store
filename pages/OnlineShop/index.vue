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
            <UButton label="Open" color="neutral" variant="subtle" />

            <template #content>
                <div>
                    <h1>Costumer votre boutique ... </h1>

                    <form>
                        <div class="flex flex-col gap-5">
                            <UFormField label="Nom de la boutique" required :ui="{
                                label: 'text-white/60',
                            }">
                                <UInput type="text" placeholder="Nom de la boutique" v-model="shopConfig.name" required class="w-60" />
                            </UFormField>

                            <UFormField label="Description de la boutique" required :ui="{
                                label: 'text-white/60',
                            }">
                                <UInput type="text" placeholder="Description de la boutique" v-model="shopConfig.description" required class="w-60" />
                            </UFormField>

                            <UFormField label="Couleur de fond" required :ui="{
                                label: 'text-white/60',
                            }">
                                <UInput type="color" placeholder="Couleur de fond" v-model="shopConfig.bg" required class="w-60" />
                            </UFormField>

                            <UFormField label="Facebook URL" required :ui="{
                                label: 'text-white/60',
                            }">
                                <UInput type="url" placeholder="Facebook URL" v-model="shopConfig.fb_url" required class="w-60" />
                            </UFormField>

                            <UFormField label="Instagram URL" required :ui="{
                                label: 'text-white/60',
                            }">
                                <UInput type="url" placeholder="Instagram URL" v-model="shopConfig.ig_url" required class="w-60" />
                            </UFormField>

                            <UFormField label="Téléphone" required :ui="{
                                label: 'text-white/60',
                            }">
                                <UInput type="tel" placeholder="Téléphone" v-model="shopConfig.phone" required class="w-60" />
                            </UFormField>

                            <UFormField label="Email de contact" required :ui="{
                                label: 'text-white/60',
                            }">
                                <UInput type="email" placeholder="Email de contact" v-model="shopConfig.email" required class="w-60" />
                            </UFormField>

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