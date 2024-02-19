<template>
  <div class="notfound">
    <h1>404</h1>
    <h2 class="greeting">Romance Not Found!</h2>
    Just kidding, we can't find that page. <router-link to="/">Let's get you back home.</router-link>
  </div>
</template>

<script>
  import { useMeta } from 'vue-meta'
  export default {
    created() {
      useMeta({
        title: 'Gaehive • 404'
      });
    }
  }
</script>

<style>
.notfound {
  display: grid;
  align-content: center;
  height: calc(100vh - 20px);
  justify-items: center;
}
  
.notfound h1 {
  background-image: url(/404.png);
  background-clip: text;
  color: transparent !important;
  background-position: center;
  background-size: 100%;
  margin: 0px;
  font-family: serif;
  font-size: 150px;
  filter: drop-shadow(0px 0px 5px #0005);
}

.notfound h2 {
  margin: -40px 0 20px 0;
}
</style>