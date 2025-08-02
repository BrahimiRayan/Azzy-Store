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
      ],
    }
  },

  vite : {
    plugins : [tailwindcss()]
  },
  modules: ['@nuxt/ui', "@nuxt/image", '@nuxtjs/leaflet', 'nuxt-qrcode'],
  runtimeConfig : {
    public : {
      BaseUrl : process.env.MODE === 'DEV' ? process.env.OFF_URL : process.env.ON_URL,
    },
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    emailFrom: process.env.EMAIL_FROM
  }
})