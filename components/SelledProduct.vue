<template>
    <UModal v-model:open="openSell"
     title="Marquez la vente d'un produit"
     description="remplisser tous les champs pour marquer la vente d'un produit."
     :overlay="true"
     :ui="{
        description : 'text-sm text-gray-400',
        title : 'text-lg font-semibold',
        body : 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
        header : 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
        overlay :'bg-black/70',
        content :'rounded-xl ring-white/40 ',
        close : 'bg-red-600 hover:bg-red-700'
      }">
            
            <!-- the open button  -->
        <div class="mt-8 ">
            
            <UButton 
                icon="i-healthicons-low-income-level" 
                label="Vente d'un Produit" 
                class="bg-yellow-600 text-[var(--pale-moon)] text-sm hover:bg-yellow-400 transition duration-300 ease-in-out" 
                size="xl" />
        </div>
        
        <!-- the modal content -->

      <template #body>
        <form @submit.prevent="submitSelles">
          <!-- choix de produit  -->
          <UFormField label="Catégorie du Produit" class=" w-full mb-5" required>
          <USelectMenu id="cat" v-model="product" :items="Selleditem" placeholder="Selectioner un produit ..." :ui="{
          base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)] ring-white/70',
          label: 'text-sm text-gray-400',
          input: 'text-sm text-gray-400 bg-[var(--deep-dark-blue)] ',
          item: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)] hover:bg-blue-900',
          placeholder : 'text-white/60',
          group: 'p-0',
        }" class="w-[80%]" />
        </UFormField>
        <!-- la Quantité de produuit vendu -->
        <UFormField label="Quantité vendu" class=" w-full mb-3" required>
          <UInputNumber v-model="selledQ" placeholder="Quantité vendue" :min="0" :ui="{
            base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)] placeholder:text-white/60 ring-white/70',
          }" class="w-[80%]" />
        </UFormField>

        <USeparator class="text-[var(--green-grace)] w-full my-5"/>
        <UButton label="Valider" class="bg-green-600 text-[var(--pale-moon)] hover:bg-green-700 text-sm " size="sm"
          icon="i-lucide-check" type="submit" :ui="{
            base: 'rounded-lg',            
          }" />

        </form>
      </template>
  

    </UModal>
</template>

<script setup lang="ts">
import type { Produit } from '~/types/GeneraleT';

const props = defineProps<{
  produits : Produit[]
}>(); 

const emit = defineEmits<{
  (e: 'refresh-data'): void;
}>();
//variables
type SelledItem = {
  id: string;
  label: string;
};
const openSell = ref(false);
const product = ref<SelledItem | undefined>();
const selledQ = ref<number>(0);

const Selleditem = computed(() => {
  return props.produits?.map(product => ({
    id: product.id,
    label: product.name
  })) || [];
});
// functions
const toast = useToast();

const submitSelles = async ()=>{
    if (!product.value || product.value?.id === '' || selledQ.value === 0 || !selledQ.value) {
      toast.add({
        title: 'Erreur',
        description:'Veuillez remplir tous les champs',
        color: 'warning',
        icon: 'lucide-alert-triangle',
        ui: {
          root: 'bg-red-500/90 rounded-lg p-4',
        },
      });
      return;
    }
    const foundProduct = props.produits.find((p:Produit) => p.id === product.value?.id);
    if(!foundProduct){
      toast.add({
        title: 'Erreur',
        description: 'Produit non trouvé',
        color: 'warning',
        icon: 'lucide-alert-triangle',
        ui: {
          root: 'bg-red-500/90 rounded-lg p-4',
        },
      });
      return;
    }
    if(foundProduct.quantity < selledQ.value) {
      toast.add({
        title: 'Erreur',
        description: `La quantité vendue (${selledQ.value}) est supérieure à la quantité disponible (${foundProduct.quantity})`,
        color: 'warning',
        icon: 'lucide-alert-triangle',
        ui: {
          root: 'bg-red-500/90 rounded-lg p-4',
        },
      });
      return;
    }

  try {
   
   await $fetch('/api/products/prodQuantity', {
    method : 'PUT',
    body : {
      id: product.value.id,
      qte: foundProduct.quantity - selledQ.value,
    }
  }) 
  } catch (error) {
    console.error('Error while updating product quantity:', error);
    toast.add({
      title: 'Erreur',
      description: 'Une erreur est survenue lors de la mise à jour du produit',
      color: 'warning',
      icon: 'lucide-alert-triangle',
      ui: {
        root: 'bg-red-500/90 rounded-lg p-4',
      },
    });
    return;
  }

  try {
    
  await $fetch('/api/Transactions', {
    method: 'POST',
    body: {
      productId: product.value.id,
      quantity: selledQ.value,
      pua: foundProduct.pua,
      puv: foundProduct.puv,
      type: 'V',
    },
  });
  } catch (error) {
    console.error('Error while creating transaction:', error);
  }

  toast.add({
    title: 'Succès',
    description: 'Operation est bien effectue',
    color: 'success',
    icon: 'lucide-check-circle',
    ui: {
      root: 'bg-green-500/90 rounded-lg p-4',
    },
  });

  emit('refresh-data');
  
  product.value = undefined
  selledQ.value = 0;

}

</script>



