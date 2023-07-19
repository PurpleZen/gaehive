<template>
  <div class="page" id="page">
  <div id="hostqueue" class="container">
  <div class="queue">
    <div v-if="error"><h3>Error :/</h3></div>
    <div v-if="loading && !error" class="loader"></div>
    <div class="posts">
    <div class="post" v-for="(item, index) in this.posts">
      <div class="title">
        <div>{{ item.title }}</div>
        <div class='username'><span>written by <a :href="'https://scratch.mit.edu/users/' + item.user ">{{ item.user }}</a></span><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + item.uid + '_500x500.png'">

          <!-- Managers and writers can delete posts if they need to re-write it! -->
          <span v-if="username && manager == 'true'" @click="deletePost()" id="add" class="promptButton">delete</span>
          
      </div>
      </div>
      <div class='content' v-html=item.post></div></div>
    </div>
    <router-link to="/hivezine" class="button">View All Posts</router-link>
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
    },
    methods: {
      async deletePost() {
        if (confirm("Are you sure you want to delete this post?")) {
          fetch(`https://gaehivecloset.fizzyizzy.repl.co/hivezine/delete`, {
            headers: {
              "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify({
              id: this.$route.params.id,
              token: localStorage['token']
            })
          })
          .then(res => res.json())
          .then((res) => {
            if (res.ok) {
              location.href = "/hivezine"
            }
            if (res.error) {
              this.request = "unauthorized"
            }
          })
        }  
      }
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