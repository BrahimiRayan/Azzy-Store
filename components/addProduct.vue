<template>
  <UModal v-model:open="open" title="Ajouter Un Produit"
    description="remplisser tous les champs essentielle (*) pour ajouter un produit." :overlay="true" :ui="{
      description: 'text-sm text-gray-400',
      title: 'text-lg font-semibold',
      body: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
      header: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
      overlay: 'bg-black/70',
      content :'rounded-xl ring-white/40 ',
      close : 'bg-red-600 hover:bg-red-700'
    }">

    <!-- the open button  -->
    <div class="mt-8 ">
      <UButton icon="i-lucide-plus" label="Ajouter un Produit"
        class="bg-green-600 text-[var(--pale-moon)] text-sm hover:bg-green-400 transition duration-300 ease-in-out"
        size="xl" />
    </div>

    <template #body>
      <!-- add product -->
      <form @submit.prevent="addProduit" class="flex flex-col items-start justify-between gap-2">

        <UFormField label="Intitulé du Produit" class=" w-full" required>
          <UInput required 
            placeholder="Ex : T-shirt Roda ..."
            class="w-full"
            type="text"
            v-model="NewProduct.name" 
            :ui="{
              base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)] placeholder:text-white/70',
            }"
            />
        </UFormField>


        <UFormField label="Description du Produit (Optionel)" class=" w-full" >
          <UTextarea  
            placeholder="Ex : T-shirt Roda ..."
            class="w-full"
            v-model="NewProduct.description" 
            :ui="{
              base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)] placeholder:text-white/70',
            }"
            />
        </UFormField>


        <UFormField label="Image (optionel)" class="w-full">

          <UInput 
            label="Image du Produit" 
            class=" w-full" 
            type="file" 
            accept="image/*" 
            v-model="NewProduct.img"
            icon="i-lucide-image" 
            :ui="{
                base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)] placeholder:text-white/70',
              }"
            />
        </UFormField>

        <UFormField label="Catégorie du Produit" class=" w-full" required>
          <div class="flex items-center justify-between">
            <USelectMenu id="cat" v-model="NewProduct.category" :items="items" :ui="{
              base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
              label: 'text-sm text-gray-400 ',
              input: 'text-sm text-gray-400 bg-[var(--deep-dark-blue)]',
              item: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
              group: 'bg-[var(--deep-dark-blue)] ',
            }" class="w-48" />
  
            <span class="px-2 py-1.5 bg-black/20 text-green-600 rounded-xl text-xs font-extrabold">{{ NewProduct.category === 'Autre' ? 'Défaut : ' : "" }} {{ NewProduct.category }}</span>
          </div>
        </UFormField>

        <UFormField label="Prix d'achat par unité" class=" w-full" required>
          <UInput 
            required 
            placeholder="Prix d'achat par unité" 
            class=" w-full" 
            type="number" 
            min="0"
            v-model="NewProduct.pua" 
            icon="i-icons8-buy" 
            :ui="{
              base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)] placeholder:text-white/70',
            }"/>
        </UFormField>

        <UFormField label="Prix de vente par unité" class=" w-full" required>
          <UInput 
            required 
            placeholder="Prix de vente par unité" 
            class=" w-full" 
            type="number" 
            min="0"
            v-model="NewProduct.puv" 
            icon="i-material-symbols-sell-outline"
            :ui="{
              base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)] placeholder:text-white/70',
            }"
            />
        </UFormField>

        <UFormField label="Quantité du Produit" class=" w-full" required>
          <UInput 
            required 
            placeholder="Quantité du Produit" 
            class=" w-full" 
            type="number" 
            min="0"
            v-model="NewProduct.quantity" 
            icon="i-material-symbols-sell-outline" 
            :ui="{
              base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)] placeholder:text-white/70',
            }"
            />
        </UFormField>

        <USeparator class="my-4" />
        <UButton label="Ajouter le Produit" type="submit"
          class="bg-green-600 text-[var(--pale-moon)] text-sm hover:bg-green-400 transition duration-300 ease-in-out"
          size="xl" />

      </form>
    </template>
  </UModal>
</template>

<script setup lang="ts">

import type { Produit } from '~/types/GeneraleT';
import {PRODUCTS_TYPES} from '~/lib/consts';
import { authClient } from '~/lib/auth/auth-client';

const emit = defineEmits<{
  (e: 'refresh-data'): void;
}>();

// we change this with a store later
const session : any = authClient.useSession() ;


const open = ref(false);
const items = ref(PRODUCTS_TYPES);
const NewProduct = ref<Produit>({
  name: '',
  img: '',
  description : '',
  category: 'Autre',
  pua: 0,
  puv: 0,
  quantity: 0,
})
const toast = useToast();


async function addProduit() {

  if (!NewProduct.value.name || !NewProduct.value.category || !(NewProduct.value.pua > 0) || !(NewProduct.value.puv > 0) || !(NewProduct.value.quantity > 0)) {
    console.error('Produit non valide');
    toast.add({
        title: 'Erreur',
        description: 'Produit non valide , svpl remplire les champs restant...',
        color: 'warning',
        icon: 'lucide-alert-triangle',
        ui: {
          root: 'bg-red-500/90 rounded-lg p-4',
        },
      });
      return ;
  } 

  try {

    const data = await $fetch('/api/products',{
      method : 'POST',
      body:
       {
        name : NewProduct.value.name,
        img : NewProduct.value.img,
        description : NewProduct.value.description,
        type : NewProduct.value.category,
        pua : NewProduct.value.pua,
        puv : NewProduct.value.puv,
        qte : NewProduct.value.quantity,
        idShop : session.value.data?.user.shopId,
      },
    });

    if (!data){
      throw new Error('Erreur lors de l\'ajout du produit');
    }
    
    console.log('Produit ajouté:', { ...NewProduct.value });
    resetProduct();
    toast.add({
    title: 'Succès',
    description: 'Produit ajouté avec succès',
    color: 'success',
    icon: 'lucide-check-circle',
    ui: {
      root: 'bg-green-500/90 rounded-lg p-4',
    },
    });
    emit('refresh-data');
    // window.location.reload();
    return
  } catch (error) {
    toast.add({
      title: 'Erreur',
      description: 'Une erreur est survenue lors de l\'ajout du produit',
      color: 'error',
      icon: 'lucide-alert-triangle',
      ui: {
        root: 'bg-red-500/90 rounded-lg p-4',
      },
    });
    throw new Error(`Erreur lors de l'ajout du produit: ${error}`);
  }
    
}


const resetProduct = () => {
  NewProduct.value = {
    name: '',
    img: '',
    description : '',
    category: 'Autre',
    pua: 0,
    puv: 0,
    quantity: 0,
  }
}
</script>
