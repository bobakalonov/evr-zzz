<template>
  <div class="news-details">
    {{ visitor }}
    <div class="my-container">
      <v-row>
        <v-col md="8">
          <div class="news-details__main">
            <div class="news-details__main--top">
              <div class="options">
                <p class="date">
                  <v-icon small>mdi-calendar-blank-outline</v-icon>
                  <span>{{ details.news_detail.date }}</span>
                </p>
                <p class="views">
                  <v-icon small>mdi-eye-outline</v-icon>
                  <span>{{ details.news_detail.count_view }}</span>
                </p>
              </div>
              <div class="share">
                <span class="share-title">Ulashing</span>
                <a
                  :href="`https://telegram.me/share/url?url=${baseURL}/news/${details.news_detail.slug}`"
                  target="_blank"
                  class="social-link"
                >
                  <img src="~/static/img/svg/Telegram.svg" />
                </a>
                <a
                  :href="`https://www.facebook.com/sharer/sharer.php?u=${baseURL}/news/${details.news_detail.slug}`"
                  target="_blank"
                  class="social-link"
                >
                  <img src="~/static/img/svg/Facebook.svg" />
                </a>
                <a
                  :href="`https://www.instagram.com/sharer.php?u=${baseURL}/news/${details.news_detail.slug}`"
                  target="_blank"
                  class="social-link"
                >
                  <img src="~/static/img/svg/Instagram.svg" />
                </a>
              </div>
            </div>
            <div class="news-details__main--img">
              <img :src="`${baseURL}${details.news_detail.image}`" alt="" />
            </div>
            <div
              class="news-details__main--content"
              v-html="details.news_detail.content"
            ></div>
            <div class="news-details__main--bottom">
              <h3>{{ $t('tags') }}</h3>
              <ul class="tags">
                <li v-for="(item, i) in details.news_detail.tag" :key="i">
                  <nuxt-link :to="localePath(`/tag/${item}`)">{{
                    item
                  }}</nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </v-col>
        <v-col md="4">
          <div class="news-details__sidebar">
            <div class="news-details__sidebar--group">
              <h3 class="main-title">So’ngi yangiliklar</h3>
              <div class="main-items">
                <div
                  v-for="(lni, index) in latestNews"
                  :key="index"
                  class="news-card"
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
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

export default {
  name: 'NewsPage',
  components: {},
  data() {
    return {
      visitor: '',
    }
  },

  async fetch({ store, error, params }) {
    try {
      await store.dispatch('allData/fetchSettings')
      await store.dispatch('allData/fetchMenuItems')
      await store.dispatch('allData/fetchSocialItems')

      await store.dispatch('allData/fetchLatestNews')
      await store.dispatch('allData/fetchNewsData', params.slug, this.visitor)
    } catch (e) {
      error({
        statusCode: e.statusCode,
        message: e.message,
      })
    }
  },

  head() {
    return {
      title: `Evr.uz - ${this.details.news_detail.title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Evr.uz - Bosh Sahifa | O'zbekistinda birinchi raqamli Yangiliklar sayti | ${this.details.news_detail.title}`,
        },
      ],
    }
  },

  computed: mapState({
    details() {
      return this.newsData.data
    },
    newsData: (state) => state.allData.newsData,
    latestNews: (state) => state.allData.latestNews.data.last_news,
    baseURL: (state) => state.allData.baseURL,
    socialItems: (state) => state.allData.socialItems,
  }),
  mounted() {
    // eslint-disable-next-line import/no-named-as-default-member
    const fpPromise = FingerprintJS.load({
      apiKey: 'FBCdNtsJJc6hkrHekrbS',
    })
    fpPromise
      .then((fp) => fp.get())
      .then((result) => {
        this.visitor = result.visitorId
      })
  },

  methods: {},
}
</script>
