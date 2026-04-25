// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // App configuration
  app: {
    head: {
      title: 'Destination-Anywhere - 旅遊目的地預訂平台',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '專業的旅遊目的地預訂平台，提供全球旅遊資訊與預訂服務' }
      ]
    }
  },

  // Modules
  modules: [
    '@element-plus/nuxt',
    '@nuxtjs/i18n'
  ],

  // Element Plus configuration
  elementPlus: {
    importStyle: 'scss',
    icon: 'ElIcon'
  },

  // Vite configuration
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/config.scss" as *;'
        }
      }
    }
  },

  // i18n configuration
  i18n: {
    locales: [
      {
        code: 'zh-TW',
        name: '繁體中文',
        file: 'zh-TW.json'
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.json'
      }
    ],
    defaultLocale: 'zh-TW',
    langDir: 'locales',
    lazy: true,
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  // Nitro configuration
  nitro: {
    esbuild: {
      options: {
        target: 'esnext'
      }
    },
    routeRules: {
      '/api/**': { cors: true }
    }
  },

  // Auto-imports
  imports: {
    dirs: [
      'composables/**',
      'utils/**',
      'stores/**'
    ]
  },

  // Components
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  // Runtime config
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || '/api',
      appName: 'Destination-Anywhere'
    },
    private: {
      apiSecret: process.env.API_SECRET
    }
  },

  // SSR configuration
  ssr: true,

  // Build configuration
  build: {
    transpile: ['element-plus/es']
  }
})
