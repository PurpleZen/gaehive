<template>
  <metainfo>
    <template v-slot:title="{ content }"></template>
  </metainfo>
  <div class="sidebar">
    <div v-if="loading" class="loader">Loading...</div>
    <div v-if="error" class="error"><div class="material-symbols-rounded">error</div><span>Uh oh! Looks like something went wrong.</span><div @click="error = !error" class="button">Ok</div></div>
    <div v-if="!loading && !error" class="loader-placehold"></div>
    <div class="hello">
    <img v-if="username" :src="'https://uploads.scratch.mit.edu/users/avatars/' + id + '.png'">
    <img v-if="!username" src="/favicon.ico">
    <h2 @click.right="this.secret = true" v-if="username">Hello{{ mellie }},<br>{{ username }}</h2>
    <h2 @click.right="this.secret = true" v-if="!username">Hello,<br>freind</h2>
    </div>
    
    <a class='sidebutton' href="https://scratch.mit.edu/studios/5842709/comments">scratch studio</a>
    <router-link class='sidebutton' to="/">home</router-link>
    <router-link class='sidebutton' to="/hivezine">hivezine</router-link>
    <router-link class='sidebutton' to="/managers">managers</router-link>
    <router-link class='sidebutton' to="/resources">resources</router-link>
    
    <button class='sidebutton' @click="changeTheme('dark')" v-if="this.theme !== 'dark' && this.theme !== '2000s-blog' && !this.secret">theme</button>
    <button class='sidebutton' @click="changeTheme('light')" v-if="this.theme == 'dark' && !this.secret || this.theme == '2000s-blog'">theme</button>
    <button class='sidebutton' @click="changeTheme('2000s-blog')" v-if="this.secret && this.theme !== '2000s-blog'">reset internet to 2004</button>
    <div class="loader-placehold"></div>
    <button class='login' @click="logIn()" v-if="!this.username">sign in</button>
    <button class='login' @click="logOut()" v-if="this.username">sign out</button>
    <button v-if="this.username" class="feedback" href="https://scratch.mit.edu/studios/33687618/comments">feedback</button>
  </div>
  
  <router-view @load="loading = !loading" @error="error = !error"/>
  
</template>

<script>
  import { useMeta } from 'vue-meta'
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
    
    created() {
      
      if (window.location.search.slice(6) ) {
        localStorage.setItem("user", atob(window.location.search.slice(6)))
        window.location.search = ""
      }
    },
    
    mounted() {
      this.theme = localStorage["theme"];

      if (localStorage['user']) {
        this.username = JSON.parse(localStorage['user']).username
        this.id = JSON.parse(localStorage['user']).id
      }
      if (this.username == "melody-sy") {
        this.mellie = "sy"
      }
    },
    
    data() {
  	  return {
        username: null,
        id: null,
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
  --sb: oldlace;
  --acc: #365a35;
  --acc2: #483248;
  --brk: #0006;
  --txt: #444;
  --btxt: #fafafa;
  --slnk: #676700;
  --slnkh: #484800;
  --plnk: #573c57;
  --plnkh: #392839;
  --imp: #9f4928;
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
  width: 20%;
  background-color: var(--sb);
  border-image: linear-gradient(#ef5350,#ffb74d,#fdd835,#9ccc65,#4fc3f7,#ba68c8) 1;
  border-left: solid 10px;
  padding: 50px;
  flex-shrink: 0;
  display: grid;
  align-content: center;
  box-shadow: #0005 0 0 10px;
  transition: all ease 0.2s;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000000' fill-opacity='0.1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
}

.sidebar h2 {
  font-family: 'Abril Fatface';
  color: var(--acc2);
  border-left: solid 3px var(--bg);
  padding-left: 5px;
  margin-left: -3px;
}

.hello {
  display: flex;
  align-items: center;
}

.hello img {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: var(--bg) solid 3px;
  background-color: var(--sb);
}

.sidebutton {
  display: inline-block;
  background-color: transparent;
  color: var(--txt);
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  text-align: left;
  padding: 5px 15px;
  transition: padding linear 0.1s;
}

.sidebutton:hover {
  outline: var(--btxt) solid 2px;
  padding-left: 20px;
  background-color: var(--acc);
  color: var(--btxt);
}

.login, .feedback{
  background-color: var(--acc);
  color: var(--btxt);
  font-family: inherit;
  font-size: inherit;
  padding: 2px 11px;
  margin-bottom: 5px;
  border-radius: 10px;
  width: fit-content;
  text-decoration: none;
  cursor: pointer;
  border: none;
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
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000000' fill-opacity='0.1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
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
  border-radius: 20px;
}

.hostnext {
  display: flex;
}

.useroptions {
  display: grid;
}

.promote {
  width: 24px;
  display: grid;
  border-radius: 0 5px 0 0;
  align-content: center;
  color: var(--txt);
  padding: 5px;
  transition: background-color 0.05s;
}

.remove {
  width: 24px;
  display: grid;
  border-radius: 0 0 5px 0;
  align-content: center;
  color: var(--txt);
  padding: 5px;
  transition: background-color 0.05s;
}

.remove:hover {
  background-color: var(--imp);
  color: var(--btxt);
}

.promote:hover {
  background-color: var(--acc);
  color: var(--btxt);
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
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
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

.button {
  display: inline-block;
  background-color: var(--acc);
  color: var(--btxt) !important;
  text-decoration: none;
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
    height: auto;
    border-image: linear-gradient(90deg,#ef5350,#ffb74d,#fdd835,#9ccc65,#4fc3f7,#ba68c8) 1;
    border-left: none;
    border-top: solid 10px;
  }
  .page {
    overflow: initial;
  }
  .hostnext {
    display: grid;
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