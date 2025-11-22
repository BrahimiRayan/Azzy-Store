<template lang="">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16 stagger-parent">
          <div class="stagger-child">
            <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
              Des tarifs
              <span class="text-green-500">adaptés</span> à votre croissance
            </h2>
          </div>
          <div class="stagger-child">
            <p class="text-xl text-white/80 max-w-3xl mx-auto">
              Commencez gratuitement et évoluez avec votre business. Pas de frais cachés, pas de surprises.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto stagger-parent">
          <div 
            v-for="(plan, index) in pricingPlans" 
            :key="index"
            class="stagger-child"
          >
            <div :class="[
              'relative rounded-3xl p-8 backdrop-blur-sm border-2 transition-all duration-500 h-full',
              plan.popular 
                ? 'bg-gradient-to-b from-green-500/10 to-blue-500/10 border-green-500/50 scale-105 shadow-2xl' 
                : 'bg-white/5 border-white/10 hover:border-green-500/30 hover:transform hover:-translate-y-2'
            ]">
              <div v-if="plan.popular" class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span class="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Plus Populaire
                </span>
              </div>
              
              <div class="text-center mb-8">
                <h3 class="text-2xl font-bold text-white mb-2">{{ plan.name }}</h3>
                <div class="flex items-baseline justify-center gap-1 mb-2">
                  <span class="text-4xl font-bold text-white">{{ plan.price }}</span>
                  <span v-if="plan.period" class="text-white/60">{{ plan.period }}</span>
                </div>
                <p class="text-white/70">{{ plan.description }}</p>
              </div>

              <ul class="space-y-4 mb-8">
                <li v-for="(feature, featureIndex) in plan.features" :key="featureIndex" class="flex items-center gap-3 text-white/80">
                  <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {{ feature }}
                </li>
              </ul>

              <button :class="[
                'w-full py-4 rounded-xl font-semibold transition-all duration-300',
                plan.popular
                  ? 'bg-green-500 hover:bg-green-600 text-white transform hover:scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              ]">
                {{ plan.cta }}
              </button>
            </div>
          </div>
        </div>
      </div>
</template>

<script setup lang="ts">
const pricingPlans = [
  {
    name: 'Starter',
    price: 'Gratuit',
    description: 'Parfait pour débuter',
    features: [
      'Jusqu\'à 50 produits',
      'Tableau de bord basique',
      'Export CSV',
      'Boutique en ligne basique',
      'Support par email'
    ],
    cta: 'Commencer Gratuitement',
    popular: false
  },
  {
    name: 'Pro',
    price: '19€',
    period: '/mois',
    description: 'Idéal pour les businesses en croissance',
    features: [
      'Produits illimités',
      'Analyses avancées',
      'Export PDF/CSV',
      'Boutique personnalisable',
      'Support prioritaire',
      'Intégrations avancées'
    ],
    cta: 'Essayer 14 Jours',
    popular: true
  },
  {
    name: 'Business',
    price: '49€',
    period: '/mois',
    description: 'Pour les entreprises établies',
    features: [
      'Toutes fonctionnalités Pro',
      'Multi-utilisateurs',
      'API complète',
      'Formation personnalisée',
      'Support 24/7',
      'Rapports personnalisés'
    ],
    cta: 'Nous Contacter',
    popular: false
  }
]

</script>
