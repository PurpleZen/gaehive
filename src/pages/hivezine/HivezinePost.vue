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
        <div class='username'><span><a :href="'https://scratch.mit.edu/users/' + item.user ">{{ item.user }}</a> on {{ item.date }}</span><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + item.uid + '_500x500.png'">

          <!-- Managers and writers can delete posts if they need to re-write it! -->
          <span v-if="username && manager == 'true'" @click="pinPost()" class="promptButton"><div class="material-symbols-rounded">push_pin</div><span class="tooltiptext">pin post to home</span></span>
          
          <span v-if="username && manager == 'true'" @click="deletePost()" id="important" class="promptButton"><div class="material-symbols-rounded">delete</div><span class="tooltiptext">delete post</span></span>
          
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
  import symbcode from "@/data/symbcode.json"
  import symbols from "@/data/symbols.json"
  export default {
    data() {
      return {
        loading: null,
        error: null,
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
        
        const postdata = await fetch('https://gaehivecloset.fizzyizzy.repl.co/hivezine/post/' + this.$route.params.id)
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
      },
      async pinPost() {
        if (confirm("Are you sure you want to pin this post to the homepage?")) {
          fetch(`https://gaehivecloset.fizzyizzy.repl.co/hivezine/pin`, {
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
              location.href = "/"
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