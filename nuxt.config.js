export default {
  head: {
    titleTemplate: '%s - evr_uz',
    title: 'evr_uz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap' }
    ],
  },

  loading: '~/components/LoadingBar.vue',


  css: [
    '~/static/scss/main.scss',
  ],

  plugins: [
    { src: '~/plugins/vue-plyr', mode: 'client', },
    { src: '~/plugins/vue-player', mode: 'client', },
    { src: '~/plugins/vue-snip', mode: 'client', },
    { src: '~/plugins/axios', mode: 'client', },
    { src: '~plugins/v-mask.js', mode: 'client' },
    { src: '~/plugins/fingerprint', mode: 'client' },
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
  ],

  i18n: {
    langDir: 'lang/',
    lazy: true,
    locales: [
      {
        name: "Uzbek",
        code: "uz",
        iso: "uz-UZ",
        file: "uz-UZ.js"
      },
      {
        name: "Russian",
        code: "ru",
        iso: "ru-UA",
        file: "ru-RU.js"
      },
      {
        name: "English",
        code: "en",
        iso: "en-US",
        file: "en-EN.js"
      },
    ],
    defaultLocale: 'uz',
    vueI18n: {
      fallbackLocale: 'uz',
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    }
  },


  axios: {
    baseURL: '/',
    proxy: true
  },

  content: {},

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#00278C',
          secondary: '#FBD230',
          info: '#1877F2',
        },
        light: {
          primary: '#00278C',
          secondary: '#FBD230',
          info: '#1877F2',
        },
      },
    },
  },
  build: {
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },
  },

  generate: {
    fallback: true
  }
}