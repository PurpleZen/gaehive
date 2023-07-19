<template>
  <div class="page" id="page">
  <div id="hostqueue" class="container">
  <div class="queue">
    <div v-if="error"><h3>Error :/</h3></div>
    <div v-if="loading && !error" class="loader"></div>
    <h2 class="greeting">The Hivezine</h2>
  <span v-if=!loading>Hello, welcome to the Hivezine on the Gaehive Website!<br>Here you can find news and announcements about events happening in the Scratch studio, fun spoof posts, and useful guides for here, and for in the Scratch studio!</span>

    <!-- This link won't show if you don't have manager or writer permissions -->
    <router-link v-if="username && manager == 'true'" to="/hivezine/new" class="button">New Post</router-link>
    
    <div class="posts">
    <div class="post" v-for="(item, index) in this.posts">
      <div class="title">
        <router-link :to="'/hivezine/post/' + item.id">{{ item.title }}</router-link>
        <div class='username'><span>written by <a :href="'https://scratch.mit.edu/users/' + item.user ">{{ item.user }}</a></span><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + item.uid + '_500x500.png'">
           </div></div>
      <div class='content' v-html=item.post></div></div>
    </div>
    
  </div>
  </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: null,
        error: null,
        username: null,
        manager: null,
        title: null,
        posts: null,
        data: null
      }
    },
    async mounted() {
      this.loading = true

      let chardata = [
        /:cool:/g,
        /:hmm:/g,
        /:crylaugh:/g,
        /:thumbsup:/g,
        /:heart:/g,
        /:pride:/g,
        /:trans:/g,
        /:nails:/g,
        /:skull:/g,
        /:sparkle:/g,
        /:yay:/g,
        /:eye::lip::eye:/g,
        /&lt;/g,
        /&gt;/g,
        /&quot;/g,
        /&#39;/g
      ]

      let symbols = [
        "😎",
        "🤔",
        "😂",
        "👍",
        "❤️",
        "🏳️‍🌈",
        "🏳️‍⚧️",
        "💅",
        "💀",
        "✨️",
        "🎉",
        "👁👄👁",
        "<",
        ">",
        '"',
        "'"
      ]

      const postdata = await fetch('https://gaehivecloset.fizzyizzy.repl.co/hivezine/list')
      this.data = await postdata.json()
      
      chardata.forEach(string => {
        var is = chardata.indexOf(string)
        for ( var i = 0; i < this.data.length; i++){
          this.data[i].title = this.data[i].title.replace(string, symbols[is]);
          this.data[i].post = this.data[i].post.replace(string, symbols[is]);
        }
      })
      this.posts = this.data.reverse()
      this.loading = false
      
      this.username = JSON.parse(localStorage['user']).username.toLowerCase()
      this.manager = JSON.parse(localStorage['user']).manager    
    }
  }
</script>