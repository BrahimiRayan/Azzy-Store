<script setup lang="ts">

definePageMeta({
  layout: 'comercial',
})

const observer = ref<IntersectionObserver | null>(null)

onMounted(() => {
  const options = { 
    root: null, 
    threshold: 0.1,
    rootMargin: '-50px 0px -50px 0px'
  }
  
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view')
        
        const children = entry.target.querySelectorAll('.stagger-child')
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('stagger-in')
          }, index * 150)
        })
      }
    })
  }, options)

  document.querySelectorAll('.animate-section').forEach((el) => observer.value?.observe(el))
})

onBeforeUnmount(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
})

</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-(--deep-dark-blue) via-(--deep-dark-blue) to-slate-900 text-white/90 overflow-hidden">
    
    <!-- My hero section -->
    <section class="lg:min-h-screen flex items-center justify-center pt-2 animate-section">
      <div class="max-w-7xl mx-auto px-6 py-6 lg:py-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div class="space-y-8 stagger-parent">
            <div class="stagger-child">
              <div class="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-4">
                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span class="text-green-500 text-sm font-medium">Le meilleur choix pour les petites businesses</span>
              </div>
              <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
                <span class="text-green-500 block mb-2">Votre Business</span>
                <span class="text-white block">Sous Contrôle Total</span>
              </h1>
            </div>
            
            <div class="stagger-child">
              <p class="text-xl text-white/80 leading-relaxed max-w-2xl">
                Azzy-store transforme la gestion de votre boutique en ligne. Suivez vos stocks, analysez vos performances et créez votre boutique en ligne—le tout depuis une seule plateforme intuitive conçue spécifiquement pour <span class="underline border-b-1 border-white text-green-500 font-extrabold">les petites businesses</span> .
              </p>
            </div>

            <div class="stagger-child">
              <div class="flex flex-col sm:flex-row gap-4">
                <NuxtLink  to="/signIn" >
                  <button class="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25">
                    Essayer Gratuitement - 0€
                  </button>
                </NuxtLink>
                <button class="border border-white/20 hover:border-green-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/5">
                  📽️ Voir la Démo
                </button>
              </div>
            </div>

            <div class="stagger-child">
              <div class="flex items-center gap-6 text-sm text-white/60">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  Simple et Intuitif
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  Intégration rapide
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  Boutique online incluse
                </div>
              </div>
            </div>
          </div>

          <div class="relative stagger-child">
            <div class="relative z-10 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 backdrop-blur-xl border border-white/10 shadow-2xl">
              <div class="bg-slate-800 rounded-2xl p-6 h-96 flex items-center justify-center">
                <div class="text-center space-y-6">
                  <img src="../assets/pics/Logo-dark.webp" alt="Azzy-Store Dashboard" class="w-48 mx-auto -mb-16 z-2 float-anim" />
                  <div class=" bg-[url(~/assets/pics/giving-hands2.png)]  w-58 h-40 mx-auto bg-contain bg-no-repeat "></div>
                  <p>Tout dans un seul endroit</p>
                </div>
              </div>
            </div>
            
            <div class="absolute -top-4 -right-4 w-24 h-24 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
            <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-white/5 backdrop-blur-sm animate-section">
      <PubStates />
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 animate-section">
      <PubFeatures />
    </section>

    <!-- Benefits Section -->
    <section id="benefits" class="py-20 bg-white/5 backdrop-blur-sm animate-section">
      <PubBenefit />
    </section>

    <!-- How It Works -->
    <section id="how-it-works" class="py-20 animate-section">
      <PubHowitworks/>
    </section>

    <!-- Pricing Section -->

    <!-- <section id="pricing" class="py-20 animate-section">
      <PubPricing />
    </section> -->

    <!-- FAQ Section -->
    <section id="faq" class="py-20 animate-section">
      <PubQandA />
    </section>

    <!-- CTA Section -->
    <section class="py-20 animate-section">
      <PubCta />
    </section>



  </div>
</template>

<style scoped>

.animate-section {
  opacity: 0;
  transform: translateY(60px);
  transition: all 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: opacity, transform;
}

.animate-section.in-view {
  opacity: 1;
  transform: translateY(0);
}


.stagger-child {
  opacity: 0;
  transform: translateY(30px);
  transition: all 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.stagger-child.stagger-in {
  opacity: 1;
  transform: translateY(0);
}


.float-anim {
  display: inline-block;
  animation: float 8s ease-in-out infinite;
  will-change: transform;
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  33% { 
    transform: translateY(-20px) rotate(2deg); 
  }
  66% { 
    transform: translateY(10px) rotate(-1deg); 
  }
}

/* Gradient text animation */
.gradient-text {
  background: linear-gradient(45deg, #10b981, #3b82f6, #8b5cf6);
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .animate-section,
  .stagger-child,
  .float-anim {
    transition: none;
    animation: none;
    transform: none;
    opacity: 1;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
</style>