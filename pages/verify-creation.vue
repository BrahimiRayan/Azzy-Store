<template>
  <main class=" fixed inset-0 max-w-[1440px] bg-gradient-to-br from-emerald-900 to-blue-900 flex items-center justify-center p-4 -z-10 overflow-scroll">
    <section class="max-w-4xl w-full bg-white/10 backdrop-blur-md rounded-2xl overflow-scroll shadow-2xl flex flex-col md:flex-row mt-20">
      <div class="p-8 md:p-12 flex-1 flex flex-col justify-center">
        <div class="mb-8">
          <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
            <UIcon name="i-lucide-mail" size="28"/>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">Vérifiez votre email</h1>
          <p class="text-lg text-white/90 mb-6">
            Nous avons envoyé un lien de confirmation à votre adresse email. 
            Cliquez sur le lien pour vérifier votre compte et commencer à utiliser notre service.
          </p>
        </div>

        <div class="space-y-4">
          <a 
            href="https://mail.google.com/mail" 
            class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors duration-200"
          >
            <UIcon name="i-lucide-mails" size="24"/>
            Ouvrir Gmail
          </a>

          <p class="text-sm text-white/70">
            Vous ne trouvez pas l'email ?
            <span class="text-green-300">Vérifiez votre dossier spam.</span><br>
            Le lien est valide pour 30 min.
            
          </p>
        </div>
      </div>

      <div class="flex-1 hidden md:flex items-center justify-center bg-white/5 p-8">
        <img 
          src="/public/checkMail.png" 
          alt="Mail illustration" 
          class="w-full h-auto max-h-96 object-contain animate-float"
        >
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'comercial',
})
</script>

<style>
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>