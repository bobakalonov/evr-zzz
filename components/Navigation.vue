<template>
  <div class="navigation">
    <div class="top-nav d-none d-md-block">
      <div class="my-container">
        <div class="top-nav__infos">
          <v-menu transition="slide-y-reverse-transition">
            <template #activator="{ on, attrs }">
              <v-btn color="primary" class="ma-2" v-bind="attrs" v-on="on">
                <v-icon small left>mdi-weather-cloudy</v-icon>
                <span class="text-capitalize">
                  {{ weather }}
                </span>
                <v-icon right small>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(state, i) in states" :key="i" link>
                <v-list-item-title
                  class="text-center"
                  @click.prevent="changeWeatherState(state.code)"
                  v-text="state.name"
                ></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <div class="currency">
            <span class="currency__title text--disabled">
              {{ $t('curr') }} UZB:</span
            >
            <div class="currency__items">
              <div
                v-for="(item, i) in currency"
                :key="i"
                class="item text--black"
              >
                {{ item.code }}: {{ item.cb_price }}
              </div>
            </div>
          </div>
        </div>
        <div class="top-nav__options">
          <div class="top-nav__options--links">
            <nuxt-link :to="localePath('/about')">{{ $t('about') }}</nuxt-link>
            <nuxt-link :to="localePath('/contact')">{{
              $t('contact')
            }}</nuxt-link>
            <nuxt-link :to="localePath('/terms-of-adv-page')"
              >{{ $t('terms') }}
            </nuxt-link>
          </div>
          <v-menu transition="slide-y-reverse-transition">
            <template #activator="{ on, attrs }">
              <v-btn
                class="lang ma-2"
                color="secondary"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon small left color="#000">mdi-earth</v-icon>
                <span class="text--primary text--black">
                  {{ $t('lang') }}
                </span>
                <v-icon right small color="#000">mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <nuxt-link :to="switchLocalePath('uz')">O'zbek</nuxt-link>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <nuxt-link :to="switchLocalePath('ru')">Русский</nuxt-link>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>
    <div class="main-nav">
      <div class="my-container">
        <div class="wrapper">
          <v-app-bar-nav-icon
            class="d-flex d-md-none"
            @click="drawer = true"
          ></v-app-bar-nav-icon>
          <v-spacer class="d-block d-md-none"></v-spacer>
          <nuxt-link to="/" class="logo">
            <img :src="`${baseURL}${settings.data.logo}`" alt="logo image" />
          </nuxt-link>
          <div class="main-nav__links d-none d-md-flex">
            <nuxt-link
              v-for="menuItem in menuItems.data"
              :key="menuItem.id"
              :to="localePath(`/category/${menuItem.slug}`)"
              >{{ menuItem.title }}</nuxt-link
            >
          </div>
          <v-spacer></v-spacer>
          <div class="search">
            <button @click="dialog = !dialog">
              <img src="~/static/img/svg/search.svg" />
            </button>
            <v-dialog v-model="dialog" scrollable max-width="500px">
              <v-card class="py-5">
                <v-card-text>
                  <v-text-field
                    v-model="searchValue"
                    :label="$t('search')"
                    @keyup.enter="changeSearchValue(searchValue)"
                  ></v-text-field>
                </v-card-text>
                <div class="search-results" @click="dialog = !dialog">
                  <div class="search-results__items">
                    <p v-if="searchResult.length === 0">
                      empty {{ searchResult.length }}
                    </p>
                    <nuxt-link
                      v-for="(sItem, i) in searchResult.data"
                      :key="i"
                      class="item"
                      :to="localePath(`/news/${sItem.slug}`)"
                    >
                      {{ sItem.title }}
                    </nuxt-link>
                  </div>
                </div>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </div>
    </div>
    <div
      class="mobile-nav-options my-container d-flex d-md-none flex-column flex-sm-row .justify-space-between w-100"
    >
      <div class="currency">
        <div class="currency__items">
          <div v-for="(item, i) in currency" :key="i" class="item text--black">
            {{ item.code }}: {{ item.cb_price }}
          </div>
        </div>
      </div>
      <v-menu transition="slide-y-reverse-transition">
        <template #activator="{ on, attrs }">
          <v-btn color="primary" class="ma-2" v-bind="attrs" v-on="on">
            <v-icon small left>mdi-weather-cloudy</v-icon>
            {{ weather }}
            <v-icon right small>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(state, i) in states" :key="i" link>
            <v-list-item-title
              class="text-center"
              @click.prevent="changeWeatherState(state.code)"
              v-text="state.name"
            ></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-menu transition="slide-y-reverse-transition">
        <template #activator="{ on, attrs }">
          <v-btn class="lang ma-2" color="secondary" v-bind="attrs" v-on="on">
            <v-icon small left color="#000">mdi-earth</v-icon>
            <span class="text--primary text--black">
              {{ $t('lang') }}
            </span>
            <v-icon right small color="#000">mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <nuxt-link :to="switchLocalePath('uz')">O'zbek</nuxt-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <nuxt-link :to="switchLocalePath('ru')">Русский</nuxt-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item v-for="menuItem in menuItems.data" :key="menuItem.id">
            <nuxt-link :to="localePath(`/category/${menuItem.slug}`)">{{
              menuItem.title
            }}</nuxt-link>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-list>
        <v-list-item>
          <nuxt-link :to="localePath('/about')" class="text--disabled">{{
            $t('about')
          }}</nuxt-link>
        </v-list-item>
        <v-list-item>
          <nuxt-link :to="localePath('/contact')" class="text--disabled">{{
            $t('contact')
          }}</nuxt-link>
        </v-list-item>
        <v-list-item>
          <nuxt-link
            :to="localePath('/terms-of-adv-page')"
            class="text--disabled"
            >{{ $t('terms') }}
          </nuxt-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  data() {
    return {
      loading: false,
      dialog: false,
      searchValue: null,
      drawer: false,
      searchResult: [],
      page: 1,
      currency: [],

      weather: null,
      states: [
        {
          name: 'Farg’ona',
          code: 'fergana',
        },
        {
          name: 'Andijon',
          code: 'andijon',
        },
        {
          name: 'Namangan',
          code: 'Namangan',
        },
        {
          name: 'Toshkent',
          code: 'Tashkent',
        },
        {
          name: 'Qoraqalpog’iston',
          code: 'Nukus',
        },
        {
          name: 'Samarqand',
          code: 'Samarqand',
        },
        {
          name: 'Xorazm',
          code: 'Xorazm',
        },
        {
          name: 'Buxoro',
          code: 'Buxoro',
        },
        {
          name: 'Navoiy',
          code: 'Navoiy',
        },
        {
          name: 'Qashqadaryo',
          code: 'Qashqadaryo',
        },
        {
          name: 'Jizzax',
          code: 'Jizzax',
        },
        {
          name: 'Sirdaryo',
          code: 'Sirdaryo',
        },
      ],
    }
  },
  computed: mapState({
    url() {
      return 'http://evr.bjst.uz/api/news/search?search=' + this.searchValue
    },

    menuItems: (state) => state.allData.menuItems,
    settings: (state) => state.allData.settings,
    baseURL: (state) => state.allData.baseURL,
    lang: (state) => state.allData.lang,
  }),
  mounted() {
    this.getCurrency()
    this.getSearch()
    this.getWeather()
  },

  methods: {
    async getCurrency() {
      await axios
        .get('https://nbu.uz/exchange-rates/json')
        .then((resp) => {
          const filteredCurrency = resp.data.filter((element) => {
            return (
              element.code === 'USD' ||
              element.code === 'EUR' ||
              element.code === 'RUB'
            )
          })
          this.currency = filteredCurrency
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async getWeather() {
      await axios
        .get(
          'http://api.weatherapi.com/v1/current.json?key=1f52a0a6619d4479a83122537220705&q=Tashkent'
        )
        .then((resp) => {
          if (resp.data) {
            this.weather = `+${resp.data.current.temp_c} ${resp.data.location.name}`
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async changeWeatherState(code) {
      await axios
        .get(
          'http://api.weatherapi.com/v1/current.json?key=1f52a0a6619d4479a83122537220705&q=' +
            code
        )
        .then((resp) => {
          if (resp.data) {
            this.weather = `+${resp.data.current.temp_c} ${resp.data.location.name}`
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async getSearch() {
      await axios
        .post('http://evr.bjst.uz/api/news/search', {
          search: null,
        })
        .then((resp) => {
          this.searchResult = resp.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async changeSearchValue(val) {
      await axios
        .post('http://evr.bjst.uz/api/news/search', {
          search: val,
        })
        .then((resp) => {
          this.searchResult = resp.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style lang="scss">
.search-results {
  padding: 20px;
  width: 100%;
  &__items {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
    .item {
      display: block;
      font-size: 16px;
      line-height: 20px;
      font-weight: 500;
      color: #000;
      &:hover {
        color: #00278c;
      }
    }
  }
}
</style>
