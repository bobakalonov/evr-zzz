<template>
  <div class="tag-page">
    <div class="my-container">
      <h2 class="main-title">{{ $route.params.tag.toUpperCase() }}</h2>
      <v-row>
        <v-col v-for="(item, i) in details" :key="i" cols="12" sm="6" md="4">
          <div class="main-news-card mb-3 mb-md-0">
            <div class="main-news-card__img">
              <img :src="`${baseURL}${item.image}`" :alt="item.title" />
            </div>
            <div class="main-news-card__details">
              <nuxt-link
                :to="localePath(`/news/${item.slug}`)"
                class="main-news-card__details--category"
                >{{ item.category_id }}</nuxt-link
              >
              <nuxt-link
                v-snip="{ lines: 2 }"
                :to="localePath(`/news/${item.slug}`)"
                class="main-news-card__details--title"
              >
                {{ item.title }}
              </nuxt-link>
              <div class="main-news-card__details--options">
                <nuxt-link :to="localePath(`/news/${item.slug}`)">
                  {{ $t('more') }}
                  <v-icon color="indigo">mdi-arrow-right-thin</v-icon>
                </nuxt-link>
                <div class="wrapper">
                  <div>
                    <v-icon small>mdi-calendar-blank-outline </v-icon>
                    {{ item.date }}
                  </div>
                  <div>
                    <v-icon small>mdi-eye-outline</v-icon>
                    {{ item.count_view }}
                  </div>
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
  name: 'TagPage',
  components: {},
  data() {
    return {}
  },

  async fetch({ store, error, params }) {
    try {
      await store.dispatch('allData/fetchSettings')
      await store.dispatch('allData/fetchMenuItems')
      await store.dispatch('allData/fetchSocialItems')

      await store.dispatch('allData/fetchLatestNews')
      await store.dispatch('allData/fetchTagNewsData', params.tag)
    } catch (e) {
      error({
        statusCode: e.statusCode,
        message: e.message,
      })
    }
  },

  head() {
    return {
      title: `Evr.uz - ${this.$route.params.tag}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Evr.uz - Bosh Sahifa | O'zbekistinda birinchi raqamli Yangiliklar sayti | ${this.$route.params.tag}`,
        },
      ],
    }
  },

  computed: mapState({
    details() {
      return this.tagNewsData.data
    },
    tagNewsData: (state) => state.allData.tagNewsData,
    latestNews: (state) => state.allData.latestNews.data.last_news,
    baseURL: (state) => state.allData.baseURL,
    socialItems: (state) => state.allData.socialItems,
    currency: (state) => state.allData.currency,

    usd() {
      return this.currency.find((elem) => elem.code === 'USD')
    },
    eur() {
      return this.currency.find((elem) => elem.code === 'EUR')
    },
    rub() {
      return this.currency.find((elem) => elem.code === 'RUB')
    },
  }),
  mounted() {},

  methods: {},
}
</script>
