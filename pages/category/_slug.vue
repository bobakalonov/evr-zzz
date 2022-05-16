<template>
  <div class="category-page">
    <div class="my-container">
      <v-row>
        <v-col cols="12" md="8">
          <div v-if="categoryData.succsess" class="main-news">
            <div v-if="check_news_one" class="main-news__head">
              <img :src="`${baseURL}${categoryData.data.news_one.image}`" />
              <div class="details">
                <p>{{ categoryData.data.news_one.category_id }}</p>
                <nuxt-link
                  :to="localePath(`/news/${categoryData.data.news_one.slug}`)"
                >
                  {{ categoryData.data.news_one.title }}
                </nuxt-link>
              </div>
            </div>
            <div v-if="check_news_list" class="main-news__body">
              <v-row>
                <v-col
                  v-for="(mni, index) in pagiItems"
                  :key="index"
                  cols="12"
                  sm="6"
                >
                  <div class="main-news-card mb-2 mb-md-0">
                    <div class="main-news-card__img">
                      <img :src="`${baseURL}${mni.image}`" :alt="mni.title" />
                    </div>
                    <div class="main-news-card__details">
                      <nuxt-link
                        :to="`/news/${mni.slug}`"
                        class="main-news-card__details--category"
                        >{{ mni.category_id }}</nuxt-link
                      >
                      <nuxt-link
                        v-snip="{ lines: 2 }"
                        :to="`/news/${mni.slug}`"
                        class="main-news-card__details--title"
                      >
                        {{ mni.title }}
                      </nuxt-link>
                      <div class="main-news-card__details--options">
                        <nuxt-link :to="`/news/${mni.slug}`">
                          Barchasi
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
              <v-btn
                class="ma-2 my-4"
                color="secondary"
                @click.prevent="updateCategoryData"
              >
                <span class="text--primary text--black">
                  {{ $t('loadMore') }}
                </span>
              </v-btn>
            </div>
          </div>
          <div v-else class="not-found">
            <not-found-data />
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div v-if="categoryData.succsess" class="sidebar-news">
            <div v-if="check_news_audio_news" class="audio">
              <h2 class="sidebar-news__title">Ovozli xabar</h2>
              <div class="card-news-audio">
                <div class="details">
                  <p class="details__category">
                    {{ categoryData.data.audio_news.category_id }}
                  </p>
                  <nuxt-link
                    :to="`/news/${categoryData.data.audio_news.slug}`"
                    class="details__title"
                    >{{ categoryData.data.audio_news.title }}</nuxt-link
                  >
                  <div class="details__options">
                    <p class="date">
                      <v-icon small>mdi-calendar-blank-outline </v-icon>
                      <span>{{ categoryData.data.audio_news.date }}</span>
                    </p>
                    <p class="views">
                      <v-icon small>mdi-eye-outline</v-icon>
                      <span>{{ categoryData.data.audio_news.count_view }}</span>
                    </p>
                  </div>
                </div>
                <vue-plyr>
                  <audio>
                    <source
                      :src="`${baseURL}${categoryData.data.audio_news.audio}`"
                      type="audio/mp3"
                    />
                  </audio>
                </vue-plyr>
              </div>
            </div>
            <div v-if="check_news_read_more" class="more">
              <h2 class="sidebar-news__title">Eng ko’p o’qilganlar</h2>
              <div
                v-for="(lni, index) in categoryData.data.read_more"
                :key="index"
                class="news-card mb-2 mb-md-0"
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
                    :to="`/news/${lni.slug}`"
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
          <div v-else class="not-found">
            <not-found-data />
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import NotFoundData from '~/components/NotFoundData.vue'

export default {
  name: 'CategoryPage',
  components: { NotFoundData },
  data() {
    return {
      page: 1,
      categoryData: [],
      pagiItems: [],
    }
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('allData/fetchSettings')
      await store.dispatch('allData/fetchMenuItems')
      await store.dispatch('allData/fetchSocialItems')
    } catch (e) {
      error({
        statusCode: e.statusCode,
        message: e.message,
      })
    }
  },
  head() {
    return {
      title: `Evr.uz - this.categoryData.data.category`,
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
    baseURL: (state) => state.allData.baseURL,
    categoryData: (state) => state.allData.categoryData,

    check_news_one() {
      if (this.categoryData.data.news_one !== null) {
        return true
      } else {
        return false
      }
    },
    check_news_list() {
      if (this.categoryData.data.news_list !== null) {
        return true
      } else {
        return false
      }
    },
    check_news_audio_news() {
      if (this.categoryData.data.audio_news !== null) {
        return true
      } else {
        return false
      }
    },
    check_news_read_more() {
      if (this.categoryData.data.read_more !== null) {
        return true
      } else {
        return false
      }
    },
  }),
  mounted() {
    this.getCategoryData()
  },
  methods: {
    async getCategoryData() {
      await axios
        .post(
          `http://evr.bjst.uz/api/category/category?id=14&page=${this.page}`,
          {
            headers: {
              'Accept-Language': this.$i18n.locale,
            },
            slug: this.$route.params.slug,
          }
        )
        .then((resp) => {
          this.categoryData = resp.data
          this.pagiItems.push(...resp.data.data.news_list)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async updateCategoryData() {
      this.page++
      await axios
        .post(
          `http://evr.bjst.uz/api/category/category?id=14&page=${this.page}`,
          {
            headers: {
              'Accept-Language': this.$i18n.locale,
            },
            slug: 'jamiyat',
          }
        )
        .then((resp) => {
          this.categoryData = resp.data
          this.pagiItems.push(...resp.data.data.news_list)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
