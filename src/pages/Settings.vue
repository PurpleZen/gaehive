<template>
  <div class="page">
    <div class="container">
      <div id="text" class="queue">
        <button class='sidebutton' @click="changeTheme('dark')" v-if="this.theme !== 'dark' && this.theme !== '2000s-blog' && !this.secret">theme</button>
    <button class='sidebutton' @click="changeTheme('light')" v-if="this.theme == 'dark' && !this.secret || this.theme == '2000s-blog'">theme</button>
    <button class='sidebutton' @click="changeTheme('2000s-blog')" v-if="this.secret && this.theme !== '2000s-blog'">reset internet to 2004</button>
    <input type="color" @input="color()" value="#365a35" id="color">
    <input type="color" @input="color()" value="#fafafa" id="buttoncolor">
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
      },
      color() {
       document.querySelector(":root").style.setProperty("--acc", document.getElementById("color").value)
        document.querySelector(":root").style.setProperty("--btxt", document.getElementById("buttoncolor").value)
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