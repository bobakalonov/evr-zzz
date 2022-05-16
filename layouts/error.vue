<template>
  <div class="page-not-found">
    <div class="my-container">
      <p>
        {{ error }}
      </p>
      <NuxtLink to="/"> Home page </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="scss">
.page-not-found {
  padding: 100px 0;
  width: 100%;
  .my-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
  }
  h1 {
    font-size: 50px;
  }
  a {
    font-size: 30px;
  }
}
</style>
