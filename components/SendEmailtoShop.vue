<template>
<div class="fixed bottom-3 right-3 z-40">
 
  <div class="relative group">
    
    <div 
      class="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-0 group-hover:opacity-75"
      style="animation-duration: 1.5s; animation-iteration-count: 3"
    ></div>
    
    
    <button
      @click="ToggleFormVisible"
      class="w-10 h-10 rounded-full flex items-center justify-center shadow-md shadow-black/70 bg-gradient-to-br from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-xl cursor-pointer border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-amber-300/50"
      title="Envoyer un message"
      aria-label="Ouvrir le formulaire de contact"
    >
      <UIcon name="i-lucide-send" size="22" class="text-white" />
    </button>
  </div>
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

        <div class="flex items-center gap-x-2">

            <div class="flex-11/12">
                <label class="block text-sm font-medium mb-2 text-gray-300" for="product">
                  Produits <span class="text-sm text-red-600">*</span>
                </label>
                <USelectMenu 
                      v-model="form.product" 
                      id="product" 
                      :items="items" 
                      class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
                      :ui="{
                        base : 'bg-red-500',
                        content : 'bg-gray-800',
                        item : 'bg-gray-800 border-b border-white/20 hover:bg-gray-700'
                      }"
                />
            </div> 

            <div >
                <label class="block text-sm font-medium mb-2 text-gray-300" for="qte">
                  Quantité <span class="text-sm text-red-600">*</span>
                </label>
                <input
                  v-model.number="form.quantite"
                  id="qte"
                  type="number"
                  min="1"
                  class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
                  required
                  placeholder="Quantité"
                />
                
            </div>
            
            <div>

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
          :disabled="formPending"
        >
          <span v-if="formPending" class="flex items-center justify-center">
            <UIcon name="i-lucide-loader-circle" class="animate-spin mr-2" />
            Envoi en cours...
          </span>
          <span v-else class="flex items-center justify-center">
            <UIcon name="i-lucide-send" class="mr-2" />
            Envoyer
          </span>
        </button>
      </form>
  </div>
  </Transition>
</template>
    
<script setup lang='ts'>

const props = defineProps<{
        shopMail : string,
        shopProducts : string[];
}>()

const isFormShowing = ref<boolean>(false);

function ToggleFormVisible(){
  isFormShowing.value = !isFormShowing.value
  
}

const items = ref(props.shopProducts)

const form = reactive({
    name: '',
    email: '',
    phone : '',
    product : 'Choisir le produit',
    message: '',
    quantite : 0
});

const formPending = ref(false);
const formError = ref('');
const formSuccess = ref('');

async function submitForm() {
          formError.value = '';
          formSuccess.value = '';
          formPending.value = true;

        if(!form.email || !form.name || !form.phone || !form.product || form.product ==='Choisir le produit' || !form.quantite || form.quantite === 0){
          console.log('messing input ... ');
          return
        }

        if(!props.shopMail){
          console.log('Internal erreur please try again');
          return
        }

        try {

            await $fetch('/api/email/message', {
              method: 'POST',
              body: { 
                to : props.shopMail,
                name : form.name,
                email : form.email,
                phone : form.phone,
                product : form.product,
                message : form.message,
                quantite : form.quantite,
              }
            });

            formSuccess.value = 'Message envoyé avec succès !';
            form.name = '';
            form.email = '';
            form.message = '';
            form.phone = '';
            form.product = 'Choisir le produit';
            form.quantite = 0
            setTimeout(() => {
              ToggleFormVisible()
              formSuccess.value = '';
            }, 2000);
          } catch (e: any) {
            formError.value = e?.data?.message || 'Erreur lors de l\'envoi du message.';
          } finally {
            formPending.value = false;
          }
      }
</script>
    