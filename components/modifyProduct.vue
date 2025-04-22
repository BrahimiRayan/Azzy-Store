<template>
        <div class=" flex items-center gap-3">
            <div class="w-[400px] max-h-[400px] overflow-hidden">
                <NuxtImg :src="product.img" format="webp" alt="" class="w-[90%]  rounded-xl" />
            </div>

            <div class="w-[45%]">
            <form @submit.prevent="ModifyProduct">

                <UFormField label="Nom du produit" class=" w-full mb-10" required>
                    <UInput v-model="productname" type="text" placeholder="Nom du produit" :ui="{
                        base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
                    }" class="w-[80%]" />

                </UFormField>

                <UFormField label="Prix du produit" class=" w-full mb-10" required>
                    <UInput v-model="puv" type="number" placeholder="Prix unite de vente" :ui="{
                        base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
                    }" class="w-[80%]" />
                </UFormField>

                <UFormField label="Quantité de produit" class=" w-full mb-5" required>
                    <UInput v-model="pua" type="number" placeholder=" Prix unité d'achat" :ui="{
                        base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
                    }" class="w-[80%]" />
                </UFormField>
            </form>
            <UButton label="Modifier" class="bg-green-600 text-[var(--pale-moon)] hover:bg-green-700 text-sm " size="sm"
                icon="i-lucide-check" type="submit" :ui="{
                    base: 'rounded-lg',            
                }" />
            </div>
        </div>
</template>
    
<script setup lang='ts'>

import type { Produit } from '~/types/GeneraleT';

const props = defineProps<{
        product: Produit,
}>()

const pua = ref<number>(props.product.pua);
const puv = ref<number>(props.product.puv);
const productname = ref<string>(props.product.name);

const ModifyProduct = ()=>{
console.log('product name : ', productname.value);
}

</script>
    
<style>
    
</style>