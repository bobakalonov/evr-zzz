<template>
  <v-main>
    <div class="top-header-news">
      <div class="my-container">
        <v-carousel
          v-if="topNews.success"
          :height="carouselHeight"
          cycle
          :show-arrows="false"
        >
          <v-carousel-item v-for="(tni, i) in topNews.data" :key="i">
            <v-sheet height="100%" tile>
              <div class="slide">
                <img
                  v-if="openVideoPlayer"
                  :src="`${baseURL}${tni.image}`"
                  :alt="tni.title"
                />
                <div v-if="openVideoPlayer" class="slide-details">
                  <button
                    class="open-video-btn"
                    @click.prevent="openVideoPlayer = !openVideoPlayer"
                  ></button>
                  <h2 class="slide-title">
                    {{ tni.title }}
                  </h2>
                </div>
                <youtube v-else video-id="XvOGdEXXLLg"></youtube>
              </div>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
        <div v-else class="not-found">
          <not-found-data />
        </div>
      </div>
    </div>

    <div class="latest-news">
      <div class="my-container rounded-lg">
        <h2 class="section-title">{{ $t('latestNews') }}</h2>
        <v-row v-if="latestNews.success">
          <v-col cols="12" md="4">
            <v-row no-gutters>
              <v-col>
                <div
                  v-for="(lnia, index) in latestNewsItemsAudio"
                  :key="index"
                  class="card-news-audio"
                >
                  <div class="details">
                    <p class="details__category">
                      {{ lnia.category_id }}
                    </p>
                    <nuxt-link
                      :to="localePath(`/news/${lnia.slug}`)"
                      class="details__title"
                      >{{ lnia.title }}</nuxt-link
                    >
                    <div class="details__options">
                      <p class="date">
                        <v-icon small>mdi-calendar-blank-outline </v-icon>
                        <span>{{ lnia.date }}</span>
                      </p>
                      <p class="views">
                        <v-icon small>mdi-eye-outline</v-icon>
                        <span>{{ lnia.count_view }}</span>
                      </p>
                    </div>
                  </div>
                  <vue-plyr>
                    <audio>
                      <source
                        :src="`${baseURL}${lnia.audio}`"
                        type="audio/mp3"
                      />
                    </audio>
                  </vue-plyr>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="8">
            <v-row>
              <v-col
                v-for="(lni, index) in latestNewsItems"
                :key="index"
                sm="6"
                cols="12"
              >
                <div class="news-card">
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
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <div v-else class="not-found">
          <not-found-data />
        </div>
      </div>
    </div>

    <div class="group-news">
      <div class="my-container rounded-lg">
        <div v-if="menuItems.success" class="group-news__top">
          <v-row
            v-for="menuItem in menuItems.data.slice(0, 1)"
            :key="menuItem.id"
          >
            <v-col class="d-flex align-center">
              <h2 class="section-title">{{ menuItem.title }}</h2>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="d-flex justify-end align-center">
              <nuxt-link :to="localePath(`/category/${menuItem.slug}`)">
                {{ $t('allNews') }}
                <v-icon color="indigo">mdi-arrow-right-thin</v-icon>
              </nuxt-link>
            </v-col>
          </v-row>
        </div>
        <div v-else class="not-found">
          <not-found-data />
        </div>
        <div v-if="groupNews.success" class="group-news__main">
          <v-row>
            <v-col
              v-for="(mni, index) in groupNews.data.slice(0, 6)"
              :key="index"
              cols="12"
              md="4"
            >
              <div class="main-news-card">
                <div class="main-news-card__img">
                  <img
                    :height="mainCardHeight"
                    :src="`${baseURL}${mni.image}`"
                    :alt="mni.title"
                  />
                </div>
                <div class="main-news-card__details">
                  <nuxt-link
                    :to="localePath(`/news/${mni.slug}`)"
                    class="main-news-card__details--category"
                    >{{ mni.category_id }}</nuxt-link
                  >
                  <nuxt-link
                    v-snip="{ lines: 2 }"
                    :to="localePath(`/news/${mni.slug}`)"
                    class="main-news-card__details--title"
                  >
                    {{ mni.title }}
                  </nuxt-link>
                  <div class="main-news-card__details--options">
                    <nuxt-link :to="localePath(`/news/${mni.slug}`)">
                      {{ $t('more') }}
                      <v-icon color="indigo">mdi-arrow-right-thin</v-icon>
                    </nuxt-link>
                    <div class="wrapper">
                      <div>
                        <v-icon small>mdi-calendar-blank-outline </v-icon>
                        {{ mni.date }}
                      </div>
                      <div>
                        <v-icon small>mdi-eye-outline</v-icon>
                        {{ mni.count_view }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
        <div v-else class="not-found">
          <not-found-data />
        </div>
      </div>
    </div>

    <div class="advertising">
      <div class="my-container">
        <v-carousel
          v-if="ads.success"
          height="410"
          cycle
          hide-delimiters
          show-arrows-on-hover
        >
          <v-carousel-item v-for="(ad, i) in ads.data" :key="i">
            <a :href="ad.url" target="blank">
              <v-sheet height="100%" tile>
                <div class="slide">
                  <img :src="`${baseURL}${ad.image}`" :alt="ad.id" />
                </div>
              </v-sheet>
            </a>
          </v-carousel-item>
        </v-carousel>
        <div v-else class="not-found">
          <not-found-data />
        </div>
      </div>
    </div>

    <div class="special-news">
      <div class="my-container">
        <h2 class="section-title">{{ $t('forYou') }}</h2>
        <v-row v-if="specialNews.success">
          <v-col cols="12" md="4" class="mb-5">
            <v-row>
              <v-col
                v-for="(snl, index) in read_more_one.slice(0, 3)"
                :key="index"
              >
                <div class="news-card">
                  <div class="img">
                    <img :src="`${baseURL}${snl.image}`" :alt="snl.title" />
                  </div>
                  <div class="details">
                    <p class="details__category">
                      {{ snl.category_id }}
                    </p>
                    <nuxt-link
                      v-snip="{ lines: 3 }"
                      :to="localePath(`/news/${snl.slug}`)"
                      class="details__title"
                    >
                      {{ snl.title }}
                    </nuxt-link>
                    <div class="details__options">
                      <p class="date">
                        <v-icon small>mdi-calendar-blank-outline </v-icon>
                        <span>{{ snl.date }}</span>
                      </p>
                      <p class="views">
                        <v-icon small>mdi-eye-outline</v-icon>
                        <span>{{ snl.count_view }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="8">
            <v-row>
              <v-col
                v-for="(snr, index) in read_more_one.slice(0, 2)"
                :key="index"
                sm="6"
                cols="12"
              >
                <div class="main-news-card">
                  <div class="main-news-card__img">
                    <img :src="`${baseURL}${snr.image}`" :alt="snr.title" />
                  </div>
                  <div class="main-news-card__details">
                    <nuxt-link
                      :to="localePath(`/news/${snr.slug}`)"
                      class="main-news-card__details--category"
                      >{{ snr.category_id }}</nuxt-link
                    >
                    <nuxt-link
                      v-snip="{ lines: 2 }"
                      :to="localePath(`/news/${snr.slug}`)"
                      class="main-news-card__details--title"
                    >
                      {{ snr.title }}
                    </nuxt-link>
                    <div class="main-news-card__details--options">
                      <nuxt-link :to="localePath(`/news/${snr.slug}`)">
                        {{ $t('more') }}
                        <v-icon color="indigo">mdi-arrow-right-thin</v-icon>
                      </nuxt-link>
                      <div class="wrapper">
                        <div>
                          <v-icon small>mdi-calendar-blank-outline </v-icon>
                          {{ snr.date }}
                        </div>
                        <div>
                          <v-icon small>mdi-eye-outline</v-icon>
                          {{ snr.count_view }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <div v-else class="not-found">
          <not-found-data />
        </div>
      </div>
    </div>

    <div class="interviews">
      <div class="my-container">
        <div class="interviews__top">
          <v-row>
            <v-col class="d-flex align-center">
              <h2 class="section-title">{{ $t('interviews') }}</h2>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="d-flex justify-end align-center">
              <nuxt-link :to="localePath(`/category/intervyu`)">
                {{ $t('allNews') }}
                <v-icon color="indigo">mdi-arrow-right-thin</v-icon>
              </nuxt-link>
            </v-col>
          </v-row>
        </div>
        <div v-if="interviews.success" class="interviews__main">
          <div
            v-for="(mi, index) in interviewsHead"
            :key="index"
            class="interviews__main"
          >
            <youtube video-id="XvOGdEXXLLg"></youtube>
          </div>
          <div class="interviews__others">
            <v-row>
              <v-col
                v-for="(oi, index) in interviewsMain"
                :key="index"
                sm="4"
                cols="12"
              >
                <div class="main-news-card">
                  <div class="main-news-card__img">
                    <img :src="`${baseURL}${oi.image}`" :alt="oi.title" />
                  </div>
                  <div class="main-news-card__details">
                    <nuxt-link
                      :to="localePath(`/news/${oi.slug}`)"
                      class="main-news-card__details--category"
                      >{{ oi.category_id }}</nuxt-link
                    >
                    <nuxt-link
                      v-snip="{ lines: 2 }"
                      :to="localePath(`/news/${oi.slug}`)"
                      class="main-news-card__details--title"
                    >
                      {{ oi.title }}
                    </nuxt-link>
                    <div class="main-news-card__details--options">
                      <nuxt-link :to="localePath(`/news/${oi.slug}`)">
                        {{ $t('allNews') }}
                        <v-icon color="indigo">mdi-arrow-right-thin</v-icon>
                      </nuxt-link>
                      <div class="wrapper">
                        <div>
                          <v-icon small>mdi-calendar-blank-outline </v-icon>
                          {{ oi.date }}
                        </div>
                        <div>
                          <v-icon small>mdi-eye-outline</v-icon>
                          {{ oi.count_view }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
        <div v-else class="not-found">
          <not-found-data />
        </div>
      </div>
    </div>
  </v-main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'IndexPage',
  components: {},

  data() {
    return {
      openVideoPlayer: true,
    }
  },

  async fetch({ store, error }) {
    try {
      await store.dispatch('allData/fetchSettings')
      await store.dispatch('allData/fetchMenuItems')
      await store.dispatch('allData/fetchSocialItems')

      await store.dispatch('allData/fetchTopNews')
      await store.dispatch('allData/fetchLatestNews')
      await store.dispatch('allData/fetchGroupNews')
      await store.dispatch('allData/fetchAds')
      await store.dispatch('allData/fetchSpecialNews')
      await store.dispatch('allData/fetchInterviews')
    } catch (e) {
      error({
        statusCode: e.statusCode,
        message: e.message,
      })
    }
  },

  head() {
    return {
      title: 'Evr.uz - Bosh Sahifa',
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
    carouselHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 230
        case 'sm':
          return 380
        case 'md':
          return 500
        case 'lg':
          return 600
        case 'xl':
          return 680
      }
    },
    mainCardHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 220
        case 'sm':
          return 240
        case 'md':
          return 400
        case 'lg':
          return 270
        case 'xl':
          return 300
      }
    },

    latestNews: (state) => state.allData.latestNews,
    topNews: (state) => state.allData.topNews,
    groupNews: (state) => state.allData.groupNews,
    ads: (state) => state.allData.ads,
    specialNews: (state) => state.allData.specialNews,
    interviews: (state) => state.allData.interviews,
    menuItems: (state) => state.allData.menuItems,
    baseURL: (state) => state.allData.baseURL,

    latestNewsItems() {
      return this.latestNews.data.last_news
    },
    latestNewsItemsAudio() {
      return this.latestNews.data.last_audio_news
    },

    interviewsHead() {
      return this.interviews.data.news_one
    },
    interviewsMain() {
      return this.interviews.data.news_two
    },

    read_more_one() {
      return this.specialNews.data.read_more_one
    },
    read_more_two() {
      return this.specialNews.data.read_more_one
    },

    checkAds() {
      return this.ads.success
    },
  }),
  methods: {},
}
</script>
