<template>
  <div class="page">
    <div class="queue">
      <img v-if="gif == 1" src="/1404.webp"/>
      <img v-if="gif == 2" src="/2404.webp"/>
      <img v-if="gif == 3" src="/3404.webp"/>
      <span>404 page not found lol</span>
    </div>
  </div>  
</template>

<script>
  export default {
    mounted() {
      this.gif = Math.floor(Math.random() * 3) + 1;
    },
    data() {
      return {
        gif: null
      }
    }
  }
</script>

<style scoped>
  img {
    width: 500px;
  }

  @media screen and (max-width: 800px) {
    img {
      width: 200px;
    }
  }
</style>