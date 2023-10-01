<template>
  <div class="page">
    <div class="container">
      <div id="text" class="queue">
        <button class='sidebutton' @click="changeTheme('dark')" v-if="this.theme !== 'dark' && this.theme !== '2000s-blog' && !this.secret">theme</button>
    <button class='sidebutton' @click="changeTheme('light')" v-if="this.theme == 'dark' && !this.secret || this.theme == '2000s-blog'">theme</button>
    <button class='sidebutton' @click="changeTheme('2000s-blog')" v-if="this.secret && this.theme !== '2000s-blog'">reset internet to 2004</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { useMeta } from 'vue-meta'
  export default {
    created() {
    useMeta({
      title: 'Gaehive | Settings'
    })
  },
    
    methods: {
      changeTheme(theme) {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute('data-theme', localStorage["theme"]);
        this.theme = localStorage["theme"];
      }
    },

    async mounted() {
      this.theme = localStorage["theme"];
      
    },
    
    data() {
  	  return {
        theme: null,
  	  }
    }
  }
</script>