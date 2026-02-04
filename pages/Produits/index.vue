<template>
  <div v-if="pending">
    <SkeletoneProducts />
  </div>

  <div v-else class="max-sm:px-8 sm:px-8 max-sm:py-6 sm:py-6 lg:px-0 lg:py-0">
  <UBreadcrumb :items="item" class="mt-8" :ui="{
    linkLabel : 'max-sm:text-xs',
  }"/>
  <div class="flex justify-between ">
    <div class="ml-4">
      <AddProduct @refresh-data="handleRefresh"/>
      <SelledProduct :produits="produits" @refresh-data="handleRefresh"/>
      <BoughtProduct :produits="produits" @refresh-data="handleRefresh"/>
    </div>
    <div class="max-sm:hidden w-[20%] bg-[url('/state.png')] bg-no-repeat bg-contain bg-right">
    </div>

  </div>

  <USeparator class="text-(--green-grace) lg:w-xl my-10 mx-auto " label="Informations de Stock"
    :ui="{ label: 'font-extrabold p-2 rounded-xl border border-transparent hover:text-[--deep-green] hover:border-[var(--deep-green)] cursor-pointer transition-all duration-300 ease-in-out' }" />
  <!-- the table  -->

  <div class="flex flex-col flex-1 w-full mt-10 top-0 bg-[#1d1d1d]/30 ">

    <div class="flex items-center justify-between px-4 py-3.5 border border-[var(--pale-moon)] rounded-t-lg">
      <p class="text-white/70 font-bold text-xs lg:text-lg">Totale produits : <span class="text-red-500/70">{{ produits.length }}</span></p>
      <div class="flex items-center gap-3">
        <UInput v-model="globalFilter" class="max-sm:hidden sm:max-w-sm" placeholder="Chercher un produit ... " icon="i-ci-filter" :ui="{base:'bg-[var(--deep-dark-blue)] placeholder:text-white/60'}"/>
        <UButton 
          class="bg-red-600 text-white font-bold hover:bg-red-700 text-sm "
          size="sm"
          icon="i-dashicons-pdf"
          @click="DownloadPdf"
        ><span class="hidden lg:inline">
            Exporter en PDF
        </span>
      </UButton>

      <UButton 
        
          class="bg-green-600 text-white font-bold hover:bg-green-700 text-sm "
          size="sm"
          icon="i-bi-filetype-csv"
          @click="DownloadCsv"
        >
          <span class="hidden lg:inline">
              Exporter en CSV
          </span>
      </UButton>
        <UIcon name="i-ph-mouse-scroll-fill" class="max-sm:hidden size-6" />
      </div>
      
    </div>
    <p class="sm:hidden text-xs text-white bg-red-500 border-l border-r p-1 font-bold">pour une meilleure expérience de navigation dans le tableau, utilisez le scroll horizontal / vertical ou changez la taille de votre fenêtre.</p>
    <UTable class="border-x border-b border-(--pale-moon) rounded-b-lg backdrop-blur-md lg:max-h-[400px] overflow-auto"
      ref="table" v-model:global-filter="globalFilter" :data="produits" :columns="ProduitColumns" :ui="{
        tr: 'hover:bg-white/10 transition-all duration-300 ease-in-out',
        th: 'border-b border-green-500 bg-[var(--deep-dark-blue)]',
      }" :sticky="true" />
  </div>


  <USeparator class="text-(--green-grace) lg:w-xl my-10 mx-auto " label="Catalogue"
    :ui="{ label: 'font-extrabold p-2 rounded-xl border border-transparent hover:text-[--deep-green] hover:border-[var(--deep-green)] cursor-pointer transition-all duration-300 ease-in-out' }" />
  <!-- search the product by name -->

  <form @submit.prevent="filterProducts" class="mt-8 flex">
    <UInput v-model="nameFilter" class="max-w-sm h-8 indent-0.5 shadow-green-600" placeholder="Chercher un produit ... "
      icon="i-lucide-search-check" 
      :ui="{
        base: 'rounded-l rounded-r-none bg-[var(--deep-dark-blue)] placeholder:text-white/60',
      }" />
    <UButton label="Chercher" class="bg-green-600 text-(--pale-moon) h-8 border hover:bg-green-700 text-sm "
      size="sm" 
      icon="i-lucide-search"
      type="submit"
       :ui="{
        base: 'rounded-none',
      }" />
      <UButton label="Reset" class="bg-green-600 text-(--pale-moon) h-8 border hover:bg-green-700 text-sm "
      size="sm" 
      type="reset"
      @click="resetProducts"
      icon="i-carbon-reset"
       :ui="{
        base: 'rounded-r rounded-l-none',
      }" />
  </form>

  <!-- the cards -->
  <div ref="expandContainer"
    class="grid lg:grid-cols-3 gap-2 mt-10 bg-(--deep-dark-blue) transition-all duration-300 ease-in-out sm:max-h-none max-sm:max-h-none"
    :class="isExpanded ? 'max-h-none' : 'max-h-[646px] overflow-hidden'">
    <!-- the card  -->
      <div v-if="cardProducts.length === 0"> Vous n'avez pas de produits dans le stock.</div>
        <CardsProducts v-else :cardProducts="cardProducts"/>
    </div>

    <div v-if="cardProducts.length > 9" class="flex items-center justify-center">

    <UButton id="expandBtn" :icon="cardProducts.length > 9 ? 'i-lucide-more-horizontal' : ''"
      class="text-white/50 hover:text-white bg-transparent hover:bg-transparent transition-colors duration-300 ease-in-out size-10"
      size="xl" @click="toggleExpand" />
    <label for="expandBtn" class="text-white/50 text-sm hover:text-white transition-colors duration-300 ease-in-out">
      {{ isExpanded ? 'Réduire' : 'Afficher plus' }}
    </label>
  </div>
</div>
</template>

<script setup lang="ts">
import { exportToCsv } from '~/Utils/exportCsv';
import { exportToPdf } from '~/Utils/exportPdf';
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { BreadcrumbItem } from '@nuxt/ui';
import type { Produit } from '~/types/GeneraleT';
import { Catecolor } from '~/Composables/useTheme';
import { NormalDateformat } from '~/Utils/dateFormat';
import { TitleLimit } from '~/Utils/generalUIhelpers';

const toast = useToast(); 

const item: BreadcrumbItem[] =
  [
  {
    label: 'Dashboard',
    icon: 'i-material-symbols-dashboard-outline',
    to: '/dashboard',
  },
  {
    label: 'Produits',
    icon: 'i-lucide-box',
  },]

// expanding the card container
const isExpanded = ref(false)
const expandContainer = ref<HTMLDivElement | null>(null)
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

// this will be the data
interface ProductsResponse {
  products: Produit[]
}
const produits  = ref<Produit[]>([]);
const cardProducts = ref<Produit[]>([]);

const { data, pending, refresh } = useFetch<ProductsResponse>('/api/products', {
  lazy: true,
  server: false,
  immediate: true 
});

watchEffect(() => {
  if (data.value?.products) {
    produits.value = data.value.products.map((p: any , index) => ({
      index: index + 1,
      id: p.id,
      name: TitleLimit(p.name , 32),
      img: p.image || '/no-img.png',
      category: p.type,
      pua: p.pua,
      puv: p.puv,
      quantity: p.qte
    }));
  }
  cardProducts.value = produits.value; // Initialize cardProducts with all products
});

// refresh the data on the childrens
function handleRefresh() {
  refresh();
}


// the download functions
const DownloadCsv = ()=>{
  if(produits.value.length === 0) {
    toast.add({
        title: 'Problème',
        description: 'Aucun produit à exporter',
        color: 'warning',
        icon: 'lucide-alert-triangle',
        ui: {
          root: 'bg-red-500/90 rounded-lg p-4',
        },
      });
    return
  }
  const datas : object[] = [];
  produits.value.map((p,index)=>{
    const data = {
      '#': index + 1,
      Intitulé: p.name,
      Catégorie: p.category,
      Prix_u_achat: `${p.pua} DZD`,
      Prix_u_vente: `${p.puv} DZD`,
      Benifice: `${p.puv - p.pua} DZD`,
      Quantité: p.quantity
    }
    datas.push(data)
  })

  const fulldate = new Date();
  const date =  NormalDateformat(fulldate);
  exportToCsv(`Informatios produits ${date}.csv`, datas);
}
const DownloadPdf =async ()=>{

  if(produits.value.length === 0) {

    toast.add({
        title: 'Problème',
        description: 'Aucun produit à exporter',
        color: 'warning',
        icon: 'lucide-alert-triangle',
        ui: {
          root: 'bg-red-500/90 rounded-lg p-4',
        },
      });
    return
  }
  const datas : object[] = [];
  produits.value.map((p,index)=>{
    const data = {
      id: index + 1,
      name: p.name,
      category: p.category,
      pua: `${p.pua} DZD`,
      puv: `${p.puv} DZD`,
      Benifice: `${p.puv - p.pua} DZD`,
      quantity: p.quantity
    }
    datas.push(data)
  })

  const fulldate = new Date();
  const date =  NormalDateformat(fulldate);
  const headers = ['#', 'Intitulé', 'Catégorie', 'Prix U.Achat', 'Prix U.Vente ','Benifice','Quantité'];
   await exportToPdf(`Informations produits ${date}.pdf`, headers, datas);
  
}


// the data for the cards
const nameFilter = ref('');
const filterProducts = () => {

  if (nameFilter.value === '') {
    cardProducts.value = produits.value;
  } else {
    cardProducts.value = produits.value.filter((product) => {
      return product.name.toLowerCase().includes(nameFilter.value.toLowerCase());
    });
  }
}
const resetProducts = () => {
  if(nameFilter.value.trim().length >0) {
    cardProducts.value = produits.value;
    nameFilter.value = '';
  } else {
    return
  }
}

// this is the table component
const UIcon = resolveComponent('UIcon');
const UBadge = resolveComponent('UBadge');
const globalFilter = ref('');
const ProduitColumns: TableColumn<Produit>[] = [
  {
    accessorKey: 'index',
    header: () => {
      return h('div', { class: 'text-white/50 font-extrabold' }, '#')
    },
    cell: ({ row }) => h('div', { class: 'text-white/50 font-extrabold' }, `#${row.getValue('index')}`)
  },
  {
    accessorKey: 'name',
    header: 'Intitule'
  },
  {
    accessorKey: 'quantity',
    header: 'Quantite',
    cell: ({ row }) => {
      return h('div', { class: 'text-blue-400 font-bold' }, row.getValue('quantity'))
    }
  },
  {
    accessorKey: 'pua',
    header: 'Prix U. Achat',
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('pua'))

      const formatted = new Intl.NumberFormat('fr', {
        style: 'currency',
        currency: 'DZD'
      }).format(amount)

      return h('div', { class: 'text-red-400 font-bold' }, formatted)
    }
  },
  {
    accessorKey: 'puv',
    header: 'Prix U. Vente',
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('puv'))

      const formatted = new Intl.NumberFormat('fr', {
        style: 'currency',
        currency: 'DZD'
      }).format(amount)

      return h('div', { class: ' font-medium text-green-400' }, formatted)
    }
  },
  {
    accessorKey: 'benifice',
    header: 'Benifice Par U',
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('puv')) - Number.parseFloat(row.getValue('pua'))

      const formatted = new Intl.NumberFormat('fr', {
        style: 'currency',
        currency: 'DZD'
      }).format(amount)

      return h('div', { class: 'text-yellow-400 font-bold' }, formatted)
    }
  },
  {
    header: 'Montant Stock',
    accessorKey: 'montant_stock',
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('pua')) * Number.parseFloat(row.getValue('quantity'))

      const formatted = new Intl.NumberFormat('fr', {
        style: 'currency',
        currency: 'DZD'
      }).format(amount)

      return h('div', { class: 'font-bold' }, formatted)
    }
  },

  {
    accessorKey: 'category',
    header: 'Categorie',
    cell: ({ row }) => {
      const category: string = row.getValue('category')
      const color = Catecolor(category)
      return h(UBadge, { label: category, class: color },)
    }
  },
  {
    header: 'Supprimer',
    accessorKey: 'id',
    cell: ({ row }) => {
      const id: string = row.getValue('id')
      return h(UIcon, { name: 'i-solar-trash-bin-trash-broken', class: 'font-bold p-2 bg-red-700 rounded size-8 hover:bg-red-500 cursor-pointer transition-bg duration-300 ease-in-out', id: id, onClick: () => handelDelete(id) },) 
    }
  }
]

//Server side functionalities
const isDelete = ref(false);
const handelDelete = async (id: string)=> {
  
  isDelete.value = true;
  try {
    const data : {success : boolean} = await $fetch(`/api/products`, {
      method: "DELETE",
      body:{
        id
      }
    })
    const { success } = data;
    if(!success){
      toast.add({
        title: 'Erreur',
        description: 'Erreur lors de la suppression du produit',
        color: 'warning',
        icon: 'lucide-alert-triangle',
        ui: {
          root: 'bg-red-500/90 rounded-lg p-4',
        },
      });
      return;
    } else {
      toast.add({
        title: 'Succès',
        description: 'Produit supprimé avec succès',
        color: 'success',
        icon: 'lucide-check-circle',
        ui: {
          root: 'bg-green-500/90 rounded-lg p-4',
        },
      });
    }
    refresh();
  } catch (error) {
    console.error(error);
    throw new Error('Erreur lors de la suppression du produit');
  }finally {
    isDelete.value = false;
  }

}



</script>
