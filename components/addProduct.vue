<template>
  <UModal v-model:open="open" title="Ajouter Un Produit"
    description="remplisser tous les champs essentielle (*) pour ajouter un produit." :overlay="true" :ui="{
      description: 'text-sm text-gray-400',
      title: 'text-lg font-semibold',
      body: 'bg-[var(--deep-dark-blue)] text-(--pale-moon)',
      header: 'bg-[var(--deep-dark-blue)] text-(--pale-moon)',
      overlay: 'bg-black/70',
      content :'rounded-xl ring-white/40 ',
      close : 'bg-red-600 hover:bg-red-700'
    }">

    <!-- the open button  -->
    <div class="mt-8 max-sm:w-full max-sm:text-center">
      <UButton 
        class="bg-green-600 text-(--pale-moon) text-sm hover:bg-green-400 transition duration-300 ease-in-out max-sm:w-[80%] max-sm:font-extrabold max-sm:py-2"
         >
        <span class="max-sm:hidden flex items-center">
          <UIcon name="i-lucide-plus" class="mr-2 size-6"  />
           <p>Ajouter un Produit</p>
        </span>

        <span class="sm:hidden text-xs flex items-center">
          <UIcon name="i-lucide-plus" class="mr-2 size-4"  />
          <p>Ajouter</p>
        </span>
      </UButton>
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
              base: 'bg-[var(--deep-dark-blue)] text-(--pale-moon) placeholder:text-white/70',
            }"
            />
        </UFormField>


        <UFormField label="Description du Produit (Optionel)" class=" w-full" >
          <UTextarea  
            placeholder="Ex : T-shirt Roda ..."
            class="w-full"
            v-model="NewProduct.description" 
            :ui="{
              base: 'bg-[var(--deep-dark-blue)] text-(--pale-moon) placeholder:text-white/70',
            }"
            />
        </UFormField>


        <UFormField label="Image (optionel)" class="w-full">
            <p class="text-xs font-extrabold m-2 flex items-center gap-x-1 text-orange-400 w-max p-1">
              <UIcon name="i-lucide-file-warning" />
              Assurez-vous que la taille de l'image est inférieure à 1 Mo.
            </p>
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              class="block w-full text-sm text-gray-300 file:w-40 file:mr-4 file:py-2 file:px-4
                    file:rounded-sm file:border-0 file:text-sm file:font-semibold
                    file:bg-green-600 file:text-white hover:file:bg-green-400"
            />

        </UFormField>

        <UFormField label="Catégorie du Produit" class=" w-full" required>
          <div class="flex items-center justify-between">
            <USelectMenu id="cat" v-model="NewProduct.category" :items="items" :ui="{
              base: 'bg-[var(--deep-dark-blue)] text-(--pale-moon)',
              label: 'text-sm text-gray-400 ',
              input: 'text-sm text-gray-400 bg-[var(--deep-dark-blue)]',
              item: 'bg-[var(--deep-dark-blue)] text-(--pale-moon)',
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
              base: 'bg-[var(--deep-dark-blue)] text-(--pale-moon) placeholder:text-white/70',
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
              base: 'bg-[var(--deep-dark-blue)] text-(--pale-moon) placeholder:text-white/70',
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
              base: 'bg-[var(--deep-dark-blue)] text-(--pale-moon) placeholder:text-white/70',
            }"
            />
        </UFormField>

        <USeparator class="my-4" />

          <button
              type="submit"
              class="bg-green-600 text-sm hover:bg-green-700 transition duration-300 ease-in-out p-2 rounded"
              size="xl"
              :disabled="isPending"
          >
            <span v-if="!isPending">
              Ajouter le Produit
            </span>
              <span v-else class="flex items-center">
              <UIcon name="i-heroicons-arrow-path-20-solid" class="animate-spin mr-2" />
              Attendez SVP...
            </span>
          </button>

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
  imgId : '',
  description : '',
  category: 'Autre',
  pua: 0,
  puv: 0,
  quantity: 0,
})
const toast = useToast();


const fileInput = ref<HTMLInputElement | null>(null);

async function uploadFile (){
  if(!fileInput.value || !fileInput || ! fileInput.value.files){
    return {
      url : '',
      public_id : '',
    };
  }
  const file = fileInput.value.files[0] || null;
  if (!file) {
    alert('No file selected'); // we chamge this ... 
    return {
      url : '',
      public_id : '',
    };
  }

  const maxSize = 1024 * 1024;
  if (file.size > maxSize) {
    alert('File too large: Maximum size is 1 MB');
    fileInput.value.value = ''; 
    return false;
  }

  
  const formData = new FormData();
  formData.append('file', file);

  try {
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.error) {
      return false
    } else {
        return {
          url : data.url,
          public_id : data.public_id 
        }
    }
  } catch (error) {
    return false
  }
};

let isPending = ref<boolean>(false)

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
    isPending.value = true;
    const uploadImage = await uploadFile();
    
    if(uploadImage === false){
      toast.add({
        title: 'Erreur',
        description: "Un problème, l'image n'a pas pu être stockée. Essayez plus tard.",
        color: 'warning',
        icon: 'lucide-alert-triangle',
        ui: {
          root: 'bg-red-500/90 rounded-lg p-4',
        },
      });
      isPending.value = false
      return
    }else if(uploadImage.public_id && uploadImage.url){
      NewProduct.value.img = uploadImage.url
      NewProduct.value.imgId = uploadImage.public_id
    }
    const data = await $fetch('/api/products',{
      method : 'POST',
      body:
       {
        name : NewProduct.value.name,
        img : NewProduct.value.img,
        imgId : NewProduct.value.imgId,
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
  } finally {
    isPending.value = false
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
