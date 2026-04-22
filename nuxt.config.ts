// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // TypeScript strict mode
  typescript: {
    strict: true
  },

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxt/image'
  ],

  // Tailwind CSS
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    viewer: true,
  },

  // i18n configuration
  i18n: {
    locales: [
      { code: 'zh-TW', language: 'zh-TW', name: 'Traditional Chinese', file: 'zh-TW.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
    ],
    defaultLocale: 'zh-TW',
    strategy: 'no_prefix'
  },

  // App configuration
  app: {
    head: {
      title: 'DA - Digital Assistant',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A modern digital assistant application' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // Runtime config
  runtimeConfig: {
    // Private keys (only available on server-side)
    apiSecret: process.env.API_SECRET,
    
    // Public keys (exposed to client-side)
    public: {
      apiBase: process.env.API_BASE || '/api',
      appName: process.env.APP_NAME || 'DA'
    }
  },

  // CSS configuration
  css: [
    '~/assets/css/main.css'
  ],

  // Build configuration
  build: {
    transpile: ['@headlessui/vue']
  }
})
