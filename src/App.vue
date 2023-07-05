<template>
  <div class="sidebar">
    <h1 v-if="!id">hello, welcome to the gaehive website.</h1>
    <h1 v-if="id">hello {{ username }}, welcome to the gaehive website.</h1>
    <a class='sidelinks' href="https://scratch.mit.edu/studios/5842709/comments">scratch studio</a>
    <router-link class='sidelinks' to="/">home</router-link>
    <router-link class='sidelinks' to="/hivezine">hivezine</router-link>
    <router-link class='sidelinks' to="/host-queue">host queue</router-link>
    <router-link class='sidelinks' to="/resources">resources</router-link>
    <a class='sidelinks' style="cursor: pointer" href="https://gaehivecloset.fizzyizzy.repl.co/login" v-if="!this.id">sign in</a>
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
  font-family: "Abril Fatface";
  display: flex;
  height: 100vh;
  width: 100vw;
}

h1 {
  color: #365a35;
  border-left: solid 3.5px #f6b93c;
  padding-left: 5px;
}

a {
  color: #676700;
  text-decoration: underline;
}

a:hover {
  color: #484800;
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
  margin-top: 30px;
}

.page {
  display: grid;
  width: 75%;
  overflow: scroll;
}

.page h1 {
  color: #483248
}
  
.page a {
  color: #573c57;
}

.page a:hover {
  color: #392839;
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
  color: #444;
  font-family: 'Vollkorn';
  display: grid;
  justify-items: center;
  align-items: center;
  margin: 20px;
}

.greeting {
  font-family: 'Abril Fatface';
  color: #483248;
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
  background-color: #f6b93c;
  color: #573c57;
  padding: 5px;
  border: none;
  border-radius: 20px;
  font-family: inherit;
  text-align: center;
}

.button {
  display: inline-block;
  background-color: #365a35;
  color: white;
  cursor: pointer;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  margin: 2px;
  margin-top: 5px;
  border-radius: 10px;
}
  
.loader {
  width: 48px;
  height: 48px;
  border: solid 7px #365a35;
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