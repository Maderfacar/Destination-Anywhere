// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  typescript: {
    strict: true
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxt/image'
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    viewer: true,
  },

  // Vercel 專用設定（最重要）
  nitro: {
    preset: 'vercel',
    externals: {
      inline: ['@intlify/h3', 'vue']
    }
  },

  app: {
    head: {
      title: 'DestinationAnywhere',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '台灣機場接送訂車平台' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      lineLiffId: process.env.NUXT_PUBLIC_LINE_LIFF_ID || 'placeholder',
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY || 'placeholder',
      googleMapsApiKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'placeholder'
    }
  }
})