<template>
    <div class="flex gap-3 items-center mb-3">
        <UIcon name="lucide-shopping-basket" class="bg-green-500 " size="24" />
        <h1 class="text-xl text-white/90 font-bold ">Lancez votre boutique en ligne !</h1>
    </div>
    <UStepper :items="items" class="w-full " orientation="vertical" :ui="{
        separator : 'bg-gray-500 h-full transition-all duration-500 ease-in-out',
        trigger : 'ring-2 ring-white/30 bg-red-500 focus:bg-green-500 cursor-pointer transition-all duration-500 ease-in-out',
        header : ' h-120 p-3 border-r-2 border-gray-600',
        item : 'h-full mt-8',
        title : 'text-md font-extrabold',
        description : 'text-white/70 text-xs',
        wrapper : '-mt-0.5',
        root : 'border rounded-lg border-gray-500 mt-8',
        

    }">
    
<template #law>

  <div class="p-6 space-y-4">

    <h2 class="text-2xl font-bold text-green-400">Conditions d'utilisation</h2>
    <div class=" max-w-none ml-3">
      <p>Pour activer votre boutique, veuillez accepter nos conditions :</p>
      <ul class="space-y-2 ml-5 my-3 text-sm list-disc">
        <li><strong>Respecté Les règles :</strong> Votre boutique respectera nos guidelines</li>
        <li> <strong>Authenticité des produits :</strong> Vous garantissez que tous les articles 
          proposés sont conformes à leurs descriptions.
        </li>
        <li> <strong>Responsabilité des transactions :</strong> Vous êtes seul responsable 
          des ventes effectuées via votre boutique, y compris en cas de litige 
          ou de fraude.
        </li>
      </ul>
    </div>
    
    <UCheckbox label="J'accepte les conditions d'utilisation" v-model="isAgree" :ui="{
        indicator : 'bg-green-500',
        icon : 'text-black',
        base : 'bg-white/20'

    }" />
    
  </div>

</template>
    
<template #settings>
        <ExplainCoustum/>    
</template>

<template #link>
        <div class="p-6 space-y-4">
            <h2 class="text-2xl font-bold text-green-400">Lancez vous en ligne !</h2>
            <p class="text-md text-white/80">Une fois que vous cliquez sur 'Créer ma e-boutique', vous obtenez instantanément :</p>

            <ul class="list-disc ml-8">
                <li>Un lien unique vers votre boutique.</li>
                <li>La possibilité de la partager sur les réseaux sociaux.</li>
                <li>Un espace personnalisé à styliser selon vos goûts.</li>
            </ul>
            <p>Le plus dur est fait, place maintenant à la personnalisation !</p>
        </div>
        <UButton label="Créer ma e-boutique" @click="OpenMyShop" class="bg-green-600 mx-auto block h-12 mt-15 disabled:bg-gray-600" :disabled="!isAgree"/>

        <div v-if="!isAgree" class="flex p-4 bg-red-500 rounded-lg w-max items-center gap-3 mt-4">
            <UIcon name="lucide-triangle-alert" size="24" />
            <p>Vous devez accepter les droits d'utilisation !</p>
        </div>
</template>
  
</UStepper>
    

</template>
    
<script setup lang='ts'>
import type { StepperItem } from '@nuxt/ui'

const items = [
  {
    slot: 'law' as const,
    title: 'Accepter les conditions',
    description: 'Validez les droits d\'utilisation pour créer votre boutique en ligne',
    icon: 'lucide-scroll-text'
  }, {
    slot: 'settings' as const,
    title: 'Personnalisation',
    description: 'Configurez l\'apparence de votre boutique selon vos préférences',
    icon: 'lucide-settings-2'
  }, {
    slot: 'link' as const,
    title: 'Commencez votre e-boutique !',
    description: 'Obtenez et partagez le lien unique de votre boutique en ligne',
    icon: 'lucide-link'
  }
] satisfies StepperItem[]

const isAgree = ref<boolean>(false)

async function OpenMyShop(){
    if(!isAgree.value){
        return
    }
    // 1 . create a shop config
    // 2 . update the shop foreigne key for the config && isOnline to true; 
    try {

        const data = await $fetch('/api/eshop/create', {
           method : 'POST',
         });
         
         await $fetch('/api/shop' , {
            method : 'PUT',
            body : {

            }
         })
    } catch (error) {
        
    }

}
</script>
    