<template>
  <div class="login-model">
    <h2>Hi, {{ username }}</h2>
    <h3>You've successfully logged in! 🎉</h3>
  </div>
</template>

<script>
  export default {
    mounted() {
      if (localStorage['user']) {
        this.username = JSON.parse(localStorage['user']).username
      }
    },
    data() {
      return {
        username: null
      }
    }
  }
  
</script>