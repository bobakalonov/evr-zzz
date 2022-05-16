<template>
  <div v-if="loading" class="loading-page">
    <img :src="`${baseURL}${settings.data.logo}`" />
    <div class="gooey">
      <span class="dot"></span>
      <div class="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    loading: true,
  }),
  async fetch({ store, error }) {
    try {
      await store.dispatch('allData/fetchSettings')
    } catch (e) {
      error({
        statusCode: e.statusCode,
        message: e.message,
      })
    }
  },
  computed: mapState({
    settings: (state) => state.allData.settings,
    baseURL: (state) => state.allData.baseURL,
  }),
  mounted() {
    this.finish()
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>

<style lang="scss">
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($color: #fff, $alpha: 0.95);
  z-index: 111;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60px);
    height: 30px;
  }
  .gooey {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 142px;
    height: 40px;
    margin: -20px 0 0 -71px;
    background: rgba($color: #fff, $alpha: 0.75);
    filter: contrast(20);
    border-radius: 12px;
    .dot {
      position: absolute;
      width: 16px;
      height: 16px;
      top: 12px;
      left: 15px;
      filter: blur(4px);
      background: #000;
      border-radius: 50%;
      transform: translateX(0);
      animation: dot 2s infinite;
    }
    .dots {
      transform: translateX(0);
      margin-top: 12px;
      margin-left: 31px;
      animation: dots 2s infinite;
      span {
        display: block;
        float: left;
        width: 16px;
        height: 16px;
        margin-left: 16px;
        filter: blur(4px);
        background: #000;
        border-radius: 50%;
      }
    }
  }

  @keyframes dot {
    50% {
      transform: translateX(96px);
    }
  }

  @keyframes dots {
    50% {
      transform: translateX(-31px);
    }
  }
}
</style>
