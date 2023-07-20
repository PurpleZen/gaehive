<template>
  <div class="page" id="page">
  <div id="hostqueue" class="container">
  <div class="queue">
    <div v-if="error"><h3>Error :/</h3></div>
    <div v-if="loading && !error" class="loader"></div>
    <h2 class="greeting">The Hivezine</h2>
  <span v-if=!loading>Hello, welcome to the Hivezine on the Gaehive Website!<br>Here you can find news and announcements about events happening in the Scratch studio, fun spoof posts, and useful guides for here and for in the Scratch studio!</span>

    <!-- This link won't show if you don't have manager or writer permissions -->
    <router-link v-if="username && manager == 'true'" to="/hivezine/new" class="button">New Post</router-link>
    
    <div class="posts">
    <div class="post" v-for="(item, index) in this.posts">
      <div class="title">
        <router-link :to="'/hivezine/post/' + item.id">{{ item.title }}</router-link>
        <div class='username'><span><a :href="'https://scratch.mit.edu/users/' + item.user ">{{ item.user }}</a> on {{ item.date }}</span><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + item.uid + '_500x500.png'">
           </div></div>
      <div class='content' v-html=item.post></div></div>
    </div>
    
  </div>
  </div>
  </div>
</template>

<script>
  import symbcode from "@/data/symbcode.json"
  import symbols from "@/data/symbols.json"
  export default {
    data() {
      return {
        loading: null,
        error: null,
        username: null,
        manager: null,
        title: null,
        posts: null,
        data: null,
        symbcode: null
      }
    },
    async mounted() {
      this.loading = true
      
      this.symbcode = (symbcode)
      this.symbols = (symbols)

      const postdata = await fetch('https://gaehivecloset.fizzyizzy.repl.co/hivezine/list')
      this.data = await postdata.json()
      
      this.symbcode.forEach(string => {
        var is = this.symbcode.indexOf(string)
        for ( var i = 0; i < this.data.length; i++){
          let regex = new RegExp(string, "g")
          this.data[i].title = this.data[i].title.replace(regex, this.symbols[is]);
          this.data[i].post = this.data[i].post.replace(regex, this.symbols[is]);
        }
      })
      this.posts = this.data.reverse()
      this.loading = false
      
      this.username = JSON.parse(localStorage['user']).username.toLowerCase()
      this.manager = JSON.parse(localStorage['user']).manager    
    }
  }
</script>