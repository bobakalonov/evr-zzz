import Services from "~/services/Services";


export const state = () => ({
   baseURL: 'http://evr.bjst.uz',
   latestNews: [],
   newsItem: [],
   topNews: [],
   menuItems: [],
   socialItems: [],
   groupNews: [],
   ads: [],
   specialNews: [],
   interviews: [],
   settings: [],
   aboutData: [],
   faq: [],
   terms: [],
   newsData: [],
   newsDataById: [],
   tagNewsData: []
});

export const mutations = {
   setSettings(state, payload) {
      state.settings = payload
   },
   setLatestNews(state, payload) {
      state.latestNews = payload
   },
   setTopNews(state, payload) {
      state.topNews = payload
   },
   setMenuItems(state, payload) {
      state.menuItems = payload
   },
   setSocialItems(state, payload) {
      state.socialItems = payload
   },
   setGroupNews(state, payload) {
      state.groupNews = payload
   },
   setAds(state, payload) {
      state.ads = payload
   },
   setSpecialNews(state, payload) {
      state.specialNews = payload
   },
   setInterviews(state, payload) {
      state.interviews = payload
   },
   setAboutData(state, payload) {
      state.aboutData = payload
   },
   setFaq(state, payload) {
      state.faq = payload
   },
   setTerms(state, payload) {
      state.terms = payload
   },
   setNewsData(state, payload) {
      state.newsData = payload
   },
   setNewsDataById(state, payload) {
      state.newsDataById = payload
   },
   setTagNewsData(state, payload) {
      state.tagNewsData = payload
   },
};

export const actions = {
   async fetchSettings({ commit }) {
      const res = await Services.getSetting(this.$i18n.locale);
      commit('setSettings', res.data);
   },
   async fetchLatestNews({ commit }) {
      const res = await Services.getLatestNews(this.$i18n.locale);
      if (res.data.success) {
         commit('setLatestNews', res.data);
      }
   },
   async fetchTopNews({ commit }) {
      const res = await Services.getTopNews(this.$i18n.locale);
      commit('setTopNews', res.data);
   },
   async fetchMenuItems({ commit }) {
      const res = await Services.getMenuItems(this.$i18n.locale);
      commit('setMenuItems', res.data);
   },
   async fetchSocialItems({ commit }) {
      const response = await Services.getSocialItem(this.$i18n.locale);
      commit('setSocialItems', response.data);
   },
   async fetchGroupNews({ commit }) {
      const response = await Services.getGroupNews(this.$i18n.locale);
      commit('setGroupNews', response.data);
   },
   async fetchAds({ commit }) {
      const response = await Services.getAds(this.$i18n.locale);
      commit('setAds', response.data);
   },
   async fetchSpecialNews({ commit }) {
      const response = await Services.getSpecialNews(this.$i18n.locale);
      commit('setSpecialNews', response.data);
   },
   async fetchInterviews({ commit }) {
      const response = await Services.getInterviews(this.$i18n.locale);
      commit('setInterviews', response.data);
   },
   async fetchAboutData({ commit }) {
      const response = await Services.getAboutData(this.$i18n.locale);
      commit('setAboutData', response.data);
   },
   async fetchFaq({ commit }) {
      const response = await Services.getFaq(this.$i18n.locale);
      commit('setFaq', response.data);
   },
   async fetchNewsDataById({ commit }, id) {
      const response = await Services.getNewsDataById(this.$i18n.locale, id);
      commit('setNewsDataById', response.data);
   },
   async fetchNewsData({ commit }, slug, visitor) {
      const response = await Services.getNewsData(this.$i18n.locale, slug, visitor);
      commit('setNewsData', response.data);
   },
   async fetchTagNewsData({ commit }, tag) {
      const response = await Services.getTagNewsData(this.$i18n.locale, tag);
      commit('setTagNewsData', response.data);
   },
   async fetchTerms({ commit }) {
      const response = await Services.getTerms(this.$i18n.locale);
      commit('setTerms', response.data);
   },
};
