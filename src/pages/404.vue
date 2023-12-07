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
  background-size: 70%;
  margin: 0px;
  font-family: 'Leckerli One';
  font-size: 150px;
}

.notfound h2 {
  margin: -40px 0 0 0;
}
</style>