<template lang="">
          <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div class="space-y-8 stagger-parent">
            <div class="stagger-child">
              <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
                Simple et 
                <span class="text-green-500">Efficace</span>
              </h2>
              <p class="text-xl text-white/80 mb-8">
                Mettez en place votre boutique complète en moins de 10 minutes, même sans compétences techniques.
              </p>
            </div>
            
            <div class="space-y-6">
              <div v-for="step in [1,2,3,4]" :key="step" class="flex gap-6 stagger-child group">
                <div class="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                  {{ step }}
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-white mb-2">
                    {{ [
                      'Inscrivez-vous en 30 secondes',
                      'Importez vos produits',
                      'Configurez votre boutique',
                      'Commencez à vendre !'
                    ][step-1] }}
                  </h3>
                  <p class="text-white/70">
                    {{ [
                      'Créez votre compte gratuit, aucune carte de crédit requise',
                      'Ajoutez manuellement ou importez en masse via CSV',
                      'Personnalisez les couleurs et l\'apparence de votre boutique',
                      'Partagez votre lien et recevez vos premières commandes'
                    ][step-1] }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="relative stagger-child">
            <div class="relative z-10 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 backdrop-blur-xl border border-white/10 shadow-2xl">
              <div class="bg-slate-800 rounded-2xl p-6 h-80 flex items-center justify-center">
                <div class="text-center space-y-4">
                  <div class="text-6xl">🚀</div>
                  <div class="text-white font-semibold">Configuration Rapide</div>
                  <div class="text-white/60">Opérationnel en quelques minutes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

