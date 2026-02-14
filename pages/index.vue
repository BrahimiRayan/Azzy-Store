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
      <PubHero/>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-white/5 backdrop-blur-sm animate-section">
      <PubStates />
    </section>

    <!-- Features Section -->
    <section id="features" class="pt-20 animate-section">
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
    <section id="faq" class="animate-section">
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