<template>
  <metainfo>
    <template v-slot:title="{ content }"></template>
  </metainfo>
  <div class="sidebar">
    <div class="block-break"></div>
    <div class="hello">
    <img v-if="username" :src="'https://uploads.scratch.mit.edu/users/avatars/' + id + '.png'">
    <img v-if="!username" src="/favicon.ico">
    <h2 @click.right="this.secret = true" v-if="username">Hello{{ mellie }},<br>{{ username }}</h2>
    <h2 @click.right="this.secret = true" v-if="!username">Welcome</h2>
    </div>

    <a class='sidebutton' href="https://scratch.mit.edu/studios/5842709/comments" target="_blank">Scratch Studio</a>
    
    <router-link v-if="location !== '' || active" class='sidebutton' to="/">Home</router-link>
    <router-link v-if="location == '' && !active" class='sidebuttonactive' to="/">Home</router-link>
    
    <router-link v-if="location !== 'hivezine' || active" class='sidebutton' to="/hivezine">Hivezine</router-link>
    <router-link v-if="location == 'hivezine' && !active" class='sidebuttonactive' to="/hivezine">Hivezine</router-link>
    
    <router-link v-if="location !== 'managers' || active" class='sidebutton' to="/managers">Managers</router-link>
    <router-link v-if="location == 'managers' && !active" class='sidebuttonactive' to="/managers">Managers</router-link>
    
    <router-link class='sidebutton' to="/resources">Resources</router-link>
    
    <router-link v-if="location !== 'settings' || active" class='sidebutton' to="/settings">Settings</router-link>
    <router-link v-if="location == 'settings' && !active" class='sidebuttonactive' to="/settings">Settings</router-link>

    <a v-if="this.username" class="sidebutton" href="https://scratch.mit.edu/studios/33687618/comments" target="_blank">Feedback</a>
      
    <div class="block-break"></div>
    <button class='login' @click="logIn()" v-if="!this.username">Sign in <div class="material-symbols-rounded">login</div></button>
    <button class='login' @click="logOut()" v-if="this.username">Sign out <div class="material-symbols-rounded">logout</div></button>
  </div>
  <div class="page">
  <div v-if="scratchdb == 'offline' || loggedout" class="popupbg"></div>
  <div v-if="scratchdb == 'offline'" class="popup">
    <div class="title">ScratchDB is offline!</div>
    <div class="popupbody">
      Some Website features like logging in and adding new writers and managers will not work.
      <div class="popupbuttons">
        <button @click="scratchdb = 'online'" class="button">OK</button>
      </div>
    </div>
  </div>
  <div v-if="loggedout == true" class="popup">
    <div class="title">Session Expired</div>
    <div class="popupbody">
      You've been logged out. Would you like to log back in?
      <div class="popupbuttons">
        <button @click="logIn()" class="button">Yes</button>
        <button @click="this.loggedout = null" class="button">No</button>
      </div>
    </div>
  </div>
  <router-view @load="loading = !loading" @error="error = !error"/>
  </div>
  
</template>

<script>
  import { useMeta } from 'vue-meta'
  export default {
    methods: {
      logIn() {
        window.location = 'https://auth.itinerary.eu.org/auth/?redirect=' +
      btoa('https://' + location.hostname + '/api/login?return=' + location.pathname + "&") +
      '&name=the Gaehive website'
    },
      logOut() {
        localStorage.removeItem("user")
        document.cookie = document.cookie + ";expires=Thu, 01 Jan 1970 00:00:00 GMT"
        window.location.reload()
      },
      changeTheme(theme) {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute('data-theme', localStorage["theme"]);
        this.theme = localStorage["theme"];
      },
      color() {
       document.querySelector(":root").style.setProperty("--acc", document.getElementById("color").value)
        document.querySelector(":root").style.setProperty("--btxt", document.getElementById("buttoncolor").value)
      }
    },

    watch:{
      $route (to, from){
        this.location = window.location.pathname.split('/')[1];
      }
    }, 
    
    created() {
      if (!document.cookie && localStorage["user"]) {
        this.loggedout = true
        localStorage.removeItem("user")
      }
      if (window.location.search.slice(1,5) == "user") {
        localStorage.setItem("user", atob(decodeURIComponent(window.location.search.slice(6))))
        this.$router.push({ path: location.pathname, query: null })
      }
    },
    
    async mounted() {
      this.theme = localStorage["theme"];

      if (localStorage['user']) {
        this.username = JSON.parse(localStorage['user']).username
        this.id = JSON.parse(localStorage['user']).id
      }
      if (this.username == "melody-sy") {
        this.mellie = "sy"
      }
      
      const userinfo = await fetch('https://scratchdb.lefty.one/v3/user/info/LegoManiac04');
    
      try {
        const userdata = await userinfo.json();
        this.scratchdb = "online"
      } catch(err) {
        this.scratchdb = "offline"
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
        error: false,
        active: false,
        location: null,
        scratchdb: "Loading",
        loggedout: null
  	  }
    }
  }
</script>

<style>
:root {
  --bg: #fc3;
  --sb: oldlace;
  --acc: #518d49;
  --acc2: #483248;
  --acclt: #8fc89b66;
  --brk: #0006;
  --txt: #444;
  --txtstr: #000;
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
  --acclt: #c88f8f66;
  --brk: #ffb30094;
  --txt: #E7B148;
  --txtstr: #fff;
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
.hz-leave-active {
  transition: all 0.1s ease;
}
.hz-enter-from,
.hz-leave-to {
  opacity: 0;
  
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

.popup-enter-active,
.popup-leave-active {
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}


.currentpage, .nextpage {
  padding: 10px 5px;
  width: 10px;
  display: inline-block;
  text-align: center;
  text-decoration: none;
}
  
.currentpage {
  background-color: var(--acc) !important;
  color: var(--btxt) !important;
}

.nextpage {
  background-color: var(--sb);
  color: var(--txt);
}

.currentpage:last-child, .nextpage:last-child {
  border-radius: 0 5px 5px 0;
}

.currentpage:first-child, .nextpage:first-child {
  border-radius: 5px 0 0 5px;
}
  
.nextpage:hover {
  background-color: var(--acclt);
  color: var(--txt) !important;
}

.currentpage:hover {
  background-color: var(--acclt);
  color: var(--btxt) !important;
}

.managers {
  min-width: 70%;
}
  
.userinfo {
  overflow: hidden;
  text-overflow: ellipsis;
}

.name {
  white-space: nowrap;
}
  
.bio {
  font-size: smaller;
}

.crownimg {
  display: grid;
}
  
.crown {
  position: absolute;
  width: 30px;
  margin-top: -21px;
  rotate: -17deg;
  filter: drop-shadow(#0001 0px -5px 5px);
}
  

.popupbg {
  position: absolute;
  background-color: #0005;
  backdrop-filter: blur(1px);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000000' fill-opacity='0.1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
  z-index: 1;
  width: 100%;
  height: 100%;
}

.popup {
  position: fixed;
  background-color: var(--sb);
  margin: 10px;
  justify-self: center;
  align-self: center;
  border-radius: 5px;
  z-index: 1;
  top: 40%;
}

.popupbody {
  display: grid;
  margin: 0 10px;
  align-items: center;
  justify-content: center;
}

.popupbuttons {
  display: flex;
  justify-content: center;
}

.popup button {
  margin: 10px 5px;
}

.popup .button:hover, .popup .button:focus {
  outline: var(--bg) solid 2px;
}

.popup input {
  margin: 10px;
  background-color: var(--bg);
  border: none;
  border-radius: 5px;
  font-family: 'Manrope';
  padding: 10px;
}

.notice {
  background: var(--imp);
  height: fit-content;
  margin-bottom: -30px;
  text-align: center;
  padding: 10px 0;
  border-radius: 0 0 20px 20px;
  box-shadow: #0005 0 0 10px;
  color: var(--btxt);
}

.edited {
  font-style: italic;
  font-size: smaller;
}

html, body {
  color: var(--txt);
  background-color: var(--bg);
  margin: 0;
  font-family: 'Manrope';
  overflow: auto;
  display: flex;
  height: 100vh;
  width: 100vw;
}

h1 {
  font-size: xxx-large;
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
  font-family: 'Manrope';
  background-color: var(--sb);
}

.sidebar {
  min-width: 20%;
  padding: 30px;
  flex-shrink: 0;
  display: grid;
  align-content: center;
  transition: all ease 0.2s;
}

.sidebar h2 {
  font-family: 'Leckerli One';
  color: var(--acc);
  margin: 0 0 0 8px;
}

.hello {
  display: flex;
  align-items: center;
  margin: 0 0 10px 5px;
}

.hello img {
  width: 50px;
  height: 50px;
  border-radius: 100%;
}

.sidebutton {
  display: inline-block;
  background-color: transparent;
  color: var(--txt);
  text-decoration: none;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  text-align: left;
  padding: 5px 15px;
  margin-bottom: 2px;
  transition: padding linear 0.05s;
}

.sidebuttonactive {
  display: inline-block;
  background-color: var(--acc);
  box-shadow: #0008 0 0 10px -5px;
  color: var(--btxt);
  text-decoration: none;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  text-align: left;
  padding: 5px 15px;
  padding-left: 20px;
  margin-bottom: 2px;
}

.sidebutton:hover {
  padding-left: 20px;
  background-color: var(--acclt);
  color: var(--txtstr);
}

.login {
  display: flex;
  background-color: var(--acc);
  color: var(--btxt);
  font-family: inherit;
  font-size: 12px;
  padding: 5px 11px;
  margin-left: 5px;
  align-items: center;
  border-radius: 100px;
  width: fit-content;
  text-decoration: none;
  cursor: pointer;
  border: none;
}

.login .material-symbols-rounded {
  font-size: inherit !important;
  margin-left: 5px;
}

.login:hover {
  outline: var(--bg) solid 2px;
}
  
.credits {
  text-align: center;
  font-family: 'Manrope';
  font-size: 12px;
  margin-top: 30px;
}

.page {
  width: 100%;
  padding: 0 20px 20px 20px;
  display: grid;
  overflow: scroll;
  position: relative;
  justify-items: center;
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
  margin-top: 50px;
  font-family: 'Leckerli One';
  color: var(--acc2);
}

.users {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  background-color: var(--sb);
  margin: 10px;
  border-radius: 5px;
  box-shadow: #0005 0 0 10px -5px;
  overflow: clip;
  transition: scale ease 0.2s;
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
  padding: 20px;
  overflow: hidden;
}

.users span {
  text-overflow: ellipsis;
  overflow: hidden;
}

.usersimg {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 100%;
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
  overflow: hidden;
}

.remove {
  width: 24px;
  display: grid;
  border-radius: 0 0 5px 0;
  align-content: center;
  color: var(--txt);
  padding: 5px;
  overflow: hidden;
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
  row-gap: 5px;
  margin: 5px;
  padding: 5px;
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
  height: fit-content;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  scrollbar-width: none;
  color: var(--txt);
  font-family: 'Manrope';
  background-color: var(--sb);
  box-shadow: #0008 0 0 10px -5px;
}

.post img {
  max-width: 300px;
  border-radius: 5px;
}

.posts {
  display: grid;
  align-content: center;
  width: 100%;
}

.title {
  color: var(--txt);
  font-size: larger;
  padding: 10px;
  display: grid;
}

.title a {
  justify-self: center;
  color: var(--txt) !important;
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
  margin-right: 10px;
  border-radius: 20px;
}

.content {
  padding: 0 10px 30px 10px;
}

.reactions {
  border-top: 1px solid var(--acclt);
  padding: 10px;
  display: flex;
  align-items: center;
}

.reactbutton, .reactbuttonactive {
  position: relative;
  background-color: var(--acclt);
  padding: 8px 10px 10px 10px;
  margin-right: 5px;
  display: inline-block;
  font-size: larger;
  font-weight: bolder;
  text-decoration: none;
  cursor: pointer;
  border-radius: 20px;
}

.reactbutton span, .reactbuttonactive span {
  font-size: small;
}  

.reactbuttonactive {
  color: var(--sb) !important;
  background-color: var(--acc);
  cursor: default;
}

.pages {
  background-color: var(--sb);
  display: flex;
  height: fit-content;
  border-radius: 5px;
}

.reactbutton:hover {
  background-color: var(--acc);
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
  width: fit-content;
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
  margin: 5px 0;
  border-radius: 100px;}

.button:hover, .button:focus, button:hover, button:focus {
  outline: var(--bg) solid 2px;
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
  border: var(--acc) solid 5px;
  border-left: transparent solid 5px;
  border-radius: 100px;
  margin: 10px;
  width: 20px;
  height: 20px;
  animation: rotation 1s linear infinite;
}

.dialog {
  background-color: #0004;
  display: grid;
  top: 0;
    left: 0;
    right:0;
    bottom:0;
  position: absolute;
  align-items: center;
  justify-items: center;
  z-index: 1;
}

.innerdialog {
  position: absolute;
  background-color: var(--sb);
  padding: 10px;
  border-radius: 15px;
  z-index: 2;
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

.block-break {
  height: 48px; 
}

.break {
  display: inline-block;
  width: 40%;
  border-bottom: var(--brkb);
  margin: 15px
}

@keyframes rotation {
  0% {
    rotate: 360deg;
  }
}

@media screen and (max-width: 900px) {
  html, body {
    display: grid;
  }
  .sidebar, .page {
    width: auto;
  }
  .sidebar {
    height: fit-content;
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
  .promptButton {
    padding: 0;
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
  .block-break {
    height: 5px;
  }
}
</style>