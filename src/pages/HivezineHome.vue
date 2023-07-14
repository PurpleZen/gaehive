<template>
  <div class="page" id="page">
  <div id="hostqueue" class="container">
  <div class="queue">
    <router-link v-if="username && manager == 'true'" to="/hivezine/new">new post</router-link> 
      <div v-show="!loading"  id="posts">
      </div>
    <div v-if="error"><h3>Error :/</h3></div>
    <div v-if="loading && !error" class="loader"></div>
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
        post: null
      }
    },
    async mounted() {
      
      if (!this.val1) {
        this.loading = true

        const postdata = await fetch('https://gaehivecloset.fizzyizzy.repl.co/hivezine/list')
        const post = await postdata.json()

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

        
        for ( var i = 0; i < post.length; i++ ) {
          this.post = post[i].post;
          chardata.forEach(string => {
          var is = chardata.indexOf(string)
  this.post = this.post.replace(string, symbols[is]);
            })
          const para = document.createElement("p");
          para.classList.add("preview");
          para.innerHTML = "<h3>" + post[i].user + "</h3>" + this.post;
          document.getElementById("posts").insertBefore(para, document.getElementById("posts").children[0]);
       } 

        

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
  grid-template-areas:
    'currnext nextlist manage';
  grid-template-columns: repeat(2, 1fr);
}

#hostqueue {
  grid-area: currnext;
}

#listqueue {
  grid-area: nextlist;
}

#manage {
  width: min-content;
  grid-area: manage;
  text-align: center;
}

#manage-area {
  background-color: var(--sb);
  border-radius: 20px;
}

@media screen and (max-width: 800px) {
  .page {
    display: block;
  }
}
</style>