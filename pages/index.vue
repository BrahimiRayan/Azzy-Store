<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

definePageMeta({
  layout: 'comercial',
})

let observer: IntersectionObserver | null = null

onMounted(() => {
  const options = { root: null, threshold: 0.15 }
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('in-view')
    })
  }, options)

  document.querySelectorAll('.animate-section').forEach((el) => observer?.observe(el))
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})

</script>

<template>
  <div class="min-h-screen bg-[var(--deep-dark-blue)] text-white/90">
  <!-- Hero -->
  <section class="min-h-screen max-w-6xl mx-auto px-6 py-20 lg:py-32 animate-section">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7">
          <h1 class="text-4xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-green-500">
           Analyser , Créez et développez votre boutique en ligne — Azzy-store simple et puissante.
          </h1>
          <p class="mt-6 text-lg text-white/80 max-w-2xl">
            Avec Azzy-store, restez connecté aux besoins de votre business et développez-vous en toute simplicité. Passez facilement de petite à grande business.
          </p>

          <div class="mt-8">
            <!-- CTAs removed as requested -->
          </div>

          <ul class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/80">
            <li class="flex items-center gap-3"><span class="inline-block w-2 h-2 bg-green-600 rounded-full" /> Démarrage gratuit</li>
            <li class="flex items-center gap-3"><span class="inline-block w-2 h-2 bg-green-600 rounded-full" /> Utile facile</li>
            <li class="flex items-center gap-3"><span class="inline-block w-2 h-2 bg-green-600 rounded-full" /> Analyses et gestion de stocks</li>
            <li class="flex items-center gap-3"><span class="inline-block w-2 h-2 bg-green-600 rounded-full" /> Une page online personnalisable</li>
          </ul>
        </div>

        <div class="lg:col-span-5">
          <div class="w-full rounded-2xl shadow-lg overflow-hidden bg-white/10 ">
            <div class="p-6">
              <div class="h-64 bg-slate-100/20 rounded-md flex items-center justify-center text-slate-400">
              
                <img src="../assets/pics/Logo-dark.webp" alt="Shop illustration" width="220" height="120" class="float-anim"/>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    
    <section class="max-w-6xl mx-auto px-6 py-12">
      <div class="space-y-12">
        <div class="grid lg:grid-cols-12 gap-8 items-center animate-section min-h-screen">
          <div class="lg:col-span-6">
            <h3 class="text-5xl font-semibold text-green-500">Gestion des produits</h3>
            <p class="mt-4 text-white/80">Créez et organisez des produits, ajoutez des images et variantes, importez/exportez des CSV et gérez les stocks depuis un seul endroit.</p>
            <ul class="mt-4 text-sm text-white/80 space-y-2">
              <li>• Import/export en masse</li>
              <li>• Descriptions et images riches</li>
              <li>• Catégories et tags</li>
            </ul>
          </div>
          <div class="lg:col-span-6">
            <div class="rounded-lg overflow-hidden bg-white border border-slate-100 shadow-sm">
              <div class="h-48 flex items-center justify-center bg-slate-50 text-slate-300">Product UI preview</div>
            </div>
          </div>
        </div>

        <div class="grid lg:grid-cols-12 gap-8 items-center animate-section">
          <div class="lg:col-span-6 lg:order-2">
            <h3 class="text-2xl font-semibold text-green-500">Commandes & statistiques</h3>
            <p class="mt-4 text-white/80">Gérez les commandes entrantes, mettez à jour les statuts et exportez les données. Les analyses intégrées vous aident à repérer les tendances.</p>
            <ul class="mt-4 text-sm text-white/80 space-y-2">
              <li>• Filtrage des commandes & export CSV</li>
              <li>• Vue d'ensemble des ventes et conversions</li>
            </ul>
          </div>
          <div class="lg:col-span-6 lg:order-1">
            <div class="rounded-lg overflow-hidden bg-white border border-slate-100 shadow-sm">
              <div class="h-48 flex items-center justify-center bg-slate-50 text-slate-300">Orders dashboard preview</div>
            </div>
          </div>
        </div>

        <div class="grid lg:grid-cols-12 gap-8 items-center animate-section min-h-screen">
          <div class="lg:col-span-6">
            <h3 class="text-2xl font-semibold text-green-500">Personnalisation & thèmes</h3>
            <p class="mt-4 text-white/80">Personnalisez l'apparence de votre boutique avec des options de thème simples ou remplacez des composants pour un contrôle total.</p>
            <ul class="mt-4 text-sm text-white/80 space-y-2">
              <li>• Préréglages de thème</li>
              <li>• Mise en page basée sur des composants</li>
            </ul>
          </div>
          <div class="lg:col-span-6">
            <div class="rounded-lg overflow-hidden bg-white border border-slate-100 shadow-sm">
              <div class="h-48 flex items-center justify-center bg-slate-50 text-slate-300">Aperçu de l'éditeur de thème</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- (Testimonials removed for now) -->

    <!-- CTA Footer -->
  <footer class="mt-12 bg-white border-t border-slate-100">
      <div class="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h4 class="text-lg font-semibold text-green-500">Prêt à ouvrir votre boutique ?</h4>
          <p class="text-sm text-slate-600">Créez votre boutique et commencez à vendre en quelques minutes.</p>
        </div>

        <div class="flex items-center gap-3">
          <!-- CTA buttons removed as requested -->
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* simple scroll animations using IntersectionObserver */
.animate-section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 700ms cubic-bezier(.2,.9,.2,1), transform 700ms cubic-bezier(.2,.9,.2,1);
  will-change: opacity, transform;
}
.animate-section.in-view {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .animate-section { transition: none; transform: none; }
}

/* floating image animation */
.float-anim {
  display: inline-block;
  animation: float 6s ease-in-out infinite;
  will-change: transform;
}

@keyframes float {
  0% { transform: translateY(0px) translateX(0px);   }
  25% {transform: translateX(12px);}
  50% { transform: translateY(-12px) translateX(-12px); }
  75% {transform: translateX(4px);}
  100% { transform: translateY(0px) translateX(0px); }
}

@media (prefers-reduced-motion: reduce) {
  .float-anim { animation: none; }
}
</style>
