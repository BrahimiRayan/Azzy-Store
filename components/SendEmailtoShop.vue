<template>

  <div class="relative group">
       
    <button
      v-if="buttonType === 'Floating'"
      @click="ToggleFormVisible"
      class="fixed z-800 top-3/4 right-4 w-14 h-14 opacity-75 rounded-full flex items-center justify-center shadow-md shadow-black/70 bg-gradient-to-br from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-xl cursor-pointer border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-amber-300/50"
      title="Envoyer un message"
      aria-label="Ouvrir le formulaire de contact"
    >
      <UIcon name="i-lucide-send" size="22" class="text-white" />
    </button>

    <button 
      v-else
      @click="ToggleFormVisible"
      class="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 hover:from-green-600 hover:to-emerald-600 text-white"
      title="Envoyer un message"
      aria-label="Ouvrir le formulaire de contact"
    >
      <span class="flex items-center justify-center">
        <UIcon name="i-lucide-send" class="mr-2" />
        Contacter la boutique
      </span>
    </button>

  </div>

<Transition name="modal">
  <div
      v-if="isFormShowing" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      @click.self="ToggleFormVisible"
    >
      <form
        class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md max-h-130 overflow-y-scroll flex flex-col gap-5 border border-gray-700"
        @submit.prevent="submitForm"
      >
        <!-- Header -->
        <div class="flex justify-between items-center pb-2 border-b border-gray-700">
          <h2 class="text-2xl font-bold bg-gradient-to-r from-green-300 to-emerald-100 bg-clip-text text-transparent">
            Envoyer un message
          </h2>

          <button
            type="button"
            @click="ToggleFormVisible"
            class="text-gray-400 hover:text-red-400 text-3xl transition-transform duration-200 hover:rotate-90 focus:outline-none focus:text-amber-500"
            aria-label="Fermer"
          >
            &times;
          </button>
        </div>
        
        
        <div class="space-y-5">
          <div>
            <label class="block text-sm font-medium mb-2 text-gray-300" for="name">
              Nom <span class="text-sm text-red-600">*</span>
            </label>
            <input
              v-model="form.name"
              id="name"
              type="text"
              class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
              required
              placeholder="Votre nom"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2 text-gray-300" for="email">
              Email <span class="text-sm text-red-600">*</span>
            </label>
            <input
              v-model="form.email"
              id="email"
              type="email"
              class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
              required
              placeholder="email@exemple.com"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2 text-gray-300" for="phone">
              Numéro Téléphone <span class="text-sm text-red-600">*</span>
            </label>
            <input
              v-model="form.phone"
              id="phone"
              type="tel"
              class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
              required
              placeholder="Votre numéro de téléphone"
            />
          </div>

          <!-- Products Selection - Multi-select -->
          <div>
            <label class="block text-sm font-medium mb-2 text-gray-300" for="products">
              Produits <span class="text-sm text-red-600">*</span>
            </label>
            <USelectMenu 
              v-model=" selectedProducts"
              :items="items" 
              multiple
              placeholder="Choisir un ou plusieurs produits"
              class="w-full bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
              :ui="{
                content: 'bg-gray-800 border border-gray-600',
                item: 'bg-gray-800 hover:bg-gray-700 text-white',
              }"
            />
          </div>

          <!-- Products with Quantities -->
          <div v-if="selectedProducts.length > 0" class="space-y-3">
            <div class="text-sm font-medium text-gray-300 mb-2">
              Quantités pour les produits sélectionnés:
            </div>
            
            <div 
              v-for="(product, index) in selectedProducts" 
              :key="index"
              class="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600"
            >
              <div class="flex-1">
                <span class="text-white font-medium">{{ product }}</span>
              </div>
              <div class="flex items-center gap-2">
                <button 
                  type="button"
                  @click="decrementQuantity(product)"
                  class="w-8 h-8 rounded bg-gray-600 hover:bg-gray-500 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="getProductQuantity(product) <= 1"
                >
                  <UIcon name="i-lucide-minus" class="text-sm" />
                </button>
                <span class="w-10 text-center text-white font-bold">
                  {{ getProductQuantity(product) }}
                </span>
                <button 
                  type="button"
                  @click="incrementQuantity(product)"
                  class="w-8 h-8 rounded bg-gray-600 hover:bg-gray-500 flex items-center justify-center text-white"
                >
                  <UIcon name="i-lucide-plus" class="text-sm" />
                </button>
              </div>
              <button
                type="button"
                @click="removeProduct(product)"
                class="text-red-400 hover:text-red-300 p-1"
                title="Retirer ce produit"
              >
                <UIcon name="i-lucide-x" class="text-sm" />
              </button>
            </div>

            <div class="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg border border-gray-600">
              <span class="text-sm text-gray-300">Quantité totale:</span>
              <span class="text-lg font-bold text-green-400">{{ totalQuantity }} unités</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2 text-gray-300" for="message">
              Message <span class="text-sm text-red-600">*</span>
            </label>
            <textarea
              v-model="form.message"
              id="message"
              rows="4"
              class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:emerald-amber-500 transition"
              required
              placeholder="Votre message (address, question, etc...)"
            ></textarea>
          </div>
        </div>

        <!-- Status Messages -->
        <div>
          <div v-if="formError" class="p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm">
            {{ formError }}
          </div>
          <div v-if="formSuccess" class="p-3 bg-green-900/50 border border-green-700 rounded-lg text-green-200 text-sm">
            {{ formSuccess }}
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="mt-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-lg px-4 py-3 shadow-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-amber-500 disabled:opacity-70 disabled:cursor-not-allowed"
          :disabled="formPending || selectedProducts.length === 0"
        >
          <span v-if="formPending" class="flex items-center justify-center">
            <UIcon name="i-lucide-loader-circle" class="animate-spin mr-2" />
            Envoi en cours...
          </span>
          <span v-else class="flex items-center justify-center">
            <UIcon name="i-lucide-send" class="mr-2" />
            Envoyer la commande
          </span>
        </button>
      </form>
  </div>
  </Transition>
</template>
    
<script setup lang='ts'>
import type { T_Button } from '~/types/GeneraleT';

const props = defineProps<{
  shopMail: string,
  shopProducts: string[];
  buttonType: T_Button;
}>()

const isFormShowing = ref<boolean>(false);

function ToggleFormVisible() {
  isFormShowing.value = !isFormShowing.value;
  if (!isFormShowing.value) {
    resetForm();
  }
}

const items = ref(props.shopProducts.map(product => product));


const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
});


const selectedProducts = ref<string[]>([]);
const productQuantities = ref<Record<string, number>>({});


const formPending = ref(false);
const formError = ref('');
const formSuccess = ref('');


watch(selectedProducts, (newProducts) => {
  newProducts.forEach(product => {
    if (!productQuantities.value[product]) {
      productQuantities.value[product] = 1;
    }
  });
  
  
  Object.keys(productQuantities.value).forEach(product => {
    if (!newProducts.includes(product)) {
      delete productQuantities.value[product];
    }
  });
});


const getProductQuantity = (product: string) => {
  return productQuantities.value[product] || 1;
};

const incrementQuantity = (product: string) => {
  productQuantities.value[product] = (productQuantities.value[product] || 1) + 1;
};

const decrementQuantity = (product: string) => {
  if (productQuantities.value[product] > 1) {
    productQuantities.value[product]--;
  }
};

const removeProduct = (product: string) => {
  selectedProducts.value = selectedProducts.value.filter(p => p !== product);
};

// Calculate total quantity
const totalQuantity = computed(() => {
  return Object.values(productQuantities.value).reduce((sum, qty) => sum + qty, 0);
});

// Reset form
const resetForm = () => {
  form.name = '';
  form.email = '';
  form.message = '';
  form.phone = '';
  selectedProducts.value = [];
  productQuantities.value = {};
  formError.value = '';
  formSuccess.value = '';
};

// Submit form
async function submitForm() {
  formError.value = '';
  formSuccess.value = '';
  formPending.value = true;

  // Validation
  if (!form.email || !form.name || !form.phone || !form.message) {
    formError.value = 'Veuillez remplir tous les champs obligatoires';
    formPending.value = false;
    return;
  }

  if (selectedProducts.value.length === 0) {
    formError.value = 'Veuillez sélectionner au moins un produit';
    formPending.value = false;
    return;
  }

  if (!props.shopMail) {
    formError.value = 'Erreur interne, veuillez réessayer plus tard';
    formPending.value = false;
    return;
  }

  try {


    const productsData = selectedProducts.value.map(product => ({
      product: product, 
      quantity: productQuantities.value[product] || 1
    }));

    await $fetch('/api/email/message', {
      method: 'POST',
      body: { 
        to: props.shopMail,
        name: form.name,
        email: form.email,
        phone: form.phone,
        products: productsData,
        message: form.message
      }
    });

    formSuccess.value = 'Commande envoyée avec succès !';
    setTimeout(() => {
      resetForm();
      ToggleFormVisible();
    }, 2000);
  } catch (e: any) {
    formError.value = e?.data?.message || 'Erreur lors de l\'envoi de la commande.';
  } finally {
    formPending.value = false;
  }
}
</script>