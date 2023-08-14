<template>
  <div class="sidebar">
    <div v-if="loading" class="loader">Loading...</div>
    <div v-if="error" class="error"><div class="material-symbols-rounded">error</div><span>Uh oh! Looks like something went wrong.</span><div @click="error = !error" class="button">Ok</div></div>
    <div v-if="!loading && !error" class="loader-placehold"></div>
    <h1 @click.right="this.secret = true" v-if="username">hello{{ mellie }} {{ username }}, welcome to the gaehive website.</h1>
    <h1 @click.right="this.secret = true" v-if="!username">hello, welcome to the gaehive website.</h1>
    
    <a class='button' href="https://scratch.mit.edu/studios/5842709/comments">scratch studio</a>
    <router-link class='button' to="/">home</router-link>
    <router-link class='button' to="/hivezine">hivezine</router-link>
    <router-link class='button' to="/managers">managers</router-link>
    <router-link class='button' to="/resources">resources</router-link>
    
    <button @click="changeTheme('dark')" v-if="this.theme !== 'dark' && this.theme !== '2000s-blog' && !this.secret">theme</button>
    <button @click="changeTheme('light')" v-if="this.theme == 'dark' && !this.secret || this.theme == '2000s-blog'">theme</button>
    <button @click="changeTheme('2000s-blog')" v-if="this.secret && this.theme !== '2000s-blog'">reset internet to 2004</button>
    <div class="loader-placehold"></div>
    <button class='login' @click="logIn()" v-if="!this.username">sign in</button>
    <button class='login' @click="logOut()" v-if="this.username">sign out</button>
    <button v-if="this.username" class="feedback" href="https://scratch.mit.edu/studios/33687618/comments">feedback</button>
  </div>
  
  <router-view @load="loading = !loading" @error="error = !error"/>
  
</template>

<script>
  export default {
    methods: {
      logIn() {
        window.location = 'https://auth.itinerary.eu.org/auth/?redirect=' +
      btoa('https://' + location.hostname + '/api/login') +
      '&name=the Gaehive website'
    },
      logOut() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("tokenExp")
        window.location.reload()
      },
      changeTheme(theme) {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute('data-theme', localStorage["theme"]);
        this.theme = localStorage["theme"];
      }
    },
    
    beforeMount() {
      
      if (window.location.search.slice(6) ) {
        localStorage.setItem("user", JSON.parse(atob(window.location.search.slice(6)))
      }
    },
    
    mounted() {
      this.theme = localStorage["theme"];

      if (localStorage['user']) {
        this.username = JSON.parse(localStorage['user']).username.toLowerCase()
      }
      if (this.username == "melody-sy") {
        this.mellie = "sy"
      }
    },
    
    data() {
  	  return {
        username: null,
        theme: null,
        secret: null,
        mellie: null,
        loading: false,
        error: false
  	  }
    }
  }
</script>

<style>
:root {
  --bg: #f6b93c;
  --sb: #fafafa;
  --acc: #365a35;
  --acc2: #483248;
  --brk: #0006;
  --txt: #444;
  --btxt: #fafafa;
  --slnk: #676700;
  --slnkh: #484800;
  --plnk: #573c57;
  --plnkh: #392839;
  --imp: #c94b4b;
  --brkb: 4px dotted var(--brk);
}

[data-theme="dark"] {
  --bg: #221f1b;
  --sb: #483232;
  --acc: #e38735;
  --acc2: #d88235;
  --brk: #ffb30094;
  --txt: #E7B148;
  --btxt: black;
  --slnk: #F8DE7E;
  --slnkh: #C6B164;
  --plnk: #FF9900;
  --plnkh: #CC7A00;
  --imp: #fff;
}

[data-theme="2000s-blog"] {
  --bg: blue;
  --sb: gray;
  --acc: magenta;
  --acc2: white;
  --brk: magenta;
  --txt: white;
  --btxt: white;
  --slnk: blue;
  --slnkh: purple;
  --plnk: magenta;
  --plnkh: lime;
  --imp: red;
  --brkb: 4px solid var(--brk);
}
[data-theme="2000s-blog"] * {
  font-family: 'Comic Neue' !important;
  border-radius: 0 !important;
  transition: none !important;
  animation: none !important;
}
[data-theme="2000s-blog"] .sidebar {
  background-color: lightgray;
}
[data-theme="2000s-blog"] .loader {
  border: none;
  width: auto;
  color: white;
}
[data-theme="2000s-blog"] .input {
  color: black;
  background-color: white;
}
[data-theme="2000s-blog"] .promptButton .tooltiptext {
  color: black;
}
[data-theme="2000s-blog"] .material-symbols-rounded {
  font-family: 'Material Symbols Rounded' !important;
}

[data-theme="terminal"] {
  --bg: #000;
  --txt: lightgreen;
}
[data-theme="terminal"] body {
  font-family: monospace;
  width: auto;
  margin: 20px;
  white-space: pre-line;
}

  
.hz-move,
.hz-enter-active {
  transition: all 0.5s ease;
}
.hz-enter-from,
.hz-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.mng-move,
.mng-enter-active,
.mng-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.mng-enter-from,
.mng-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}
.mng-leave-active {
  position: absolute;
}


html, body {
  color: var(--txt);
  background-color: var(--bg);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000000' fill-opacity='0.1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
  margin: 0;
  font-family: 'Vollkorn';
  display: flex;
  height: 100vh;
  width: 100vw;
}
  
textarea, .preview {
  resize: none;
  outline: none;
  overflow: auto;
  border: none;
  border-radius: inherit;
  margin-top: 0;
  scrollbar-width: none;
  color: var(--txt);
  font-family: 'Vollkorn';
  background-color: var(--sb);
}

.sidebar {
  width: min-content;
  background-color: var(--sb);
  border-image: linear-gradient(#ef5350,#ffb74d,#fdd835,#9ccc65,#4fc3f7,#ba68c8) 1;
  border-left: solid 10px;
  padding: 50px;
  flex-shrink: 0;
  display: grid;
  justify-content: center;
  align-content: center;
  box-shadow: #0005 0 0 10px;
  transition: all ease 0.2s;
}

.sidebar h1 {
  font-family: 'Abril Fatface';
  color: var(--acc2);
  border-left: solid 3.5px var(--bg);
  padding-left: 5px;
}

.sidelinks {
  color: var(--slnk);
  text-decoration: underline;
  font-family: 'Vollkorn';
  font-size: 20px;
  width: fit-content;
}

.sidelinks:hover {
  color: var(--slnkh);
}

.login, .feedback{
  background-color: var(--acc);
  color: var(--btxt);
  padding: 2px 11px;
  margin-bottom: 5px;
  border-radius: 10px;
  width: fit-content;
  text-decoration: none;
  cursor: pointer;
}

.login:hover, .feedback:hover {
  outline: var(--bg) solid 2px;
}

.feedback {
  font-size: small;
}
  
.credits {
  font-family: 'Vollkorn';
  font-size: 12px;
  margin-top: 30px;
}

.page {
  display: grid;
  overflow: scroll;
}

.page h1 {
  color: var(--acc2)
}
  
.page a {
  color: var(--plnk);
}

.page a:hover {
  color: var(--plnkh);
}

.nextlist img {
  width: 40px;
  height: 40px;
}

.currnext img {
  width: 60px;
  height: 60px;
}

.container {
  display: grid;
}
  
.queue {
  display: grid;
  align-content: center;
  justify-items: center;
  align-items: center;
  margin: 20px;
}

.greeting {
  font-family: 'Abril Fatface';
  color: var(--acc2);
}

.users {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  background-color: var(--sb);
  margin: 5px;
  border-radius: 5px;
  box-shadow: #0005 0 0 10px -5px;
  transition: all ease 0.2s;
}

.users:hover {
  box-shadow: #0006 0 0 10px;
  scale: 1.01;
}

.users a {
  width: 100%;
  color: var(--txt);
  text-decoration: none;
  align-items: center;
  display: flex;
  padding: 10px;
  overflow: hidden;
  white-space: nowrap;
}

.users span {
  text-overflow: ellipsis;
  overflow: hidden;
}

.users img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 20px
}

.promote {
  width: 24px;
  display: grid;
  background-color: var(--acc);
  border-radius: 0 5px 5px 0;
  align-content: center;
  color: var(--btxt);
  padding: 5px;
}

.nexthosts {
  margin-top: 25px;
  background-color: var(--sb);
  border-radius: 15px;
  box-shadow: #0005 0 0 10px;
}

.list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 10px;
  row-gap: 10px;
  margin: 5px;
  padding: 10px;
  align-items: center;
}

.writers {
  background-color: var(--sb);
  border-radius: 20px;
  width: 100%;
  margin-top: 10px;
  overflow: scroll;
}

.hzlist {
  display: flex;
  margin: 5px;
  align-items: center;
  overflow: scroll;
}

.list .users, .hzlist .users {
  background-color: var(--bg);
}

.hzlist .users {
  width: fit-content;
}

.editList {
  position: relative;
  justify-items: center;
  display: grid;
}

.editList a {
  cursor: pointer;
}
  
.post {
  display: grid;
  resize: none;
  outline: none;
  border-radius: 20px;
  border: none;
  margin-top: 25px;
  scrollbar-width: none;
  color: var(--txt);
  font-family: 'Vollkorn';
  background-color: var(--sb);
}

.post img {
  max-width: 300px;
}

.posts {
  width: 100%;
}

.title {
  background-color: var(--acc);
  color: var(--btxt);
  font-size: larger;
  border-radius: 5px 5px 0 0;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: #0005 0 -5px 10px -3px inset;
}

.title a {
  color: var(--btxt) !important;
  text-decoration: none;
}

.title a:hover {
  text-decoration: underline;
}

.username {
  display: flex;
  font-size: small;
  align-items: center;
}

.username img {
  width: 30px;
  height: 30px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 20px;
}

.content {
  padding: 10px;
}

.reactions {
  border-top: var(--brk) 2px dotted;
  margin: 10px;
  display: flex;
  align-items: center;
}

.reactbutton, .reactbuttonactive {
  position: relative;
  background-color: var(--sb);
  border: 2px solid var(--brk);
  padding: 0px 10px 2px 10px;
  margin-right: 5px;
  display: inline-block;
  font-family: serif;
  font-weight: bolder;
  text-decoration: none;
  cursor: pointer;
  margin-top: 5px;
  border-radius: 10px;
}

.reactbuttonactive {
  color: var(--sb) !important;
  background-color: var(--acc);
  border: 2px solid var(--acc);
  cursor: default;
}

.pages {
  display: flex;
  font-family: serif;
  overflow: scroll;
  max-width: 90%;
  padding-bottom: 15px;

}

.reactbutton:hover {
  background-color: var(--acc);
  border: 2px solid var(--acc);
  color: var(--sb) !important;
}

.pinnedPost {
  display: flex;
  align-items: center;
}

.pinnedPost .post {
    margin-top: 0;
}

.pinnedPost .material-symbols-rounded {
  margin-right: 5px;
  width: 20px;
  font-size: 20px;
  text-decoration: none;
  font-variation-settings:
  'FILL' 1,
  'wght' 400,
  'GRAD' 200,
  'opsz' 20
}

.input {
  background-color: var(--sb);
  color: var(--plnk);
  margin: 2px;
  padding: 5px;
  border: none;
  border-radius: 20px;
  font-family: inherit;
  text-align: center;
}

.button, button {
  display: inline-block;
  background-color: var(--acc);
  color: var(--btxt) !important;
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  text-align: left;
  padding: 5px 15px;
  margin: 2px;
  margin-top: 5px;
  border-radius: 10px;
}

.button:hover {
  outline: var(--btxt) solid 2px;
}

.promptButton {
  display: flex;
  position: relative;
  width: 24px;
  color: var(--txt) !important;
  text-decoration: none !important;
  cursor: pointer;
  padding: 5px 8px;
  margin: 2px;
  border-radius: 10px;
}

.promptButton#important:hover {
  background-color: var(--imp);
}

.promptButton .material-symbols-rounded {
  color: var(--btxt);
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 200,
  'opsz' 48
}

.promptButton:hover .material-symbols-rounded {
  font-variation-settings:
  'FILL' 1,
  'wght' 400,
  'GRAD' 200,
  'opsz' 48
}

.promptButton .tooltiptext {
  width: max-content;
  visibility: hidden;
  background-color: var(--txt);
  color: var(--btxt);
  text-align: center;
  padding: 5px 10px;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  top: 115%;
  right: 0;
  opacity: 0;
  transition: opacity 0.3s;
}
  
.promptButton:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
  
.loader {
  width: 48px;
  height: 48px;
  border: solid 7px var(--acc);
  color: transparent;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s ease-in-out infinite;
}

.error {
  display: flex;
  align-items: center;
  height: 48px;
}

.error .material-symbols-rounded {
  color: #de3b3b;
  margin-right: 5px;
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 200,
  'opsz' 48
}

.loader-placehold {
  width: 48px; 
  height: 48px; 
  border: 7px transparent solid;
  display: inline-block;
  box-sizing: border-box;
}

.break {
  display: inline-block;
  width: 40%;
  border-bottom: var(--brkb);
  margin: 15px
}

@keyframes rotation {
  0% {
    scale: 100%;
    border-radius: 100%;
    rotate: 360deg;
  }
  50% {
    scale: 50%;
    border-radius: 0%;
  }
  100% {
    scale: 100%;
    border-radius: 100%;
  }
}

@media screen and (max-width: 800px) {
  html, body {
    display: grid;
  }
  .sidebar, .page {
    width: auto;
  }
  .sidebar {
    height: 70vh;
  }
  .page {
    overflow: initial;
  }
  .nextlist {
    overflow: initial;
  }
  .list {
    grid-template-columns: none;
  }
  .username img {
    display: none;
  }
  .title {
    display: grid;
    justify-items: center;
    justify-content: center;
  }
  .promptButton {
    padding: 0;
  }
  .username {
    justify-content: center;
  }
  .users a {
    white-space: unset;
  }
  .reactions {
    justify-content: center;
  }
  .reactbutton, .reactbuttonactive {
    padding: 10px 6px;
  }
  .reactbutton span, .reactbuttonactive span {
    display: none;
  }
  .post img {
  max-width: 200px;
}
}
</style>