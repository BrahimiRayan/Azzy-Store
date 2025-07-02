<template>
  <UModal v-model:open="openBought"
   title="J'ai acheté Un Produit" 
   description="remplisser tous les champs essentielle pour marquer l'achat d'un produit."
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
              label="Achat d'un Produit" 
              class="bg-red-600 text-[var(--pale-moon)] text-sm hover:bg-red-400 transition duration-300 ease-in-out" 
              size="xl" />
      </div>
      
      <!-- the modal content -->

    <template #body>
      <form @submit.prevent="submitBought">
        <!-- choix de produit  -->
        <UFormField label="Selectionez un produits dans la liste" class=" w-full mb-5" required>
        <USelectMenu id="cat" v-model="Bproduct" :items="Boughtitems" placeholder="Selectioner un produit ..." :ui="{
          base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
          label: 'text-sm text-gray-400',
          input: 'text-sm text-gray-400 bg-[var(--deep-dark-blue)]',
          item: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)] hover:bg-blue-900',
          group: 'p-0',
        }" class="w-[80%]" />
      </UFormField>

      <!-- la Quantité de produit acheté -->
      <UFormField label="la Quantité de produit acheté" class=" w-full mb-3" required>
        <UInput v-model="BoughtQ" type="number" placeholder="la Quantité de produit acheté " min="0" :ui="{
          base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
        }" class="w-[80%]" />
      </UFormField>

      <!-- prix unitaire d'achat -->
      <UFormField label="Prix Unitaire d'achat" class=" w-full mb-3" required>
        <UInput v-model="pua" type="number" placeholder="Prix Unitaire d'achat" min="0" :ui="{
          base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
        }" class="w-[80%]" />
      </UFormField>

      <!-- prix unitaire de vente -->
      <UFormField label="prix unitaire de vente" class=" w-full mb-3" required>
        <UInput v-model="puv" type="number" placeholder="prix unitaire de vente" min="0" :ui="{
          base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
        }" class="w-[80%]" />
      </UFormField>

      <div class="mt-8">
        <p class="text-sm text-red-400 font-extrabold">* Attention, la modification des prix unitaires d'achat et de vente pour un produit sera appliquée à toutes les unités restantes en stock.</p>
      <p class="text-sm text-red-400 font-extrabold"> Par contre, les transactions précédentes resteront inchangées.</p>
      </div>
      

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
  produits: Produit[],
}>();

const emit = defineEmits<{
  (e: 'refresh-data'): void;
}>();
//variables
const openBought = ref(false);

type BoughtitemsT = {
  id: string;
  label: string;
};

const Bproduct = ref<BoughtitemsT | undefined>();
const BoughtQ = ref<number>(0);
const pua = ref<number>(0);
const puv = ref<number>(0);

watch(Bproduct , (newValue)=>{
  if(!newValue || !newValue.id) {
    pua.value = 0;
    puv.value = 0;
  }
  else {
    // Assuming the product has a price property
    const selectedProduct = props.produits.find(product => product.id === newValue.id);
    if (selectedProduct) {
      pua.value = selectedProduct.pua || 0; 
      puv.value = selectedProduct.puv || 0;
    }
  }
})

const Boughtitems = computed(() => {
  return props.produits?.map(product => ({
    id: product.id,
    label: product.name
  })) || [];
});

const toast = useToast();

// functions
const submitBought =async ()=>{
  if (!Bproduct.value || !Bproduct.value.id || BoughtQ.value === 0 || pua.value === 0 || puv.value === 0) {
    toast.add({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs',
        color: 'warning',
        icon: 'lucide-alert-triangle',
        ui: {
          root: 'bg-gray-900/90 rounded-lg p-4',
          progress : 'bg-red-600'
        },
      });
    return;
  }

  if(pua.value > puv.value){
    toast.add({
        title: 'Attention',
        description: "Le prix d'achat est superieur au prix de vente !",
        color: 'warning',
        icon: 'lucide-alert-triangle',
        ui: {
          root: 'bg-gray-900/90 rounded-lg p-4',
          progress : 'bg-red-600'
        },
    })
    return
  }

  const foundProduct = props.produits.find((p:Produit) => p.id === Bproduct.value?.id);
  if(!foundProduct){
      toast.add({
        title: 'Erreur',
        description: "Produit non trouvé, si cette erreur persiste, veuillez vérifier la liste des produits ou refrecher la page",
        color: 'warning',
        icon: 'lucide-alert-triangle',
        ui: {
          root: 'bg-gray-900/90 rounded-lg p-4',
          progress : 'bg-red-600'
        },
      });
      return;
  }


try {
  
   await $fetch('api/products', {
    method : 'PUT',
    body : {
      id: Bproduct.value.id,
      name: Bproduct.value.label,
      pua: pua.value,
      puv: puv.value,
      qte: foundProduct.quantity + BoughtQ.value,
    },
  }); 
  } catch (error) {
   
    toast.add({
      title: 'Erreur',
      description: 'Une erreur est survenue lors de la mise à jour du produit',
      color: 'warning',
      icon: 'lucide-alert-triangle',
        ui: {
          root: 'bg-gray-900/90 rounded-lg p-4',
          progress : 'bg-red-600'
        },
    });
    return;
  }

try {
    
  await $fetch('api/Transactions', {
    method: 'POST',
    body: {
      productId: Bproduct.value.id,
      quantity: BoughtQ.value,
      pua: pua.value,
      puv: puv.value,
      type: 'A',
    },
  });
  } catch (error) {
    toast.add({
      title: 'Erreur',
      description: 'Une erreur est survenue lors de la mise à jour du produit',
      color: 'warning',
      icon: 'lucide-alert-triangle',
        ui: {
          root: 'bg-gray-900/90 rounded-lg p-4',
          progress : 'bg-red-600'
        },
    });
    return;
  }finally{
    Bproduct.value = undefined;
    BoughtQ.value = 0;
    pua.value = 0;
    puv.value = 0;
    openBought.value = !openBought.value
  }
    emit('refresh-data');
    toast.add({
    title: 'Succès',
    description: 'Operation est bien effectue',
    color: 'success',
    icon: 'lucide-check-circle',
    ui: {
          root: 'bg-gray-900/90 rounded-lg p-4',
          progress : 'bg-green-600'
    },
  });

}

</script>



