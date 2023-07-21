<template>
  <div class="sidebar">
    <h1 v-if="!this.username">hello, welcome to the gaehive website.</h1>
    <h1 v-if="this.username">hello {{ username }}, welcome to the gaehive website.</h1>
    <a class='sidelinks' href="https://scratch.mit.edu/studios/5842709/comments">scratch studio</a>
    <router-link class='sidelinks' to="/">home</router-link>
    <router-link class='sidelinks' to="/hivezine">hivezine</router-link>
    <router-link class='sidelinks' to="/managers">managers</router-link>
    <router-link class='sidelinks' to="/resources">resources</router-link>
    <router-link class='sidelinks' style="cursor: pointer" to="/login" v-if="!this.username">sign in</router-link>
    <a class='sidelinks' style="cursor: pointer" @click="logOut()" v-if="this.username">sign out</a>
    <a class='sidelinks' style="cursor: pointer" @click="changeTheme('dark')" v-if="this.theme !== 'dark'">theme</a>
    <a class='sidelinks' style="cursor: pointer" @click="changeTheme('light')" v-if="this.theme == 'dark'">theme</a>
  </div>
  <router-view />
</template>

<script>
  export default {
    methods: {
      logOut() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("tokenExp")
        window.location.reload()
      },
      loginOK() {
        this.login = null
      },
      changeTheme(theme) {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute('data-theme', localStorage["theme"]);
        this.theme = localStorage["theme"];
      }
    },
    beforeMount() {
      if (localStorage['tokenExp']) {
        const date = new Date();
        if (localStorage['tokenExp'] - date.getDate() < 1)
        {
          localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("tokenExp")
        }
      }
    },
    mounted() {
      if (localStorage['tokenExp']) {
        const date = new Date();
        if (localStorage['tokenExp'] - date.getDate() < 1)
        {
          this.logOut()
        }
      }
      
      document.documentElement.setAttribute('data-theme', localStorage["theme"]);
      this.theme = localStorage["theme"];
      const params = new URLSearchParams(window.location.search);
      const loggedin = params.get("login")
      if (loggedin) {
        this.login = true;
      }

      if (localStorage['user']) {
        this.username = JSON.parse(localStorage['user']).username.toLowerCase()
        this.manager = JSON.parse(localStorage['user']).manager
      }
    },
    data() {
  	  return {
        username: null,
        manager: null,
        login: null,
        theme: null
  	  }
    }
  }

  
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&display=block');
@import url('https://fonts.googleapis.com/css2?family=Vollkorn&display=block');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

:root {
  --bg: #f6b93c;
  --sb: oldlace;
  --acc: #365a35;
  --acc2: #483248;
  --brk: #0006;
  --txt: #444;
  --btxt: white;
  --slnk: #676700;
  --slnkh: #484800;
  --plnk: #573c57;
  --plnkh: #392839;
  --imp: #c94b4b;
}

[data-theme="dark"] {
  --bg: #221f1b;
  --sb: #483232;
  --acc: #FF9900;
  --acc2: #FF9900;
  --brk: #ffb30094;
  --txt: #E7B148;
  --btxt: black;
  --slnk: #F8DE7E;
  --slnkh: #C6B164;
  --plnk: #FF9900;
  --plnkh: #CC7A00;
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
  width: 95%;
  resize: none;
  outline: none;
  overflow: auto;
  padding: 10px;
  border-radius: 20px;
  border: none;
  margin: 5px;
  scrollbar-width: none;
  color: var(--plnk);
  font-family: "Vollkorn";
  background-color: var(--sb);
}

.post {
  resize: none;
  outline: none;
  overflow: auto;
  border-radius: 20px;
  border: none;
  margin: 5px;
  margin-top: 25px;
  scrollbar-width: none;
  color: var(--plnk);
  font-family: "Vollkorn";
  background-color: var(--sb);
}

.posts {
  width: 100%;
}

.title {
  background-color: var(--acc);
  color: var(--btxt);
  font-size: larger;
  border-radius: 20px 20px 0 0;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.pinnedPost {
  display: flex;
  align-items: center;
}

.pinnedPost .post {
    margin-top: 0;
}

.pinnedPost .material-symbols-rounded {
  margin-right: 5px;
  font-size: 20px;
  text-decoration: none;
  font-variation-settings:
  'FILL' 1,
  'wght' 400,
  'GRAD' 200,
  'opsz' 20
}
  
.sidebar {
  background-color: var(--sb);
  padding: 50px;
  width: 25%;
  flex-shrink: 0;
  display: grid;
  justify-content: center;
  align-content: center;
}

.sidebar h1 {
  font-family: "Abril Fatface";
  color: var(--acc);
  border-left: solid 3.5px var(--bg);
  padding-left: 5px;
}

.sidelinks {
  color: var(--slnk);
  text-decoration: underline;
  font-family: 'Vollkorn';
  font-size: 20px;
}

.sidelinks:hover {
  color: var(--slnkh);
}

.credits {
  font-family: 'Vollkorn';
  font-size: 12px;
  margin-top: 30px;
}

.page {
  display: grid;
  width: 75%;
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

.user {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: inherit;
  text-decoration: none;
}

.user p {
  margin: 0px;
}

.user img {  
  border-radius: 50%;
  margin-right: 10px;
}

.currnext .user {
  font-size: 25px;
  font-weight: bold;
}


.nextlist {
  overflow: scroll;
  max-height: 75vh;
  padding-right: 15px;
}

.hostinfo p {
  margin: 0;
}

.status {
  font-size: 20px;
  font-weight: normal;
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
  text-decoration: none;
  cursor: pointer;
  padding: 5px 8px;
  margin: 2px;
  border-radius: 10px;
}

.promptButton#important:hover {
  background-color: var(--imp);
}

.promptButton .material-symbols-rounded {
  color: oldlace;
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
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s ease-in-out infinite;
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
  border-bottom: 4px dotted var(--brk);
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



.users {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  background-color: var(--sb);
  margin: 5px;
  border-radius: 20px;
}

.users:hover {
  outline: var(--acc) solid 2px;
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
  border-radius: 0 20px 20px 0;
  align-content: center;
  color: var(--btxt);
  padding: 5px;
}

.nexthosts {
  margin-top: 25px;
  background-color: var(--sb);
  border-radius: 20px;
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

.list .users {
  background-color: var(--bg)
}

.editList {
  justify-items: center;
  display: grid;
}

.editList a {
  cursor: pointer;
}

@media screen and (max-width: 800px) {
  html, body {
    display: grid;
  }
  .sidebar, .page {
    width: auto;
  }
  .sidebar {
    height: 50vh;
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
    justify-content: center;
  }
  .promptButton {
    padding: 0;
  }
  .username {
    justify-content: center;
  }
}
</style>