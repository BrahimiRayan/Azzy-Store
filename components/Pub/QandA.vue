<template >
      <div class="max-w-4xl mx-auto px-6">
        <div class="text-center mb-16 stagger-parent">
          <div class="stagger-child">
            <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
              Questions
              <span class="text-green-500">Fréquentes</span>
            </h2>
          </div>
          <div class="stagger-child">
            <p class="text-xl text-white/80">
              Tout ce que vous devez savoir avant de commencer
            </p>
          </div>
        </div>

        <div class="space-y-6 stagger-parent">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="stagger-child bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:border-green-500/30 transition-all duration-300"
          >
            <h3 class="text-xl font-semibold text-white mb-4">{{ faq.question }}</h3>
            <p class="text-white/70 leading-relaxed">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
</template>

<script setup lang="ts">
const faqs = [
  {
    question: 'Puis-je importer mes produits existants ?',
    answer: 'Absolument ! Azzy-store supporte l\'import CSV pour migrer facilement vos produits, stocks et historiques.'
  },
  {
    question: 'Mes données sont-elles sécurisées ?',
    answer: 'Oui, nous utilisons un chiffrement de niveau bancaire et sauvegardons vos données quotidiennement sur des serveurs sécurisés en Europe.'
  },
  {
    question: 'Puis-je utiliser Azzy-store sur mobile ?',
    answer: 'Bien sûr ! Notre interface est 100% responsive et fonctionne parfaitement sur smartphone, tablette et ordinateur.'
  },
  {
    question: 'Comment fonctionne la boutique en ligne ?',
    answer: 'En quelques clics, générez une page de vente personnalisable que vous pouvez partager via un lien unique. Les paiements sont sécurisés et directement intégrés.'
  }
]
</script>
