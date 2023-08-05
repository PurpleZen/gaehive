<template>
  <div class="page" id="page">
    <div class="container">
      <div class="queue">
  <h1 class="greeting">New Post</h1>
  <span>Hello writer! This is where you can write up awesome new posts for the Hivezine.<br> Below, you can write a draft of your post and see a preview, that way you can see what your post will look like when it's posted. You then will copy and paste your draft into the <a href="https://scratch.mit.edu/studios/33586934/comments" target="_blank">Hivezine studio</a>.<br><b>When posting your comments, the first, main comment should be your title. All replies will be your post itself!</b><br>When you're done, click "Let's go!"<br>Check out the <router-link to="/hivezine/guide">guide</router-link> on how you can format your posts!<br><b>Please remember all posts must follow <a href="https://scratch.mit.edu/community_guidelines">Scratch Community Guidelines</a>.</b><br><br>Happy writing!</span>
  <div class="break"></div>
        <div class="posts">
  <div class="post">
          <textarea class="title" v-model="title" @keyup="updated()" id="username" rows="1" type="text" placeholder="title of your post"></textarea>
          <textarea class="content" v-model="draft" @keyup="updated()" id="username" rows="10" type="text" placeholder="draft your post here"> </textarea>
        </div>

        <div v-if="title || draft" class="post">
          <div class="title" v-html="pretitle" onmousedown="return false" onselectstart="return false"></div>
          <div class="content" v-html="predraft" onmousedown="return false" onselectstart="return false"></div>
        </div>
          </div>
    <div>

      <router-link to="/hivezine" class="button">Back</router-link>
      <!-- By clicking this button, the data is fetched from the Scratch studio! -->
      <span @click="addManagers()" id="add" class="button">Let's go!</span>
      
    </div>
    <div v-if="request == 'sending'" class="loader"></div>
    <div v-if="request == null" class="loader-placehold"></div>
    <div v-if="request == 'unauthorized'">
      <h4>Uh oh!</h4>
      <span>Looks like you don't have permission to do that.</span>
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
        request: null,
        error: null,
        username: null,
        manager: null,
        title: "",
        draft: "",
        pretitle: "",
        predraft: "",
        data: null,
        symbcode: null,
        symbols: null
      }
    },
    mounted() {
      this.username = JSON.parse(localStorage['user']).username
      this.manager = JSON.parse(localStorage['user']).manager
    },
    methods: {
      updated() {
        this.symbcode = (symbcode)
        this.symbols = (symbols)

        this.pretitle = this.title
        this.predraft = this.draft
        this.symbcode.forEach(string => {
          let regex = new RegExp(string, "g")
          var i = this.symbcode.indexOf(string)
            this.pretitle = this.pretitle.replace(regex, this.symbols[i]);
            this.predraft = this.predraft.replace(regex, this.symbols[i]);
})
        
      },
      // See? Pretty cool, huh?
      async addManagers() { 
        this.$emit('load')
        
   fetch(`https://gaehivecloset.fizzyizzy.repl.co/hivezine/add`, {
          headers: {
            "Content-Type": "application/json"
          },
          method: "PUT",
          body: JSON.stringify({
            content: document.getElementById("username").value,
            token: localStorage['token']
            // Gotta confirm the login token!
          })
        })
        .then(res => res.json())
        .then((res) => {
          if (res.ok) {
            location.href = "/hivezine"
          }
          if (res.error) {
            this.$emit('load')
            this.$emit('error')
          }
        })
      }
    }
  }
</script>

