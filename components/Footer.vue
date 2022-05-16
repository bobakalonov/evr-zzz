<template>
  <footer>
    <div class="my-container">
      <v-row>
        <v-col cols="12" md="6" class="footer-left mb-md-0 mb-2">
          <nuxt-link :to="localePath('/')" class="logo">
            <img
              :src="`${baseURL}${settings.data.mobile_logo}`"
              alt="logo image"
            />
          </nuxt-link>
          <p class="footer-desc">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took
          </p>
          <div class="line"></div>
        </v-col>
        <v-col
          cols="12"
          md="6"
          class="d-flex flex-column justify-lg-space-between align-end footer-right"
        >
          <div class="footer-social mb-md-0 mb-4">
            <h5 class="footer-social__title">{{ $t('social') }}</h5>
            <div class="footer-social__items">
              <a
                v-for="(social, index) in socialItems.data"
                :key="index"
                :href="social.url"
                class="item"
              >
                <img :src="`${baseURL}${social.image}`" :alt="social.title" />
              </a>
            </div>
          </div>
          <div class="footer-app">
            <h5 class="footer-app__title">{{ $t('downloadApp') }}</h5>
            <div class="footer-app__items">
              <a href="#" class="item">
                <img src="~/static/img/png/app-store.png" alt="app store" />
              </a>
              <a href="#" class="item">
                <img src="~/static/img/png/play-market.png" alt="play market" />
              </a>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Footer',
  computed: mapState({
    socialItems: (state) => state.allData.socialItems,
    settings: (state) => state.allData.settings,
    baseURL: (state) => state.allData.baseURL,
  }),
}
</script>

<style lang="scss" scoped></style>
