<template>
  <UTabs :items="items" class="gap-4 w-full" :ui="{
    trigger: 'flex-1',
    list: 'border-1 border-gray-200/20',
    label: 'text-white/90 font-bold ',
    indicator: 'bg-green-500/80',
    content: 'border-2 border-gray-200/20 rounded-lg p-4',
  }">

    <template #addCommand="{ item }">
      
      <div class=" flex justify-between ">
        <form @submit.prevent="addCommand" class="w-[60%] border-r-2 border-white/10 px-3">

          <div class="flex justify-between items-center mb-10">
            <UButton label="Ajouter un Produit" icon="lucide-plus" type="button" @click="AddForm"
              class="bg-green-500/80 text-white/90 font-bold" />
            <p class="text-sm">Produits ajouter <span class="font-extrabold text-green-600">x{{ formData.length
                }}</span></p>
          </div>

          <UFormField v-if="formData.length > 0" label="Fournisseur" :ui="{
              label: 'text-white/60',
            }">
              <UInput type="text" placeholder="le fournisseur" v-model="fournisseur" class="w-60 mb-5" />
          </UFormField>

          <div v-for="(item, index) in formData" :key="index" class="flex gap-5 my-4">
            <UFormField label="Produit" required :ui="{
              label: 'text-white/60',
            }">
              <USelectMenu v-model="item.product" :items="Products" placeholder="choisissez ..." :content="{
                align: 'start',
                side: 'left',
                sideOffset: 8
              }" :ui="{
    input: 'bg-[var(--deep-dark-blue)]',
    group: 'text-white/90 bg-[var(--deep-dark-blue)]',
    item: 'text-white/90 bg-[var(--deep-dark-blue)] border-b-1 border-white/10',
  }" required class="w-60" />
            </UFormField>

            <UFormField label="Quantité" required :ui="{
              label: 'text-white/60',
            }">

              <UInput type="number" placeholder="la quantité" v-model="item.quantity" required class="w-60" min="0" />
            </UFormField>
          </div>
          <USeparator class="w-full mb-5" />
          <div v-if="formData.length > 0" class="flex items-center mb-10 gap-3">
            <UButton label="Confirmer" type="submit" class="bg-green-500 hover:bg-green-600 font-bold" />
            <UButton label="Annuler" class="bg-red-500 hover:bg-red-600 font-bold" type="button"
              @click="formData = []" />
          </div>
          <div v-else class="text-center h-40 text-lg text-white/60">
            Aucune commande ajoutée
          </div>
        </form>
        <div class="w-[38%]">
          <div class="flex flex-col gap-3">
            <div v-for="(item, index) in formData" :key="index"
              class="bg-white/10 border-2 border-white/10 rounded-lg p-4">
              
              <p class="text-sm">Produit: 
                  <span v-if="item.product !== ''" class="font-bold text-green-500 ml-1">{{ item.product }}</span>
                  <span v-else class="font-bold text-red-500 ml-1"> vous devez choisir un produit</span>
              </p>

              <p class="text-sm">
                Quantité:
                  <span v-if="item.quantity > 0" class="font-bold text-green-500 ml-1">{{ item.quantity }}</span>
                  <span v-else class="font-bold text-red-500 ml-1"> vous devez choisir une quantité superieur a 0</span>
              </p>
            </div>
            <div v-if="formData.length === 0" class="text-center text-sm text-white/60">
              Aucune commande ajoutée
            </div>
          </div>
        </div>
    </div>
    

    </template>
    
    <template #commandHistory="{ item }">
      
      <div v-if="cmds.length > 0" class="flex flex-col gap-5">
        <div class="flex justify-between items-center mb-6">
          <p class="text-sm">Total des commandes: 
            <span class="font-bold text-green-500 ml-1">{{ cmds.length }}</span>
          </p>
  
          <URadioGroup orientation="horizontal" v-model="orderChoise" :items="order" />
        </div>

        <div v-for="(item, index) in cmds" :key="index"
          class="bg-white/10 border-2 border-white/10 rounded-lg p-4">
          <div class="flex justify-between items-center mb-3">
            <div>
              <p class="text-sm">Fournisseur: 
                <span class="font-bold text-green-500 ml-1">{{ item.fournisseur }}</span>
              </p>
              <p class="text-sm">Date: 
                <span class="font-bold text-green-500 ml-1">{{ item.date }}</span>
              </p>
            </div>

            <UButton label="Imprimer" icon="lucide-printer" @click="exportCommand(index)" class="bg-red-500 hover:bg-red-600 font-bold" />
          </div>


          <p class="text-sm my-3">Produits : </p>
          <div class="flex items-center gap-2">
              <span v-for="(prod, _ ) in item.produits" :key="prod.id" class="font-bold text-green-500 ml-1 bg-gray-900 px-2 py-1 rounded-lg">
                {{ prod.name }} <span class="text-xs text-white/90"> x{{ prod.quantity }} </span> </span>
          </div>
        </div>
      </div>


      <div v-else class="h-30">
        <p class="text-center text-lg text-white/60">
          Historique des commandes est vide .
        </p>
      </div>


    </template>
  </UTabs>
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import type { Cammande } from '~/types/GeneraleT';
const toast = useToast()
//TODO: this from the db
const Products = ref<string[]>(['Backlog', 'Todo', 'In Progress', 'Done'])
const fournisseur = ref<string>('') ;

interface FormItem {
  product: string;
  quantity: number | 0;
}

const formData = ref<FormItem[]>([]);

const AddForm = () => {
  formData.value.push({
    product: '',
    quantity: 0
  });
};


//TODO: check this function ... 
function addCommand() {
  let isValid = true;
  let products : FormItem[] = [] ;
  formData.value.forEach((item , index) => {
    if (item.product === '' || item.quantity <= 0) {
      console.log('Produit ou quantité invalide');
      toast.add({
        title: 'Erreur',
        description: `Ooops,Le Produit numero ${index + 1} invalide ou sa quantité égale à 0`,
        color: 'warning',
        icon: 'lucide-alert-triangle',
        ui: {
          root: 'bg-red-500/90 rounded-lg p-4',
        },
      });

      isValid = false;
    }
    products.push(item);
  });
  if (!isValid) {
    products = [];
    return;
  }
  products.forEach((item) => {
    console.log('Produit:', item.product, 'Quantité:', item.quantity);
  });
  
  formData.value = [];
  toast.add({
    title: 'Succès',
    description: 'Commande ajoutée avec succès',
    color: 'success',
    icon: 'lucide-check-circle',
    ui: {
      root: 'bg-green-500/90 rounded-lg p-4',
    },
  });


  // console.log('Form data:', formData.value);
}


// commands
//TODO: get commandes from the db 
// dumy data ... 
const cmds : Cammande[] = [
{
  id: 1,
  date: '2023-10-01',
  fournisseur: 'Fournisseur A',
  produits: [
    {id : 1 , 
    name : "Produit A", 
    category : "Alimentaire" ,
    quantity : 77 ,
  },
  {id : 2 , 
    name : "Produit B", 
    category : "Alimentaire" ,
    quantity : 203 ,
  },
  ]
},
{
  id: 2,
  date: '2023-10-02',
  fournisseur: 'Fournisseur B',
  produits : [
    {id : 1 , 
    name : "Produit C", 
    category : "Alimentaire" ,
    quantity : 32 ,
  },
  {id : 2 , 
    name : "Produit D", 
    category : "Alimentaire" ,
    quantity : 19 ,
  },
  ]
}

] 

// order by date 
import type { RadioGroupItem, RadioGroupValue } from '@nuxt/ui'
import { genererPDFCommande } from '~/Utils/exportorderPdf';


const order = ref<RadioGroupItem[]>([
  {
    label: 'La plus récente',
    value: 'asc'
  },
  {
    label: 'La plus ancienne',
    value: 'desc'
  }
]);

const orderChoise = ref<RadioGroupValue>('asc');
// TODO: check IF THIS WAY BETTER OR MAKING A REQUEST TO THE DB IS BETTER
// order by date
watch(orderChoise, (newValue) => {
  if (newValue) {
    cmds.reverse();
  } 
});



//TODO: make a function that export the command to pdf
// export command to pdf
const exportCommand = async (index : number) => {
  await genererPDFCommande(cmds[index]);
};

const items = [
  {
    label: 'Ajouter une commande',
    description: 'Ajouter une nouvelle commande ici.',
    icon: 'i-streamline-medical-files-report-history',
    slot: 'addCommand' as const
  },
  {
    label: 'Historique des commandes',
    description: 'Consulter l\'historique des commandes ici.',
    icon: 'i-mdi-clipboard-text-history-outline',
    slot: 'commandHistory' as const
  }
] satisfies TabsItem[]

</script>
