<template>
  <div class="page" id="page">
  <div id="hostqueue" class="container">
  <div class="queue">
    <div v-if="error"><h3>Error :/</h3></div>
    <div v-if="loading && !error" class="loader"></div>
    <router-link to="/hivezine">view all posts</router-link>
    <div class="posts">
    <div class="post" v-for="(item, index) in this.posts">
      <div class="title">
        <div>{{ item.title }}</div>
        <div class='username'>written by {{ item.user }}<img :src="'https://uploads.scratch.mit.edu/get_image/user/' + item.uid + '_500x500.png'">
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
        title: null,
        posts: null,
        data: null
      }
    },
    async mounted() {
      
      if (!this.val1) {
        this.loading = true

        let chardata = [
          /:cool:/g,
          /:hmm:/g,
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

        const postdata = await fetch('https://gaehivecloset.fizzyizzy.repl.co/hivezine/post/' + this.$route.params.id)
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
      }
      this.username = JSON.parse(localStorage['user']).username.toLowerCase()
      this.manager = JSON.parse(localStorage['user']).manager

      
    }
  }
</script>

<style scoped>
.page {
  display: grid;
}

  
#posts {
  width: 100%;
}
  
@media screen and (max-width: 800px) {
  .page {
    display: block;
  }
}
</style>