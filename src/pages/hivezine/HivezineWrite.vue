<template>
  <div class="page" id="page">
    <div class="container">
      <div class="queue">
  <h1 class="greeting">New Post</h1>
  <span><h3>Please read this <router-link to="/docs/writers-guide">guide</router-link> on how to submit and format your posts!</h3>Hello writer! This is where you can write up awesome new posts for the Hivezine.<br> Below, you can write a draft of your post and see a preview, that way you can see what your post will look like when it's posted. You then will copy and paste your draft into the <a href="https://scratch.mit.edu/studios/33586934/comments" target="_blank">Hivezine studio</a>. Before you do this, please make sure no one else is currently writing a post.<br>When you're done, click "Let's go!"<br><b>Please remember all posts must follow <a href="https://scratch.mit.edu/community_guidelines">Scratch Community Guidelines</a> and <a href="https://scratch.mit.edu/studios/5842709/comments/">Gaehive Studio Guidelines</a>.</b><br><br>Happy writing!</span>
  <div class="break"></div>
        <div class="posts">
  <div class="post">
          <div class="title"><textarea class="title" v-model="title" @keyup="updated()" id="title" rows="1" wrap="off" type="text" placeholder="title of your post"></textarea>
            <div class=username>
              <span @click="deleteDraft()" id="important" class="promptButton"><div class="material-symbols-rounded">delete</div><span class="tooltiptext">delete draft</span></span>
            </div>
          </div>
          <textarea class="content" v-model="draft" @keyup="updated()" rows="10" type="text" placeholder="draft your post here"> </textarea>
        </div>

        <div v-if="title || draft" class="post">
          <div class="title" v-html="pretitle" onmousedown="return false" onselectstart="return false"></div>
          <div class="content" v-html="predraft" onmousedown="return false" onselectstart="return false"></div>
        </div>
          </div>
    <div>

      <router-link to="/hivezine" class="button">Back</router-link>
      <!-- By clicking this button, the data is fetched from the Scratch studio! -->
      <span @click="addPost()" id="add" class="button">Let's go!</span>
      
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
      this.title = localStorage['title']
      this.draft = localStorage['draft']
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
        localStorage.setItem("title", this.title);
        localStorage.setItem("draft", this.draft);
        
      },
      // See? Pretty cool, huh?
      async addPost() { 
        this.$emit('load')
        
   fetch(`https://gaehivecloset.fizzyizzy.repl.co/hivezine/add`, {
          headers: {
            "Content-Type": "application/json"
          },
          method: "PUT",
          body: JSON.stringify({
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
      },
      async deleteDraft() {
        if (confirm("Are you sure you want to delete this draft?")) {
          this.title = ''
          localStorage['title'] = ''
          this.draft = ''
          localStorage['draft'] = ''
        }
      }
    }
  }
</script>

<style scoped>
#title {
  padding: 0;
  width: 100%;
}
</style>
