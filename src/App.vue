<template>
  <metainfo>
    <template v-slot:title="{ content }"></template>
  </metainfo>
  <div class="sidebar" id="sidebar">
    
    <span class="mobilemenu">Menu</span>

    <div v-if="users" class="birthday">🎂 Happy Birthday <span v-for="(item, index) in users" :key="item"><a :href="'https://scratch.mit.edu/users/' + item" target="_blank">{{ item.name }}</a><span v-if="users.length > 2 && index !== users.length - 1">, </span><span v-if="users.length > 1 && index == users.length - 2"> & </span></span>!</div>
        
    <div class="hello">
      <img v-if="username" :src="'https://uploads.scratch.mit.edu/get_image/user/' + id + '_500x500.png'">
      <img v-if="!username" src="/favicon.ico">
      <h5 v-if="username">Hello{{ mellie }},<br>{{ username }}</h5>
      <h5 v-if="!username">Hello! 🐝</h5>
      <sub class="status">{{ this.status }}</sub>
    </div>

    <div class="sidelinks">
      <a class='sidebutton' href="https://scratch.mit.edu/studios/5842709/comments" target="_blank">Scratch Studio</a>

      <router-link v-if="location !== '' || active" class='sidebutton' to="/">About</router-link>
      <router-link v-if="location == '' && !active" class='sidebuttonactive' to="/">About</router-link>

      <router-link v-if="location !== 'hivezine' || active" class='sidebutton' to="/hivezine">Hivezine</router-link>
      <router-link v-if="location == 'hivezine' && !active" class='sidebuttonactive' to="/hivezine">Hivezine</router-link>

      <router-link v-if="location !== 'managers' || active" class='sidebutton' to="/managers">Managers</router-link>
      <router-link v-if="location == 'managers' && !active" class='sidebuttonactive' to="/managers">Managers</router-link>

      <router-link  v-if="location !== 'bandwagon' || active" class='sidebutton' to="/bandwagon">Daily Bandwagon</router-link>
      <router-link v-if="location == 'bandwagon' && !active" class='sidebuttonactive' to="/bandwagon">Daily Bandwagon</router-link>

      <router-link  v-if="location !== 'euphoria' || active" class='sidebutton' to="/euphoria">Euphoria Machine</router-link>
      <router-link v-if="location == 'euphoria' && !active" class='sidebuttonactive' to="/euphoria">Euphoria Machine</router-link>

      <router-link  v-if="location !== 'birthdays' || active" class='sidebutton' to="/birthdays">Birthdays</router-link>
      <router-link v-if="location == 'birthdays' && !active" class='sidebuttonactive' to="/birthdays">Birthdays</router-link>

      <router-link v-if="location !== 'resources' || active" class='sidebutton' to="/resources">Resources</router-link>
      <router-link v-if="location == 'resources' && !active" class='sidebuttonactive' to="/resources">Resources</router-link>

      <router-link v-if="location !== 'docs' || active" class='sidebutton' to="/docs">Docs</router-link>
      <router-link v-if="location == 'docs' && !active" class='sidebuttonactive' to="/docs">Docs</router-link>

      <a class="sidebutton" href="https://scratch.mit.edu/studios/33687618/comments" target="_blank">Feedback</a>
    </div>

    <div class="loginSettingsBox">
      <button class="login" @click="this.popup = 'settings'" @keydown.enter="this.popup = 'settings'">Settings <div class="material-symbols-rounded">settings</div></button>
      <button class='login' @click="logIn()" v-if="!this.username">Sign in <div class="material-symbols-rounded">login</div></button>
      <button class='login' @click="logOut()" v-if="this.username">Sign out <div class="material-symbols-rounded">logout</div></button>
    </div>
  </div>
  <div class="page">

  <!--popups-->
  <TransitionGroup name="popup">
  <div v-if="popup" class="popupbg" :style="{ backdropFilter: blur }"></div>

  <!--settings-->
  <div v-if="popup == 'settings'" class="popup">
    <div class="title">Settings</div>
    <div class="popupbody">
      Change website settings.
      <div>
        <button @click="changeTheme('dark')" @click.right.prevent="changeTheme('2000s-blog')" v-if="theme == 'light' || theme == null">Theme<div class="space"></div><div class="material-symbols-rounded">palette</div></button>
        <button @click="changeTheme('light')" @click.right.prevent="changeTheme('2000s-blog')" v-if="theme !== 'light' && theme">Theme<div class="space"></div><div class="material-symbols-rounded">palette</div></button>
      
        <button @click="setBlur(0)" v-if="blur == 'blur(1px)'">Blur<div class="space"></div><div class="material-symbols-rounded">blur_on</div></button>
        <button @click="setBlur(1)" v-if="blur !== 'blur(1px)'">Blur<div class="space"></div><div class="material-symbols-rounded">blur_on</div></button>

        <button @click="changeTheme('high-contrast')" v-if="theme !== 'high-contrast'">High Contrast<div class="space"></div><div class="material-symbols-rounded">contrast</div></button>
        <button @click="changeTheme('light')" v-if="theme == 'high-contrast'">High Contrast<div class="space"></div><div class="material-symbols-rounded">contrast</div></button>
      </div>
        <div class="popupbuttons">
          <button @click="this.popup = null" class="button">Close</button>
      </div>
    </div>
  </div>
    
  <!--scratchdb offline-->
  <div v-if="popup == 'scratchdb'" class="popup">
    <div class="title">ScratchDB is offline!</div>
    <div class="popupbody">
      The following website features are currently unavailable:
      <ul>
        <li>Website Sign in</li>
        <li>Adding new Managers</li>
        <li>Adding new Writers</li>
        <li>Adding new Birthdays</li>
      </ul>
      <div class="popupbuttons">
        <button @click="this.popup = null" class="button">OK</button>
      </div>
    </div>
  </div>

  <!--session expired-->
  <div v-if="popup == 'expired'" class="popup">
    <div class="title">Session Expired</div>
    <div class="popupbody">
      You've been logged out. Would you like to log back in?
      <div class="popupbuttons">
        <button @click="logIn()" class="button">Yes</button>
        <button @click="this.popup = null" class="button">No</button>
      </div>
    </div>
  </div>
  </TransitionGroup>
  <!--popups-->
  <router-view />
  </div>
  
</template>

<script>
  import { users, getBirthdays } from '@/lib/birthdays.js'
  import { useMeta } from 'vue-meta'
  export default {
    methods: {
      logIn() {
        window.location = 'https://auth.itinerary.eu.org/auth/?redirect=' +
      btoa('https://' + location.hostname + '/api/login?return=' + location.pathname + "&") +
      '&name=the Gaehive&authProject=867214083'
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
      setBlur(set) {
        this.blur = "blur(" + set + "px)"
        localStorage.setItem("blur", set);
      },
      color() {
       document.querySelector(":root").style.setProperty("--acc", document.getElementById("color").value)
        document.querySelector(":root").style.setProperty("--btxt", document.getElementById("buttoncolor").value)
      },
    },

    watch:{
      $route (to, from){
        this.location = window.location.pathname.split('/')[1];
      }
    }, 
    
    created() {
      if (!document.cookie && localStorage["user"]) {
        this.popup = "expired"
        localStorage.removeItem("user")
      }
      if (window.location.search.slice(1,5) == "user") {
        localStorage.setItem("user", atob(decodeURIComponent(window.location.search.slice(6))))
        this.$router.push({ path: location.pathname, query: null })
      }
      if (localStorage["blur"] == 0) {
        this.blur = "blur(0)"
      }
      
      getBirthdays()
    },
    
    async mounted() {
      this.theme = localStorage["theme"];

      if (localStorage['user']) {
        this.username = JSON.parse(localStorage['user']).username
        this.id = JSON.parse(localStorage['user']).id
        
        if (JSON.parse(localStorage['user']).admin == true) {
          this.status = "Admin"
        } else if (JSON.parse(localStorage['user']).manager == true) {
          this.status = "Manager"  
        } else if (JSON.parse(localStorage['user']).writer == true) {
          this.status = "Writer"
        } else {
          this.status = "User"
        }
      }
      
      if (this.username == "melody-sy") {
        this.mellie = "sy"
      }

      if (localStorage["animation"] == 0) {
        this.animation = 0
      }
      
      try {
        const userinfo = await fetch('https://scratchdb.lefty.one/v3/user/info/LegoManiac04', {
          signal: AbortSignal.timeout(5000)
        });
      } catch(error) {
        this.popup = "scratchdb"
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
        popup: null,
        blur: "blur(1px)",
        animation: null,
        users: users,
        status: null
  	  }
    }
  }
</script>

<style>
  /* Themes */
  
  :root {
    --bg: #f6b93c;
    --sb: #ffe098;
    --acc: #e58c3f;
    --acc2: #483248;
    --acclt: #d18d6a66;
    --brk: #0006;
    --txt: #473241;
    --txtstr: #000;
    --btxt: #fee5a1;
    --plnk: #732e6e;
    --plnkh: #4c1e47;
    --imp: #d22727;
  }

  [data-theme="dark"] {
    --bg: #231b25;
    --sb: #0a0e0c;
    --acc: #e7a933;
    --acc2: #fff;
    --acclt: #55433966;
    --brk: #ffb30094;
    --txt: #da981a;
    --txtstr: #fff;
    --btxt: #483332;
    --plnk: #FF9900;
    --plnkh: #fcfcfc;
    --imp: #d22727;
  }

  [data-theme="high-contrast"] {
    --bg: #fff;
    --sb: #ffba00;
    --acc: #000;
    --acc2: #000;
    --acclt: #fff6;
    --brk: #000;
    --txt: #000;
    --txtstr: #000;
    --btxt: #fff;
    --plnk: #0010ff;
    --plnkh: #f00;
    --imp: #f00;
  }
  [data-theme="high-contrast"] .greeting {
    text-shadow: none;
  }
  [data-theme="high-contrast"] .sidebutton:hover, [data-theme="high-contrast"] button:hover, [data-theme="high-contrast"] .button:hover, [data-theme="high-contrast"] button:focus, [data-theme="high-contrast"] .tools:hover {
   outline: 3px solid black !important;
  }
  [data-theme="high-contrast"] ul .tools:hover {
    background-color: white;
    color: black !important;
  }
  [data-theme="high-contrast"] .nextpage:hover {
    background-color: black;
    color: white !important;
  }

  [data-theme="2000s-blog"] {
    --bg: #1a009d;
    --sb: #07002a;
    --acc: magenta;
    --acc2: yellow;
    --acclt: darkcyan;
    --brk: magenta;
    --txt: lime;
    --btxt: white;
    --slnk: blue;
    --slnkh: blue;
    --plnk: magenta;
    --plnkh: yellow;
    --imp: red;
  }
  

    /* Transitions */
  
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

  .bday-enter-active,
  .bday-leave-active{
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }
  .bday-enter-from,
  .bday-leave-to {
    transform: scale(110%) rotateX(-90deg);
    opacity: 0;
  }
  .bday-leave-active {
    position: absolute;
    width: calc(100% - 10px);
  }
  

  /* Page */
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

  textarea {
    resize: none;
    outline: none;
    overflow: auto;
    border: none;
    border-radius: inherit;
    margin-top: 0;
    color: var(--txt);
    font-family: 'Manrope';
    background-color: var(--sb);
  }

  .centerpage {
    display: grid;
    align-items: center;
    height: calc(100vh - 20px);
    justify-items: center;
    width: 100%;
  }

  .page {
    width: 100%;
    padding: 0 50px 50px 50px;
    display: grid;
    overflow: scroll;
    justify-items: center;
    align-content: baseline;
    position: relative;
  }

  .page h1 {
    color: var(--acc2)
  }

  a:not(.button, .sidebar *) {
    color: var(--plnk);
  }

  a:not(.button, .sidebar *):hover {
    color: var(--plnkh);
  }

  .greeting {
    margin-top: 30px;
    margin-bottom: 5px;
    font-family: 'Agbalumo';
    color: var(--acc2);
    text-shadow: var(--acc) 2px 2px;
  }

  .space {
    width: 5px;
  }

  .block-break {
    height: 48px; 
  }

  .break {
    display: inline-block;
    width: 40%;
    height: 2px;
    background-color: var(--acc);
    border-radius: 5px;
    margin: 15px
  }

  .credits {
    text-align: center;
    font-family: 'Manrope';
    font-size: 12px;
    margin-top: 30px;
  }

  .poweredby {
    margin: 2px;
    width: 35px;
    height: 35px;
  }

  input {
    background-color: var(--sb);
    color: var(--plnk);
    margin: 2px;
    padding: 5px;
    border: none;
    border-radius: 5px;
    font-family: inherit;
    text-align: center;
  }

  .headerButtons {
    margin-bottom: 5px;
  }

  .buttonarea {
    display: flex;
  }

  .button, button {
    width: fit-content;
    display: inline-flex;
    align-items: center;
    background-color: var(--acc);
    color: var(--btxt);
    text-decoration: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    text-align: left;
    padding: 5px 15px;
    margin: 5px 3px;
    border-radius: 10px;
  }

  button .material-symbols-rounded {
    font-size: inherit !important;
  }

  .button:hover, .button:focus, button:hover, .clearbutton:hover, button:focus {
    outline: var(--acclt) solid 2px;
  }

  .promptButton {
    display: flex;
    position: relative;
    width: 24px;
    text-decoration: none !important;
    cursor: pointer;
    padding: 5px 8px;
    margin: 2px;
    border-radius: 10px;
  }

  .promptButton#important:hover {
    background-color: var(--imp);
  }

  .promptButton#important:hover .material-symbols-rounded {
    color: var(--btxt);
  }

  .promptButton .material-symbols-rounded {
    color: var(--txt);
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
    background-color: var(--acc);
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

  .promptButton .tooltiptextleft {
    width: max-content;
    visibility: hidden;
    background-color: var(--acc);
    color: var(--btxt);
    text-align: center;
    padding: 5px 10px;
    border-radius: 6px;
    position: absolute;
    align-self: center;
    z-index: 1;
    left: 115%;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .reactbutton .tooltiptexttop, .reactbuttonactive .tooltiptexttop {
    font-size: small;
    font-weight: normal;
    text-shadow: none;
    cursor: initial;
    width: max-content;
    visibility: hidden;
    background-color: var(--acc);
    color: var(--btxt);
    text-align: center;
    padding: 5px 10px;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    bottom: 115%;
    left: 0;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltiptexttop p {
    margin: 0;
  }

  .promptButton:hover .tooltiptext, .promptButton:hover .tooltiptextleft, .reactbutton:hover .tooltiptexttop, .reactbuttonactive:hover .tooltiptexttop {
    visibility: visible;
    opacity: 1;
  }

  .loader {
    height: 20px;
    border: var(--acclt) solid 3px;
    aspect-ratio: 1;
    border-radius: 50%;
    border-bottom: transparent solid 3px;
    animation: rotate 1s infinite;
    margin: 6px;
    align-self: center;
    display: inline-flex;
  }

  
  /* Sidebar */
  
  .sidebar {
    background-color: var(--sb);
    padding: 50px;
    border-radius: 0 20px 20px 0;
    display: grid;
    justify-content: center;
    align-content: space-around;
    overflow: clip;
    transition: all ease 0.1s;
  }

  .sidebar h2 {
    font-family: 'Agbalumo';
    font-size: larger;
    line-height: 22px;
    color: var(--acc2);
    margin: 0 0 0 8px;
    text-shadow: var(--acclt) 1.5px 1.5px;
  }

  .mobilemenu {
    display: none;
  }

  .hello {
    display: grid;
    align-content: center;
    justify-items: center;
  }

  .hello h5 {
    margin: 0;
    color: var(--acc2);
    font-family: agbalumo;
    text-align: center;
    line-height: 20px;
    font-size: 20px;
  }

  .hello img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: var(--sb) solid 6px;
    outline: var(--acc) solid 3px;
    margin: 10px;
  }

  .status {
    margin-bottom: -15px;
    color: var(--acc2);
    font-weight: bold;
  }

  .sidelinks {
    display: grid;
  }

  .sidebutton {
    display: inline-block;
    background-color: transparent;
    color: var(--txt);
    text-decoration: none;
    border: none;
    border-radius: 10px 0 0 10px;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    text-align: left;
    padding: 5px 15px;
    padding-right: 50px;
    margin-right: -50px;
    transition: all ease 0.05s;
    white-space: nowrap;
  }

  .sidebuttonactive {
    display: inline-block;
    background-color: var(--bg);
    color: var(--txt);
    font-weight: bold;
    text-decoration: none;
    border: none;
    border-radius: 10px 0 0 10px;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    text-align: left;
    padding: 5px 15px;
    padding-left: 20px;
    margin-right: -50px;
    position: relative;
  }

  .sidebutton:hover {
    padding-left: 20px;
    padding-right: 45px;
    background-color: var(--acclt);
    color: var(--txtstr);
  }

  .sidebuttonactive::before,
  .sidebuttonactive::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    animation: blobin ease 0.1s;
    right: -10px;
  }
  .sidebuttonactive::before {
    bottom: 19.5px;
    border-bottom: 10px solid var(--bg);
    border-right: 10px solid var(--bg);
    border-bottom-right-radius: 20px;
  }
  .sidebuttonactive::after {
    top: 19.5px;
    border-top: 10px solid var(--bg);
    border-right: 10px solid var(--bg);
    border-top-right-radius: 20px;
  }

  .loginSettingsBox{
    display: flex;
    justify-content: center;
  }

  .login {
    display: flex;
    background-color: var(--acc);
    color: var(--btxt);
    font-family: inherit;
    font-size: 10px;
    padding: 5px 11px;
    margin: 2px;
    align-items: center;
    border-radius: 10px;
    width: fit-content;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    border: none;
  }

  .login .material-symbols-rounded {
    width: 10px;
    overflow: clip;
    font-size: inherit !important;
    margin-left: 5px;
    margin-bottom: -1.7px;
  }

  .login:hover {
    outline: var(--bg) solid 2px;
  }

  .birthday {
    font-size: x-small;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
  }

  .birthday a {
    color: var(--acc2);
    text-decoration: none;
  }


  /* Popups */

  .popupbg {
    position: fixed;
    background-color: #0005;
    backdrop-filter: blur(1px);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000000' fill-opacity='0.1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .popup {
    position: fixed;
    background-color: var(--txt);
    color: var(--sb);
    box-shadow: #0005 0 0 50px;
    padding: 10px;
    margin: 10px;
    justify-self: center;
    align-self: center;
    border-radius: 20px;
    z-index: 1;
  }

  .popup .title {
    color: var(--sb);
    font-weight: bold;
  }

  .popupbody {
    margin: 0 10px;
    align-items: center;
    justify-content: center;
  }

  .popupbuttons {
    display: flex;
    justify-content: center;
  }

  .popupbuttons button {
    width: 100%;
    justify-content: center;
  }

  .popup button {
    margin: 10px 5px;
    background-color: var(--bg);
    color: var(--txt);
  }

  .popup input {
    margin: 10px;
    background-color: var(--bg);
    border: none;
    border-radius: 5px;
    font-family: 'Manrope';
    padding: 10px;
  }


  /* Hivezine */

  .json {
    background-color: var(--acclt);
    font-family: monospace;
    margin: 20px 10px;
    padding: 5px;
    border-radius: 5px;
    white-space: break-spaces;
    line-break: anywhere;
  }

  .post {
    display: grid;
    position: relative;
    height: fit-content;
    border-radius: 0 10px 10px 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    scrollbar-width: none;
    color: var(--txt);
    font-family: 'Manrope';
    background-color: var(--sb);
  }

  .post::before {
    position: absolute;
    left: -10px;
    border-radius: 3px 0 0 100%;
    background-color: var(--sb);
    width: 17px;
    height: 20px;
    content: "";
  }

  .post img, .post video {
    max-width: 300px;
    border-radius: 5px;
  }

  iframe {
    width: 100%;
  }

  .posts {
    display: grid;
    align-content: center;
    width: 100%;
  }

  .title {
    color: var(--txt);
    padding: 10px;
    display: grid;
  }

  .title a, .titlename {
    color: var(--txt);
    text-decoration: none;
    text-align: center;
    padding: 0;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .titlename {
    font-family: Agbalumo;
    font-size: larger;
    color: var(--acc2) !important;
    text-shadow: var(--acclt) 1.5px 1.5px;
  }

  .title textarea {
    width: 100%;
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
    padding: 0 10px 15px 10px;
  }

  .content textarea {
    width: 100%;
    height: 100%;
  }

  .styledcontent {
    height: 300px;
    padding: 2px 2px 3px 2px;
    overflow: scroll;
  }

  .reactions {
    border-top: 1px solid var(--acclt);
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .reactbutton, .reactbuttonactive {
    position: relative;
    padding: 2px 5px 5px 5px;
    margin-right: 5px;
    display: inline-block;
    font-size: x-large;
    font-weight: bolder;
    text-decoration: none;
    text-shadow: #0005 0 1px 2px;
    cursor: pointer;
    border-radius: 5px;
  }

  .reactbutton span, .reactbuttonactive span {
    font-size: medium;
  }  

  .reactbuttonactive {
    color: var(--btxt) !important;
    background-color: var(--acc);
  }

  .postoptions {
    display: flex;
  }

  .noposts {
    display: flex;
    justify-self: center;
    align-items: center;
    justify-content: center;
    background-color: var(--sb);
    border: 2px solid var(--acc);
    padding: 5px 40px;
    margin: 20px;
    border-radius: 10px;
  }

  .pages {
    background-color: var(--sb);
    display: flex;
    height: fit-content;
    border-radius: 10px;
  }

  #type, #type summary {
    background-color: var(--sb);
    color: var(--txt);
    margin: 0;
    border-radius: 0 10px 10px 0;
  }

  .searchButton {
    background-color: var(--sb);
    color: var(--txt) !important;
    padding: 5px;
    font-size: large;
    border-radius: 0;
    margin: 0;
    outline: none !important;
  }

  .searchButton:hover {
    outline: none;
  }

  .clearbutton {
    background-color: var(--sb);
    color: var(--acc2) !important;
    outline: none;
    font-size: small;
    border-radius: 10px;
    margin: 0;
  }

  .search {
    margin: 0;
    outline: none;
    color: var(--txt);
    font-weight: bold;
    border-radius: 10px 0 0 10px;
  }

  .reactbutton:hover {
    background-color: var(--acc);
    color: var(--btxt) !important;
  }

  .pagesearch {
    display: flex;
    height: fit-content;
  }

  .toolbar {
    display: flex;
    margin: 0 10px;
  }

  .tools {
    background-color: var(--acc);
    border: none;
    color: var(--btxt);
    border-radius: 10px;
    margin: 2px;
    padding: 0 15px;
    display: grid;
    place-items: center;
    left: 0;
    position: relative;
  }

  .tools details {
      position: relative;
      width: 300px;
      margin-right: 1rem;
    }

  .tools details[open] {
      z-index: 1;
    }

  .tools summary {
      cursor: pointer;
    font-size: smaller;
      border-radius: 10px;
      background-color: var(--acc);
      list-style: none;
    height: 100%;
    align-items: center;
    display: flex;
    }

  .tools summary::-webkit-details-marker {
      display: none;
    }

  .tools details[open] summary:before {
      content: '';
      display: block;
      width: 100vw;
      height: 100vh;
      background: transparent;
      position: fixed;
      top: 0;
      left: 0;
    }

  .tools summary:after {
      content: '';
      display: inline-block;
    margin: 5px 0px 10px 5px;
      width: .5rem;
      height: .5rem;
      border-bottom: 2px solid currentColor;
      border-left: 2px solid currentColor;
      border-bottom-left-radius: 2px;
      transform: rotate(45deg) translate(50%, 0%);
      transform-origin: center center;
      transition: transform ease-in-out 100ms
    }

  .tools summary:focus {
      outline: none;
    }

  details[open] summary:after {
      transform: rotate(-45deg) translate(0%, 0%);
    }

  .tools ul {
    width: auto;
    background: var(--acc);
    position: absolute;
    z-index: 1;
    left: 0;
    box-sizing: border-box;
    border-radius: 10px;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 5px;
  }

  .toolbar .tools:hover {
    outline: var(--acclt) solid 2px;
  }

  .toolsselect {
    background-color: var(--sb);
    width: 100%;
    border: none;
    color: var(--txt) !important;
    border-radius: 10px;
    margin: 2px;
    padding: 0 15px;
    display: grid;
    place-items: center;
    position: relative;
  }

  ul .tools {
    width: 100%;
  }

  ul .tools:hover {
    background-color: var(--sb);
    color: var(--txt);
  }

  .tools .material-symbols-rounded {
    font-size: inherit;
    width: 16px;
    overflow: clip;
  }

  .list {
    display: grid;
    padding: 5px;
    align-items: center;
  }

  .currentpage, .nextpage {
    padding: 10px 5px;
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
    border-radius: 0 10px 10px 0;
  }

  .currentpage:first-child, .nextpage:first-child {
    border-radius: 10px 0 0 10px;
  }

  .nextpage:hover {
    background-color: var(--acclt);
    color: var(--txt) !important;
  }

  .currentpage:hover {
    background-color: var(--acclt);
    color: var(--btxt) !important;
  }

  .edited {
    font-style: italic;
    font-size: smaller;
  }


  /* Managers */

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

  .users {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    background-color: var(--sb);
    margin: 10px;
    border-radius: 10px;
    overflow: clip;
    transition: scale ease 0.2s;
  }

  .users:hover {
    outline: 3px solid var(--acclt);
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
    white-space: nowrap;
  }

  .usersimg {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 100%;
  }

  .useroptions {
    display: flex;
    align-items: center;
    margin-right: 5px;
  }

  .promote {
    width: 24px;
    display: grid;
    border-radius: 5px;
    align-content: center;
    color: var(--txt);
    padding: 5px;
    overflow: hidden;
  }

  .remove {
    width: 24px;
    display: grid;
    border-radius: 5px;
    align-content: center;
    color: var(--txt);
    padding: 5px;
    overflow: hidden;
  }

  .remove:hover {
    background-color: var(--imp);
    color: var(--sb);
  }

  .promote:hover {
    background-color: var(--acc);
    color: var(--sb);
  }

  
  /* Birthdays */
  .jumpToContainer {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    text-align: center;
    background-color: var(--sb);
    border-radius: 10px;
    padding: 10px;
  }
  
  .jumpToMonth {
    margin: 2px;
    padding: 3px;
    font-size: smaller;
    cursor: pointer;
    border-radius: 10px;
    text-decoration: none;
  }

  .jumpToMonth:hover {
    outline: 2px solid var(--acclt);
  }
  
  .birthdays {
    display: flex;
    overflow: scroll;
    padding: 5px 0 0 0;
  }

  .birthdate {
    font-family: Agbalumo;
    font-size: larger;
    color: var(--acc2) !important;
    text-shadow: var(--acclt) 1.5px 1.5px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--acclt);
    width: 100%;
  }

  .months {
    position: relative;
    width: 70%
  }

  .birthdayRow {
    margin-bottom: 20px;
    justify-content: center;
    text-align: center;
    display: grid;
    background-color: var(--sb);
    padding: 5px;
    border-radius: 10px;
  }

  .birthdayUsers {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    background-color: var(--bg);
    margin: 5px;
    border-radius: 10px;
    overflow: clip;
    transition: scale ease 0.2s;
  }

  .birthdayUsers a {
    width: 100%;
    color: var(--txt);
    text-decoration: none;
    align-items: center;
    padding: 10px;
    overflow: hidden;
  }

  .birthdayUsers:hover {
    outline: 3px solid var(--acclt);
    scale: 1.01;
  }

  .birthdayUsers a {
    color: var(--txt);
    text-decoration: none;
    display: flex;
    padding: 20px;
  }

  .birthdayUsers span {
    white-space: nowrap;
  }
  

  /* Mobile CSS */
  @media screen and (max-width: 800px) {
    .toolbar {
      display: none;
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes blobin {
    from {
      right: -20px;
    }
    to {
      right: -10px;
    }
  }

  @media screen and (max-width: 900px) {
    .page {
      overflow: initial;
      transition: none;
      padding: 10px 20px 10px 50px;
    }
    .greeting {
      font-size: xx-large;
    }
    .sidebar {
      width: 30px;
      padding: 0;
      height: 100vh;
      margin: 0;
      overflow: clip;
      position: absolute;
      text-align: center;
      justify-items: center;
      z-index: 2;
    }
    .sidebar h2 {
      font-size: medium;
    }
    .sidebar div, .sidebar a, .sidebar button {
      visibility: hidden;
      transition: visibility 0s ease;
      transition-delay: 0.01s;
    }
    .sidebar:hover div, .sidebar:hover a, .sidebar:hover button {
      visibility: initial;
    }
    .sidebutton, .sidebuttonactive {
      margin: 0;
      border-radius: 10px;
      padding: 5px 15px;
    }
    .sidebuttonactive::before, .sidebuttonactive::after {
      border: none;
    }
    .sidebutton:hover {
      margin: 0;
      padding: 5px 15px;
    }
    .sidebar:hover .mobilemenu {
      justify-self: left;
    }
    .sidebar:hover {
      width: initial;
      padding: 0 60px;
      box-shadow: #0005 0 0 20px;
    }
    .birthday {
      padding: 10px;
      height: 50px;
    }
    .hello {
      display: block;
    }
    .loginSettingsBox {
      display: grid;
    }
    .login {
      margin-left: 0;
    }
    .mobilemenu {
      display: block;
      visibility: visible;
      position: absolute;
      rotate: -90deg;
      align-self: center;
      left: -5px;
    }
    .popup {
      margin: 40px;
      position: fixed;
      z-index: 2;
    }
    .promptButton {
      padding: 5px 10px;
      border-radius: 5px;
      margin: 5px 2px;
    }
    .promptButton .material-symbols-rounded {
      color: var(--txtstr);
    }
    .users a {
      white-space: unset;
    }
    .reactions {
      display: grid;
      justify-items: center;
      justify-content: center;
    }
    .reactbutton, .reactbuttonactive {
      margin: 1px;
      padding: 1px;
    }
    .reactbutton span, .reactbuttonactive span {
      display: none;
    }
    .post img {
      max-width: 200px;
    }
    .pagesearch {
      display: grid;
    }
    .pages {
      justify-self: center;
      margin-bottom: 2px;
      overflow: scroll;
      width: 100%;
    }
    .currentpage, .nextpage {
      padding: 12px;
    }
    .search {
      width: 100%;
      padding: 15px;
    }
    .users span {
      white-space: break-spaces;
    }
    .jumpToContainer {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>