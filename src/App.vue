<template>
  <div class="sidebar">
    <h1 v-if="!id">hello, welcome to the gaehive website.</h1>
    <h1 v-if="id">hello {{ username }}, welcome to the gaehive website.</h1>
    <a class='sidelinks' href="https://scratch.mit.edu/studios/5842709/comments">scratch studio</a>
    <router-link class='sidelinks' to="/">home</router-link>
    <router-link class='sidelinks' to="/bulletin">bulletin</router-link>
    <router-link class='sidelinks' to="/host-queue">host queue</router-link>
    <router-link class='sidelinks' to="/resources">resources</router-link>
    <a class='sidelinks' style="cursor: pointer" href="https://auth2.jupitersleo.repl.co/login" v-if="!this.id">sign in</a>
    <a class='sidelinks' style="cursor: pointer" @click="logOut()" v-if="this.id">sign out</a>
  </div>
  <router-view />
</template>

<script>
  export default {
    methods: {
      logOut() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        location.href = "/"
      },
      loginOK() {
        this.login = null
      }
    },
    mounted() {
      const params = new URLSearchParams(window.location.search);
      const loggedin = params.get("login")
      if (loggedin) {
        this.login = true;
      }

      if (localStorage['user']) {
        this.id = JSON.parse(localStorage['user']).id
        this.username = JSON.parse(localStorage['user']).username.toLowerCase()
        this.manager = JSON.parse(localStorage['user']).manager
      }
    },
    data() {
  	  return {
        id: null,
        username: null,
        manager: null,
        login: null
  	  }
    }
  }

  
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&display=block');
@import url('https://fonts.googleapis.com/css2?family=Vollkorn&display=block');

html, body {
  background-color: #f6b93c;
  margin: 0;
  color: #365a35;
  font-family: "Abril Fatface";
  display: flex;
  height: 100vh;
  width: 100vw;
}

h1 {
  border-left: solid 3.5px #f6b93c;
  padding-left: 5px;
}

a {
  color: olive;
  text-decoration: underline;
}

a:hover {
  color: darkolivegreen;
}

textarea {
  width: 100%;
  resize: none;
  outline: none;
  border-radius: 20px;
  border: none;
  padding: 10px;
  margin: 3px;
  scrollbar-width: none;
  background-color: #fcfcfc;
}

.sidebar {
  background-color: oldlace;
  padding: 50px;
  width: 25%;
  flex-shrink: 0;
  display: grid;
  justify-content: center;
  align-content: center;
}

.sidelinks {
  font-family: 'Vollkorn';
  font-size: 20px;
}

.credits {
  font-family: 'Vollkorn';
  font-size: 12px;
  color: #a98030;
  margin-top: 30px;
}

.credits a {
  color: #a98030;
}

.page {
  width: 75%;
  overflow: scroll;
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
  color: var(--bgc);
}
  
.queue {
  color: #444;
  font-family: 'Vollkorn';
  border-radius: 1px 1px 5px 5px;
  display: grid;
  justify-items: center;
  align-items: center;
  margin: 20px;
}

.greeting {
  font-family: 'Abril Fatface';
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
  
.loader {
  width: 48px;
  height: 48px;
  border: solid 7px #365a35;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s ease-in-out infinite;
}

.break {
  width: 40%;
  border-bottom: 4px dotted #0006 ;
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
    height: 50vh;
  }
  .page {
    overflow: initial;
  }
}
</style>