<template>
  <v-app>
    <navigation />
    <social-fixed />
    <Nuxt />
    <Footer />
  </v-app>
</template>

<script>
import Navigation from '~/components/Navigation.vue'
import SocialFixed from '~/components/SocialFixed.vue'
import Footer from '~/components/Footer.vue'
export default {
  name: 'DefaultLayout',
  components: {
    Navigation,
    SocialFixed,
    Footer,
  },

  computed: {},
}
</script>
