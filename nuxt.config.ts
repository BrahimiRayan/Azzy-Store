import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  // debug : true ,
  css : ["~/assets/css/main.css"],
  app: {
    head: {
      title: 'Azze store',
      htmlAttrs: {
        lang: 'fr'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ]
    }
  },

  vite : {
    plugins : [tailwindcss()]
  },
  modules: ['@nuxt/ui', "@nuxt/image" ,'@nuxtjs/leaflet'],

})