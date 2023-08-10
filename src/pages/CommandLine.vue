<template>    
  <h2>
    <span v-for="(item, index) in this.greeting"><span class="text" :style="{ 'animation-delay': index/50 + 's'}">{{ item }}<br v-if="item == '.'"><input @keyup.enter="this.getPosts()" id="get" rows='1' v-if="item == '‍' && !this.posts"></span></span><span v-for="(item, index) in this.posts">{{ item }}<br></span><span v-if="this.posts && !this.res">><input @keyup.enter="this.deletePost()" id="delete" rows='1' v-if="this.posts"></span><span v-if="this.res == 'ok'">> exit</span><span v-if="this.res == 'err'">> error</span>
  </h2>
  
</template>

<script>
  import symbcode from "@/data/symbcode.json"
  import symbols from "@/data/symbols.json"
  export default {
    methods: {
      async getPosts() {
        if (document.getElementById("get").value == "get posts") {
        const postdata = await fetch('https://gaehivecloset.fizzyizzy.repl.co/hivezine/list')
      this.data = await postdata.json()
      
      this.symbcode.forEach(string => {
        var is = this.symbcode.indexOf(string)
        for ( var i = 0; i < this.data.length; i++){
          let regex = new RegExp(string, "g")
          this.data[i].title = this.data[i].title.replace(regex, this.symbols[is]);
          this.data[i].post = this.data[i].post.replace(regex, this.symbols[is]);
        }
      })
      var start = 0
      var end = 10
      this.posts = this.data.slice(start, end)
      }
      },
      async deletePost() {
        if (document.getElementById("delete").value.includes("delete post") && document.getElementById("delete").value.match(/\d+/)[0]) {
          const post = document.getElementById("delete").value.match(/\d+/)[0];

          fetch(`https://gaehivecloset.fizzyizzy.repl.co/hivezine/delete`, {
            headers: {
              "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify({
              id: post,
              token: localStorage['token']
            })
          })
          .then(res => res.json())
          .then((res) => {
            if (res.ok) {
              this.res = "ok"
              location.href = "/hivezine"
            }
            if (res.error) {
              this.res = "err"
            }
          })
        }
      }
    },
    mounted () {
      document.documentElement.setAttribute('data-theme', "terminal");
      this.symbcode = (symbcode)
      this.symbols = (symbols)

      let greeting = "> Hello.> Welcome to the terminal for the Gaehive Website. > You're probably here because /someone/ XSS'd a Hivezine post, and now the Hivezine is continuously Rickrolling you lol. > If that's the case, this is your place. > Type 'get posts' to view the first page of Hivezine posts. > Type 'delete post <id>' replacing <id> with the id of the post you want to delete. > ‍"
      this.greeting = greeting.split('')
    },
    data() {
      return {
        greeting: "",
        posts: null,
        data: "",
        symbols: null,
        symbcode: null,
        res: null
      }
    }
  }
</script>

<style scoped>  
.text {
  opacity: 0;
  animation-duration: 0s;
  animation-name: type;
  animation-fill-mode: forwards;
}

@keyframes type {
  from {opacity: 0;}
  to {opacity: 1;}
}

h2 {
  height: 105%;
}

br {
  margin-bottom: 20px;
}

input {
  background-color: #000;
  border: none;
  border-bottom: green 1px solid;
  outline: none;
  color: lightgreen;
  font-family: monospace;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 50vh;

}
</style>