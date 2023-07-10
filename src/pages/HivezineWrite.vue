<template>
  <div class="page" id="page">
    <div class="container">
      <div class="queue">
  <h2 class="greeting">New Post</h2>
  <span>Hello writer! This is where you can write up awesome new posts for the Hivezine.<br> Below, you can write a draft of your post. Below that, all styling will be previewed, so you can see what your post will look like when it's posted. You then will copy and paste your draft into the Hivezine studio, and then click "Next!"<br>Happy writing!</span>
  <div class="break"></div>
  <textarea class="title" v-model="title" @keyup="updated()" id="username" type="text" placeholder="title of your post"></textarea>
  <textarea v-model="draft" @keyup="updated()" id="username" type="text" placeholder="draft your post here"></textarea>
  <div v-html="preview" class="preview"></div>
    <div>
      <span @click="addManagers()" id="add" class="button">Add</span>
      
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
        val1: null,
        val2: null,
        id1: null,
        username: null,
        manager: null,
        title: "",
        draft: "",
        preview: null
      }
    },
    methods: {
      updated() {
        let text = [
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
          /:eye::lip::eye:/g
        ];
        let emojis = [
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
          "👁👄👁"
        ];
        
        this.preview = "<h3 style='margin:0'>" + this.title + "</h3>" + "<br>" + this.draft
        text.forEach(string => {
          var i = text.indexOf(string)
  this.preview = this.preview.replace(string, emojis[i]);
})
        
      },
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