<template>
      <div class="sm:max-w-7xl mx-auto px-6 ">
        <div class="text-center mb-16 stagger-parent">
          <div class="stagger-child">
            <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
              Tout pour 
              <span class="text-green-500">maîtriser</span> votre business
            </h2>
          </div>
          <div class="stagger-child">
            <p class="text-xl text-white/80 max-w-3xl mx-auto">
              Des outils puissants mais simples pour gérer chaque aspect de votre business en ligne, conçus spécialement pour les petites entreprises
            </p>
          </div>
        </div>

        <!-- Interactive Features Showcase -->
        <div class="mb-16 w-full">
          <div class="space-y-6">
            <div 
              v-for="(feature, index) in features" 
              :key="index"
              @click="setActiveFeature(index)"
              :class="[
                'group max-sm:p-2 p-6 rounded-2xl cursor-pointer transition-all duration-500 border-2',
                activeFeature === index 
                  ? 'bg-gradient-to-r from-white/10 to-white/5 border-green-500/50 shadow-lg' 
                  : 'bg-white/5 border-transparent hover:border-white/10'
              ]"
              
            >
                <div class="flex items-center gap-4">
                  <div class="text-3xl">{{ feature.icon }}</div>
                  <div class="w-full">
                    <h3 class="text-xl font-semibold text-white mb-2 flex justify-between"><span>{{ feature.title }}</span> <UIcon name="i-tabler-click" class="group-hover:animate-bounce " size="24"/> </h3>
                    <p class="text-white/70 max-sm:text-sm">{{ feature.description }}</p>
                  </div>
                </div>
                
                <div v-if="activeFeature === index" class=" flex max-md:flex-col p-4 lg:items-center justify-between">
                  <div class="max-md:my-4 ml-4 space-y-2 ">
                    <h1 class="text-2xl text-green-500 font-black">propriétés </h1>
                  <div 
                    v-for="(detail, detailIndex) in feature.details" 
                    :key="detailIndex"
                    class="flex items-center gap-3 lg:py-1 text-white/80 text-sm lg:text-lg lg:hover:-translate-y-2.5 lg:hover:my-5  lg:hover:translate-x-2.5 transition-all ease-in-out duration-300"
                  >
                    <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    {{ detail }}
                  </div>
                  </div>
                    <!-- video player  -->
                  <div class="relative max-h-96 bg-gradient-to-br overflow-hidden from-white/10 to-white/5 rounded-3xl p-2 lg:p-8  backdrop-blur-xl border border-white/10">
                        <div class="">
                          <div class="">
                            <video 
                              :src="features[activeFeature].video" 
                              autoplay 
                              muted 
                              class="rounded-xl w-full lg:h-64 border-2 border-white/40 shadow-2xl object-cover"
                            />
                            <h2 class="text-white text-center mt-4 font-semibold text-md lg:text-xl">{{ features[activeFeature].title }}</h2>
    
                          </div>
                        </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        

      </div>
</template>


<script setup lang='ts'>
const activeFeature = ref(0);
const setActiveFeature = (index: number) => {
  activeFeature.value = index
};
const features = [
  {
    icon: '📊',
    title: 'Tableau de Bord Intelligent',
    video : '/demo-dashboard.mp4',
    description: 'Visualisez vos performances avec des graphiques clairs : ventes, achats, bénéfices par mois, et vos produits les plus rentables.',
    details: [
      'Graphiques mensuels des ventes et achats',
      'Calcul automatique des bénéfices nets',
      'Identification des MVP (produits les plus vendus)',
      'Alertes de performance en temps réel'
    ],
    color: 'from-green-500/20 to-blue-500/20'
  },
  {
    icon: '📦',
    title: 'Gestion de Stock Avancée',
    video : '/demo-products.mp4',
    description: 'Suivez chaque produit, valeur du stock, quantités. Import/export PDF/CSV et statistiques détaillées par produit.',
    details: [
      'Gestion multi-entrepôts',
      'Alertes de stock faible automatiques',
      'Historique complet des mouvements',
      'Export PDF/CSV personnalisable'
    ],
    color: 'from-blue-500/20 to-purple-500/20'
  },
  {
    icon: '🛒',
    title: 'Commandes & Fournisseurs',
    video : '/demo-commandes.mp4',
    description: 'Gérez vos commandes, générez des PDF professionnels pour vos fournisseurs et analysez vos habitudes d\'achat.',
    details: [
      'Génération de bons de commande PDF',
      'Historique des commandes fournisseurs',
      'Analyse des coûts d\'approvisionnement',
      'Gestion des délais de livraison'
    ],
    color: 'from-purple-500/20 to-pink-500/20'
  },
  {
    icon: '🌐',
    title: 'Boutique en Ligne',
    video : '/demo-eshop.mp4',
    description: 'Créez une page de vente personnalisable en quelques clics. Partagez sur les réseaux et vendez directement.',
    details: [
      'Design responsive automatique',
      'Personnalisation couleurs et polices',
      'Intégration réseaux sociaux',
      'Paiements sécurisés intégrés'
    ],
    color: 'from-pink-500/20 to-orange-500/20'
  }
]
</script>
<style lang="">
    
</style>