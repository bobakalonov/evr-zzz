<template>
  <div class="terms-of-adv-page">
    <div class="my-container">
      <v-row>
        <v-col cols="12" md="8">
          <div class="terms-of-adv-page__infos">
            <h2 class="contact-page-title">Reklama shartlari</h2>
            <v-expansion-panels v-if="terms.success">
              <v-expansion-panel v-for="(ti, i) in terms.data" :key="i">
                <v-expansion-panel-header>
                  {{ ti.title }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  {{ ti.description }}
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <div v-else class="not-found">
              <not-found-data />
            </div>
            <div class="contact-details">
              <div class="contact-details__title">Qo’ng’iroq qiling</div>
              <div class="contact-details__content">
                <img src="~/static/img/svg/ph-dark.svg" />
                <span>{{ settings.data.phone_1 }}</span>
              </div>
              <div class="contact-details__desc">
                Reklama bilan bog’liq istalgan savolingiz bo’lsa biz bilan
                aloqaga chiqing
              </div>
              <img src="~/static/img/png/adv-phone.png" />
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="contact-page__latest">
            <h2 class="contact-page-title">So’ngi yangiliklar</h2>
            <div
              v-for="(lni, index) in latestNewsItems"
              :key="index"
              class="news-card mb-3 mb-md-0"
            >
              <div class="img">
                <img :src="`${baseURL}${lni.image}`" :alt="lni.title" />
              </div>
              <div class="details">
                <p class="details__category">
                  {{ lni.category_id }}
                </p>
                <nuxt-link
                  v-snip="{ lines: 3 }"
                  :to="localePath(`/news/${lni.slug}`)"
                  class="details__title"
                >
                  {{ lni.title }}
                </nuxt-link>
                <div class="details__options">
                  <p class="date">
                    <v-icon small>mdi-calendar-blank-outline </v-icon>
                    <span>{{ lni.date }}</span>
                  </p>
                  <p class="views">
                    <v-icon small>mdi-eye-outline</v-icon>
                    <span>{{ lni.count_view }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TermsOfAdvertisingPage',
  components: {},
  async fetch({ store, error }) {
    try {
      await store.dispatch('allData/fetchSettings')
      await store.dispatch('allData/fetchMenuItems')
      await store.dispatch('allData/fetchSocialItems')

      await store.dispatch('allData/fetchLatestNews')
      await store.dispatch('allData/fetchTerms')
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
      title: 'Evr.uz - Foydalanish shartlari',
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
    latestNews: (state) => state.allData.latestNews,
    baseURL: (state) => state.allData.baseURL,
    settings: (state) => state.allData.settings,
    terms: (state) => state.allData.terms,
    latestNewsItems() {
      return this.latestNews.data.last_news
    },
  }),
}
</script>

<style lang="scss" scoped></style>
