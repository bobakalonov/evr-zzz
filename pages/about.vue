<template>
  <div class="about-page">
    <div v-if="aboutData.success" class="my-container">
      <img :src="`${baseURL}${aboutData.data.image}`" alt="about image" />
      <h2 class="about-page__title">{{ aboutData.data.title }}</h2>
      <p class="about-page__desc" v-html="aboutData.data.content"></p>
      <div class="about-page__links">
        <nuxt-link :to="localePath('/contact')" class="contact-btn"
          >Biz bilan aloqa</nuxt-link
        >
        <nuxt-link :to="localePath('/terms-of-adv-page')" class="ad-btn"
          >Reklama xizmatlari</nuxt-link
        >
      </div>
    </div>
    <div v-else class="my-container">
      <div class="not-found">
        <not-found-data />
      </div>
    </div>
    <div v-if="faq.success" class="my-container">
      <h2 class="about-page__title">Ko’p beriladigan savollar</h2>
      <v-expansion-panels>
        <v-expansion-panel v-for="(fi, i) in faq.data" :key="i">
          <v-expansion-panel-header>{{ fi.title }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            {{ fi.description }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div v-else class="my-container">
      <div class="not-found">
        <not-found-data />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AboutPage',
  async fetch({ store, error }) {
    try {
      await store.dispatch('allData/fetchSettings')
      await store.dispatch('allData/fetchMenuItems')
      await store.dispatch('allData/fetchSocialItems')

      await store.dispatch('allData/fetchAboutData')
      await store.dispatch('allData/fetchFaq')
    } catch (e) {
      error({
        statusCode: e.statusCode,
        message: e.message,
      })
    }
  },
  head() {
    return {
      title: 'Evr.uz - Biz Haqimizda',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "Evr.uz - Bosh Sahifa | O'zbekistinda birinchi raqamli Yangiliklar sayti",
        },
      ],
    }
  },
  computed: mapState({
    aboutData: (state) => state.allData.aboutData,
    baseURL: (state) => state.allData.baseURL,
    faq: (state) => state.allData.faq,
  }),
}
</script>

<style lang="scss" scoped></style>
