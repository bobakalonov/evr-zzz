<template>
  <div class="contact-page">
    <v-dialog v-model="complete" width="500">
      <v-card>
        <v-card-text
          class="d-flex flex-column justify-center align-center text-center pa-5"
        >
          <v-icon
            v-if="formRes.success"
            x-large
            left
            color="#1B5E20"
            class="mb-4"
            >mdi-check</v-icon
          >
          <v-icon v-else x-large left color="#E65100" class="mb-4"
            >mdi-exclamation</v-icon
          >
          <P class="text-body-2">{{ formRes.message }}</P>
          <div v-if="formRes.success" class="succsess"></div>
          <div v-else class="errors">
            <h4
              v-for="(err, i) in formRes.errors"
              :key="i"
              class="orange--text"
            >
              {{ err }}
            </h4>
          </div>
          <v-btn color="primary" text class="mt-4" @click.prevent="resetForm">
            Ok
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <div class="my-container">
      <v-row>
        <v-col cols="12" md="8">
          <div class="contact-page__infos mb-4 mb-md-0">
            <v-row>
              <v-col cols="12" sm="5">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <h2 class="contact-page-title">Biz bilan aloqa</h2>
                  <div class="form-input-group">
                    <v-text-field
                      v-model="fish"
                      :counter="50"
                      :rules="nameRules"
                      :label="$t('formName')"
                      required
                    ></v-text-field>
                  </div>
                  <div class="form-input-group">
                    <v-text-field
                      v-model="phone"
                      v-mask="'+998#########'"
                      :counter="15"
                      :rules="phoneRules"
                      :label="$t('formPhone')"
                      required
                    ></v-text-field>
                  </div>
                  <div class="form-input-group">
                    <v-textarea
                      v-model="text"
                      solo
                      name="input-10-4"
                      :label="$t('formText')"
                      :rules="[(v) => !!v || $t('formTextRequired')]"
                      required
                    ></v-textarea>
                  </div>
                  <button class="send-btn" @click.prevent="submitForm">
                    Yuborish
                  </button>
                </v-form>
              </v-col>
              <v-col cols="12" sm="7">
                <div class="contact-form-img">
                  <img :src="`${baseURL}${settings.data.settings}`" alt="" />
                </div>
              </v-col>
            </v-row>
          </div>
          <div class="contact-page-infos">
            <iframe
              :src="settings.data.iframe"
              width="600"
              height="450"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            <div class="details">
              <div class="detail">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM7 9C7 6.24 9.24 4 12 4C14.76 4 17 6.24 17 9C17 11.88 14.12 16.19 12 18.88C9.92 16.21 7 11.85 7 9ZM9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C12.8932 6.5 13.7185 6.9765 14.1651 7.75C14.6116 8.5235 14.6116 9.4765 14.1651 10.25C13.7185 11.0235 12.8932 11.5 12 11.5C10.6193 11.5 9.5 10.3807 9.5 9Z"
                    fill="#FBD230"
                  />
                </svg>
                <span>{{ settings.data.address }}</span>
              </div>
              <div class="detail">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.61 14.99 15.86 14.89 16.12 14.89C16.22 14.89 16.33 14.9 16.43 14.94C17.55 15.31 18.76 15.51 20 15.51C20.55 15.51 21 15.96 21 16.51V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3ZM6.54 5C6.6 5.89 6.75 6.76 6.99 7.59L5.79 8.79C5.38 7.59 5.12 6.32 5.03 5H6.54ZM16.4 17.02C17.25 17.26 18.12 17.41 19 17.47V18.96C17.68 18.87 16.41 18.61 15.2 18.21L16.4 17.02Z"
                    fill="#FBD230"
                  />
                </svg>
                <span>{{ settings.data.phone_1 }}</span>
              </div>
              <div class="detail">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.61 14.99 15.86 14.89 16.12 14.89C16.22 14.89 16.33 14.9 16.43 14.94C17.55 15.31 18.76 15.51 20 15.51C20.55 15.51 21 15.96 21 16.51V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3ZM6.54 5C6.6 5.89 6.75 6.76 6.99 7.59L5.79 8.79C5.38 7.59 5.12 6.32 5.03 5H6.54ZM16.4 17.02C17.25 17.26 18.12 17.41 19 17.47V18.96C17.68 18.87 16.41 18.61 15.2 18.21L16.4 17.02Z"
                    fill="#FBD230"
                  />
                </svg>
                <span>{{ settings.data.phone_2 }}</span>
              </div>
              <div class="detail">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3ZM20 7.238L12.072 14.338L4 7.216V19H20V7.238ZM4.511 5L12.061 11.662L19.502 5H4.511Z"
                    fill="#FBD230"
                  />
                </svg>
                <span>{{ settings.data.email }}</span>
              </div>
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
import axios from 'axios'

export default {
  name: 'ContactPage',
  components: {},
  data() {
    return {
      complete: false,
      formRes: [],

      fish: '',
      phone: '',
      text: '',

      valid: true,
      name: '',
      nameRules: [
        (v) => !!v || this.$t('formNameRequired'),
        (v) =>
          (v && v.length < 50 && v.length >= 3) ||
          this.$t('formNameRequiredOpt'),
      ],
      tel: null,
      phoneRules: [
        (v) => !!v || this.$t('formPhoneRequired'),
        (v) =>
          (v && v.length < 20 && v.length >= 7) ||
          this.$t('formPhoneRequiredOpt'),
      ],
    }
  },
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
      title: 'Evr.uz - Biz Bilan Aloqa',
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
  methods: {
    async submitForm() {
      console.log([this.fish, this.phone, this.text])
      await axios
        .post('http://evr.bjst.uz/api/contact/index', {
          fish: this.fish,
          phone: this.phone,
          text: this.text,
        })
        .then((resp) => {
          this.formRes = resp.data
          this.complete = true
          if (this.formRes.success) {
            this.$refs.form.resetValidation()
            this.fish = ''
            this.phone = ''
            this.text = ''
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    resetForm() {
      this.complete = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
