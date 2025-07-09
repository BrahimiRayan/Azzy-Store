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

          <div class="flex justify-end items-center mb-4">
            <p class="text-sm">Produits ajouter <span class="font-extrabold text-green-600">x{{ formData.length}}</span></p>
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

          <div class="flex items-center mb-10">
            <UButton label="Ajouter un Produit" icon="lucide-plus" type="button" @click="AddForm"
              class="bg-green-500/80 text-white/90 font-bold" />
           
          </div>
          <USeparator class="w-full mb-5" />
          <div v-if="formData.length > 0" class="flex items-center mb-10 gap-3">
            <UButton label="Confirmer" type="submit" class="bg-green-500 hover:bg-green-600 font-bold" />
            <UButton label="Annuler" class="bg-red-500 hover:bg-red-600 font-bold" type="button"
              @click="formData = []" />
          </div>

          <div v-else class="text-center h-60 text-white/60 flex flex-col items-center justify-between">
            <span></span>
            <p class="text-2xl">Aucune commande ajoutée..</p>

            <div class="bg-gray-700 text-white self-end p-4 rounded-md flex justify-center items-center gap-3">
              <div class="">
                <UIcon name="lucide-alert-triangle" class="text-red-400 animate-pulse " size="40"/>
              </div>
              <div class="border-l-2 border-white/80">
                <p class="font-semibold text-xl my-2">Remarque importante</p>
                <p class="text-sm text-left px-2 text-white/90">Seuls les produits inscrits dans votre base de données peuvent être commandés. Si vous souhaitez demander à votre fournisseur un produit non répertorié, vous devez d'abord l'ajouter à votre catalogue pour qu'il apparaisse dans les options de sélection.</p>
              </div>
            </div>

          </div>
        </form>
        <div class="w-[38%]">
          <div class="flex flex-col gap-3">
            <div v-for="item in formData" :key="item.product?.id"
              class="bg-white/10 border-2 border-white/10 rounded-lg p-4">
              
              <p class="text-sm">Produit: 
                  <span v-if="item.product" class="font-bold text-green-500 ml-1">{{ item.product.label }}</span>
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
      
      <div v-if="pending">
        <h1 class="text-2xl text-center">Chargement ...</h1>
      </div>
      
      <div v-else>
        <div v-if="transformedData.length > 0" class="flex flex-col gap-5">
          <div class="flex justify-between items-center mb-6">
            <p class="text-sm">Total des commandes: 
              <span class="font-bold text-green-500 ml-1">{{ transformedData.length }}</span>
            </p>
    
            <URadioGroup orientation="horizontal" v-model="orderChoise" :items="order" :ui="{
              indicator : 'bg-green-600'
            }"/>
          </div>
  
          <div v-for="(item, index) in transformedData" :key="index"
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
      </div>


    </template>

  </UTabs>
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import type { OrderProducts, Produit } from '~/types/GeneraleT';
import type { orderProductsTable } from '~/lib/db/schema';

type prod_ORDER = {id : string}
type prodCommand = typeof orderProductsTable.$inferInsert
type ProdItem = {
  id: string;
  label: string;
};
interface FormItem {
  product: ProdItem | undefined;
  quantity: number | 0;
}

const emit = defineEmits<{
  (e : 'refresh-orders'): void;
}>()
const props = defineProps<{myProducts : Produit[]}>();
const toast = useToast()

const Products = computed(() => {
  return props.myProducts?.map(prod => ({
    id: prod.id,
    label: prod.name
  })) || [];
});

const fournisseur = ref<string>('') ;
const formData = ref<FormItem[]>([]);

const AddForm = () => {
  formData.value.push({
    product: undefined,
    quantity: 0
  });
};

function OptimizeFormDatas() {
  formData.value = formData.value.reduce((acc, current) => {
    if (!current.product) {
      return acc;
    }

    const existingItem = acc.find(item => 
      item.product?.id === current.product?.id
    );

    if (existingItem && existingItem.product) {
      existingItem.quantity += current.quantity;
    } else {
      acc.push({ ...current });
    }
    return acc;
  }, [] as FormItem[]);
}

async function addCommand() {
try {
  OptimizeFormDatas();

  if(!formData.value || formData.value.length === 0){
      toast.add({
          title: 'Erreur',
          description: `Veuillez remplir tous les champs obligatoires.`,
          color: 'warning',
          icon: 'lucide-alert-triangle',
            ui: {
              root: 'bg-gray-900/90 rounded-lg p-4',
              progress : 'bg-red-600'
            },
      });
    return 
  }

  let products : FormItem[] = [] ;
  let isvalide : boolean = true;

  formData.value.forEach((item , index) => {
    if (!item.product || !item.product.id || item.quantity <= 0) {
      toast.add({
          title: 'Erreur',
          description: `Ooops,Le Produit numero ${index + 1} invalide ou sa quantité égale à 0`,
          color: 'warning',
          icon: 'lucide-alert-triangle',
            ui: {
              root: 'bg-gray-900/90 rounded-lg p-4',
              progress : 'bg-red-600'
            },
      });
      isvalide = false;
      return
    }
    products.push(item);
  });

  if(!isvalide){
    return
  }

// create the commande ... 

  const idcommand : prod_ORDER = await $fetch('/api/commands' , {
    method : 'POST',
    body : {
      fornisseur : fournisseur.value,
    },
  })

  if(!idcommand.id){
          toast.add({
          title: 'Erreur',
          description: 'ORDER ID DOES NOT EXITS',
          color: 'warning',
          icon: 'lucide-alert-triangle',
            ui: {
              root: 'bg-gray-900/90 rounded-lg p-4',
              progress : 'bg-red-600'
            },
  });
      return
  }

  let orderProduct : prodCommand[] = []; // i will store the {idorder , qte , idproduct}
  
  products.forEach((item) => {
      if(item.product){
      orderProduct.push({
          idOrder : idcommand.id,
          qte : item.quantity,
          idProduct : item.product.id
      });
  }});

  await $fetch('/api/order/products',{
    method : 'POST',
    body : {
      prodord : orderProduct
    },
  });

  // clean up
  formData.value = [];
  emit("refresh-orders");
  toast.add({
    title: 'Succès',
    description: 'Commande ajoutée avec succès',
    color: 'success',
    icon: 'lucide-check-circle',
    ui: {
      root: 'bg-green-500/90 rounded-lg p-4',
    },
  });
}catch (error) {
  toast.add({
    title: 'Erreur',
    description: 'Problem !',
    color: 'warning',
    icon: 'lucide-alert-triangle',
    ui: {
      root: 'bg-gray-900/90 rounded-lg p-4',
      progress : 'bg-red-600'
      },
  });
}
}

// second tab

const {data : orderhistory , pending} = useFetch<OrderProducts>('/api/order/products',{
    server : false , 
    lazy : true
});

const transformedData = computed(() => {
  if (!orderhistory.value) return [];
  return orderhistory.value.orderprods.map(order => ({
    id: order.id.slice(0,7),
    date: order.date,
    fournisseur: order.forniseur || '',
    produits: order.products.map(item => ({
      id: item.product.id.slice(0,7),
      name: item.product.name,
      category: item.product.type,
      quantity: item.qte
    }))
  }));
});

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

watch(orderChoise, (newValue) => {
  if (newValue) {
    transformedData.value.reverse();
  } 
});

const exportCommand = async (index : number) => {
  await genererPDFCommande(transformedData.value[index]);
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


<style>
@keyframes rotate {
  from {
    transform: rotateZ('0deg');
  }to{
    transform: rotateZ('350deg');
  }
}
</style>