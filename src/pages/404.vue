<template>
  <h1>404</h1>
  <router-link to="/">Home</router-link>
</template>

<script>
  import { useMeta } from 'vue-meta'
  export default {
    created() {
      useMeta({
        title: 'Gaehive | 404'
      });
    }
  }
</script>