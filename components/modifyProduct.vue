<template>
        <div v-if="error" class="bg-red-500 text-sm mb-5 rounded-lg p-2 w-[80%] flex items-center font-extrabold">
            <UIcon name="i-lucide-alert-triangle" class="text-white size-5 mr-2" />
                {{ error }}
            <UButton icon="i-lucide-x" class="size-5 ml-auto w-8 h-8 text-center bg-red-800 hover:bg-red-600" @click="error = null" />
        </div>
        
        <div class="flex flex-col lg:items-center gap-3 rounded-xl p-2 shadow bg-white/5">
            
            <div class="lg:w-[400px] lg:max-h-[400px] overflow-hidden">
                <NuxtImg :src="produit.image" format="webp" alt="" class="w-[90%] max-sm:mx-auto sm:mx-auto rounded-xl" placeholder="/no-img.png"/>
            </div>
            <div class="lg:w-[45%]">

            <form @submit.prevent="ModifyProduct">

                <UFormField label="Nom du produit" class=" w-full mb-5" required :ui="{
                    label : 'text-white/70 font-bold'
                }">
                    <UInput v-model="product.name" type="text" placeholder="Nom du produit" :ui="{
                        base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
                    }" class="w-full" />

                </UFormField>

                <UFormField label="Description du produit" class="w-full mb-5" :ui="{
                    label : 'text-white/70 font-bold'
                }">
                    <UTextarea v-model="product.description" placeholder="Nom du produit" :ui="{
                        base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
                    }" class="w-full" />

                </UFormField>

                <UFormField label="Prix vente Unitaire du produit" class=" w-full mb-5" required :ui="{
                    label : 'text-white/70 font-bold'
                }">
                    <UInputNumber v-model="product.puv" :min="0" placeholder="Prix unite de vente" :ui="{
                        base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
                    }" class="w-full" />
                </UFormField>

                <UFormField label="Prix unité d'achat" class=" w-full mb-5" required :ui="{
                    label : 'text-white/70 font-bold'
                }">
                    <UInputNumber v-model="product.pua" :min="0" placeholder="Prix unité d'achat" :ui="{
                        base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
                    }" class="w-full" />
                </UFormField>

                <UFormField label="Quantité de produit" class=" w-full mb-5" required 
                :ui="{
                    label : 'text-white/70 font-bold'
                }">
                    <UInputNumber v-model="product.quantity" :min="0" placeholder="Quantité de produit" :ui="{
                        base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
                    }" class="w-full" />
                </UFormField>

                <UButton :label="pending ? 'chargement...' :'Modifier' " :disabled="pending" class=" mx-auto bg-green-600 text-(--pale-moon) hover:bg-green-700 text-sm w-[50%] flex items-center justify-center"
                    icon="i-lucide-check" type="submit" :ui="{
                        base: 'rounded-lg',
                        label : 'font-extrabold text-center',
                    }" />
            </form>
            </div>
        </div>
</template>
    
<script setup lang='ts'>
const props = defineProps(['produit'])
const emit = defineEmits(['refresh-product']);
const error = ref<string | null>(null);
const pending = ref<boolean>(false);
const product = ref({
    name : props.produit.name,
    description : props.produit.description,
    pua : props.produit.pua,
    puv : props.produit.puv,
    quantity : props.produit.qte,
});

// const name = ref<string>(props.produit.name);

const ModifyProduct =async () => {
    if (!product.value.name.trim() || !product.value.pua || !product.value.puv || !product.value.quantity) {
        error.value = 'Veuillez remplir tous les champs'
        return
    }
    if (product.value.pua >= product.value.puv) {
        error.value ='Le prix d\'achat doit être inférieur au prix de vente';
        return 
    }
    if (product.value.quantity <= 0) {
        error.value = 'La quantité doit être supérieure à 0';
        return
    }
    if(props.produit.name === product.value.name.trim() &&
        props.produit.pua === product.value.pua &&
        props.produit.puv === product.value.puv &&
        props.produit.qte === product.value.quantity && 
        props.produit.description === product.value.description) {
        error.value ='Aucune modification apportée';
        return 
    }
    if(error.value) {
        error.value = null;
    }
    pending.value = true;
    try {
        await $fetch("/api/products", {
            method: 'PUT',
            body: {
                id: props.produit.id,
                name: product.value.name.trim(),
                description : product.value.description.trim(),
                pua: product.value.pua,
                puv: product.value.puv,
                qte: product.value.quantity,
            }
        });
        emit('refresh-product');
    } catch (err) {
        if (err instanceof Error) {
            error.value = err.message;
        } else {
            error.value = 'Une erreur est survenue lors de la modification du produit';
        }
    }finally {
        pending.value = false;
    }

}

</script>