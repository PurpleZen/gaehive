<template>
  <div class="page" id="page">
  <div id="hostqueue" class="container">
  <div class="queue">
    
    <div v-if="loading" class="loader">Loading...</div>
    <div class="posts">
      <TransitionGroup name="hz">
    <div class="post" v-for="(item, index) in this.posts" :key="index">
      <div class="title">
        <div v-html=item.title></div>
        <div class='username'><span><a :href="'https://scratch.mit.edu/users/' + item.user ">{{ item.user }}</a> on {{ item.date }}</span><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + item.uid + '_500x500.png'">

          <!-- Managers and writers can delete posts if they need to re-write it! -->
          <a :href="'https://scratch.mit.edu/studios/33586934/comments#comments-' + item.pid" class="promptButton"><div class="material-symbols-rounded">forum</div><span class="tooltiptext">view source</span></a>
          
          <span v-if="username && manager == 'true' || admin == 'true' || writer == 'true'" @click="pinPost()" class="promptButton"><div class="material-symbols-rounded">push_pin</div><span class="tooltiptext">pin post to home</span></span>
          
          <span v-if="username && manager == 'true' || admin == 'true' || writer == 'true'" @click="deletePost()" id="important" class="promptButton"><div class="material-symbols-rounded">delete</div><span class="tooltiptext">delete post</span></span>
          
      </div>
      </div>
      <div class='content' v-html=item.post></div>
      
    <div v-if=username class="reactions">
      
        <div v-if="!contains(item.loveby)" class="reactbutton" @click="react('love', item.id)">❤️<span>{{ item.love }}</span></div>
        <div v-if="contains(item.loveby)" class="reactbuttonactive">❤️<span>{{ item.love }}</span></div>

        <div v-if="!contains(item.likeby)" class="reactbutton" @click="react('like', item.id)">👍<span>{{ item.like }}</span></div>
        <div v-if="contains(item.likeby)" class="reactbuttonactive">👍<span>{{ item.like }}</span></div>

        <div v-if="!contains(item.laughby)" class="reactbutton" @click="react('laugh', item.id)">😂<span>{{ item.laugh }}</span></div>
        <div v-if="contains(item.laughby)" class="reactbuttonactive">😂<span>{{ item.laugh }}</span></div>

        <div v-if="!contains(item.wowby)" class="reactbutton" @click="react('wow', item.id)">😮<span>{{ item.wow }}</span></div>
        <div v-if="contains(item.wowby)" class="reactbuttonactive">😮<span>{{ item.wow }}</span></div>

        <div v-if="!contains(item.sadby)" class="reactbutton" @click="react('sad', item.id)">😟<span>{{ item.sad }}</span></div>
        <div v-if="contains(item.sadby)" class="reactbuttonactive">😟<span>{{ item.sad }}</span></div>

        <div v-if="!contains(item.yayby)" class="reactbutton" @click="react('yay', item.id)">🎉<span>{{ item.yay }}</span></div>
        <div v-if="contains(item.yayby)" class="reactbuttonactive">🎉<span>{{ item.yay }}</span></div>

      <div v-if="!contains(item.frogby) && secret(item.post)" class="reactbutton" @click="react('frog', item.id)">🐸<span>{{ item.frog }}</span></div>
        <div v-if="contains(item.frogby) && secret(item.post)" class="reactbuttonactive">🐸<span>{{ item.frog }}</span></div>
      </div>
    </div>
        </TransitionGroup>
    </div>
    <router-link v-if=!loading to="/hivezine" class="button">View All Posts</router-link>
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
        username: null,
        loading: null,
        error: null,
        title: null,
        posts: null,
        data: null,
        symbcode: null,
        reacting: false
      }
    },
    async mounted() {
      
        this.loading = true

      if (localStorage['user']) {
        this.username = JSON.parse(localStorage['user']).username
        this.admin = JSON.parse(localStorage['user']).admin 
        this.manager = JSON.parse(localStorage['user']).manager
        this.writer = JSON.parse(localStorage['user']).writer 
      }

this.symbcode = (symbcode)
      this.symbols = (symbols)
        
        const postdata = await fetch('/gaehivecloset-legacy/hivezine/%23' + this.$route.params.id + '.json')
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
    },
    methods: {
      async deletePost() {
        if (confirm("Are you sure you want to delete this post?")) {
          this.$emit('load')
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
          this.$emit('load')
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
      },
      async refresh() {
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

      this.reacting = false
      },
      
      contains(name) {
        if (name) {
          return name.includes(this.username)
        }
      },

      secret(post) {
        if (post.includes(":frog:")) {
          return true
        }
      },
      
      async react(type, post) {
        if (this.reacting == false) {
          this.reacting = true
          this.$emit('load')
          fetch(`https://gaehivecloset.fizzyizzy.repl.co/hivezine/react`, {
            headers: {
              "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify({
              username: this.username,
              type: type,
              id: post,
              token: localStorage['token']
            })
          })
          .then(res => res.json())
          .then((res) => {
            if (res.ok) {
              this.$emit('load')
              this.refresh()
            }
            if (res.error) {
              this.$emit('load')
              this.$emit('error')
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