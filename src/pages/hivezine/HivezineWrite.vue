<template>
  <div class="page" id="page">
    <div class="container">
      <div class="queue">
  <h2 class="greeting">New Post</h2>
  <span>Hello writer! This is where you can write up awesome new posts for the Hivezine.<br> Below, you can write a draft of your post and see a preview, that way you can see what your post will look like when it's posted. You then will copy and paste your draft into the Hivezine studio, and then click "Next!"<br>Please remember all posts <b>must</b> follow <a href="https://scratch.mit.edu/community_guidelines">Scratch Community Guidelines</a>.<br><br>Happy writing!</span>
  <div class="break"></div>
  <textarea class="title" v-model="title" @keyup="updated()" id="username" type="text" placeholder="title of your post"></textarea>
  <textarea v-model="draft" @keyup="updated()" id="username" type="text" placeholder="draft your post here"></textarea>
  <div v-html="preview" class="preview"></div>
    <div>

      <!-- By clicking this button, the data is fetched from the Scratch studio! -->
      <span @click="addManagers()" id="add" class="button">Next</span>
      <input type="checkbox" id="checkbox" />
<label>Feature on homepage</label>
      
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
        preview: null
      }
    },
    mounted() {
      this.username = JSON.parse(localStorage['user']).username
      this.manager = JSON.parse(localStorage['user']).manager
    },
    methods: {
      updated() {
        let text = [
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
          /:eye::lip::eye:/g
        ];
        let emojis = [
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
          "👁👄👁"
        ];
        
        this.preview = "<h3 style='margin:0'>" + this.title + "</h3>" + "<br>" + this.draft
        text.forEach(string => {
          var i = text.indexOf(string)
  this.preview = this.preview.replace(string, emojis[i]);
})
        
      },
      // See? Pretty cool, huh?
      async addManagers() { 
        this.request = 'sending';
        let useradd = document.getElementById("username").value;


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
            this.request = "unauthorized"
          }
        })
      }
    }
  }
</script>

<style scoped>
textarea {
  border-radius: 0;
}
  
.preview {
  border-radius: 0 0 20px 20px
}
  
textarea, .preview {
  min-height: 200px;
  margin: 2px;
}
  
.title {
  height: 20px;
  min-height: 20px;
  border-radius: 20px 20px 0 0;
}
</style>