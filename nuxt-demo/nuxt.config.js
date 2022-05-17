import colors from 'vuetify/es5/util/colors'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - nuxt-demo',
    title: 'nuxt-demo',
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: ''
    }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/main.scss',
    '@/assets/css/ag-grid-theme.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    // {src: '~plugins/native-websocket.js',mode:'client', ssr: false},
    {
      src: "~plugins/Map.js",
      mode: 'client'
    },
    {
      src: "~plugins/notifier.js",
      mode: 'client'
    },
    {
      src: "~plugins/websocket.js",
      mode: 'client'
    }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // 'nuxt-socket-io'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'http://127.0.0.1:8000/api/'
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    vendor: ["gmap-vue"],
    transpile: [
      'ag-grid-vue',
      'fuzzball',
      'vue-native-websocket'
    ]
  },

  plugins: [
    {
      ssr: false,
      src: "~plugins/Map.js"
    },
    {
      src: "~plugins/notifier.js",
      ssr: false,
    },
    {
      src: "~plugins/websocket.js",
      ssr: false,
    },
  ]
}
