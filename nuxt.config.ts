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
      {
        code: 'zh-TW',
        language: 'zh-TW',
        name: 'Traditional Chinese',
        file: 'zh-TW.json'
      },
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.json'
      }
    ],
    defaultLocale: 'zh-TW',
    strategy: 'no_prefix'
    // langDir: './i18n/locales',   // temporarily commented out to avoid any path issues
  },

  // Nitro configuration for Vercel deployment
  nitro: {
    externals: {
      inline: [
        '@intlify/utils',
        '@intlify/core',
        '@intlify/h3',
        '@intlify/shared',
        '@intlify/message-compiler',
        '@nuxtjs/i18n',
        'vue-i18n'
      ]
    },
    experimental: {
      wasm: false
    }
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

  
  // Build configuration
  build: {
    transpile: ['@headlessui/vue']
  }
})
