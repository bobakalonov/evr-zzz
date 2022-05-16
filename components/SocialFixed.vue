<template>
  <div class="social-fixed">
    <a
      v-for="(socItem, index) in socialItems.data"
      :key="index"
      :href="socItem.url"
      class="social-fixed-link"
    >
      <img :src="`${baseURL}${socItem.image}`" :alt="socItem.title" />
    </a>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SocialFixed',
  computed: mapState({
    socialItems: (state) => state.allData.socialItems,
    baseURL: (state) => state.allData.baseURL,
  }),
}
</script>

<style lang="scss" scoped>
// .social-fixed {
//   width: 500px;
//   height: 200px;
//   border: 1px solid;
// }
</style>
