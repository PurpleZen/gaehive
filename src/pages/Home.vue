<template>
  <div class="page">
  <div class="container">
  <div id="text" class="queue">
    <h1 class="greeting">The Gaehive Website</h1>
    <h3>Welome to the official Gaehive website! This website was built by <a href="https://scratch.mit.edu/users/LegoManiac04/">LegoManiac04</a> for the Scratch Studio known as the Gaehive. Here, you can find useful links, as well as some useful and fun tools, like the host queue, and our news bulletin!</h3>
  </div>
  </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        loaded: null
      }
    },
    mounted() {

      this.loaded = true
      
    }
  }
</script>