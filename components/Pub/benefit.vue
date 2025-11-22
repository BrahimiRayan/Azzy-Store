<template>
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16 stagger-parent">
          <div class="stagger-child">
            <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
              Pourquoi les businesses
              <span class="text-green-500">nous choisissent</span>
            </h2>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-parent">
          <div v-for="(benefit, index) in benefits" :key="index" class="stagger-child">
            <div class="text-center group">
              <div class="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300 inline-block">
                {{ benefit.icon }}
              </div>
              <h3 class="text-xl font-semibold text-white mb-3">{{ benefit.title }}</h3>
              <p class="text-white/70 mb-4 leading-relaxed">{{ benefit.description }}</p>
              <div class="text-green-500 font-semibold text-sm">{{ benefit.stats }}</div>
            </div>
          </div>
        </div>
      </div>
</template>

<script setup lang='ts'>
const benefits = [
  {
    title: 'Gagnez du Temps',
    description: 'Automatisez vos tâches répétitives de gestion et concentrez-vous sur votre croissance',
    icon: '⏱️',
    stats: 'Jusqu\'à 10h/semaine économisées'
  },
  {
    title: 'Réduisez les Erreurs',
    description: 'Plus de calculs manuels, plus de stocks perdus. Tout est tracé et vérifié automatiquement',
    icon: '✅',
    stats: '99% de réduction des erreurs'
  },
  {
    title: 'Augmentez vos Bénéfices',
    description: 'Identifiez vos produits les plus rentables et optimisez votre stratégie de vente',
    icon: '💰',
    stats: '+30% de rentabilité en moyenne'
  },
  {
    title: 'Vendez Partout',
    description: 'Votre boutique en ligne vous suit partout, accessible sur tous les appareils',
    icon: '📱',
    stats: '100% mobile-friendly'
  }
]
</script>
