<template>
  <div class="page" id="page">
  <div id="hostqueue" class="container">
  <div class="queue">
  <div v-show="username && manager == 'true'" class="queue" id="manage-area">
  <div class="manage" id="manage">
  <h2 class="greeting">Manage</h2>
  <input id="username" class="input" placeholder="username"><input id="position" class="input" placeholder="position">
    <div>
      <span @click="moveManagers()" id="add" class="button">Edit</span>
      <span @click="nextHost()" id="add" class="button">Next Host</span>
    </div>
    <div class="break"></div>
    <div>
      <span @click="addManagers()" id="add" class="button">Add</span>
      <span @click="removeManagers()" id="remove" class="button">Remove</span>
    </div>
    <div v-if="request == 'sending'" class="loader"></div>
    <div v-if="request == null" class="loader-placehold"></div>
    <div v-if="request == 'unauthorized'">
      <h4>Uh oh!</h4>
      <span>Looks like this user doesn't exist, or you don't have permission to do that.</span>
    </div>
  </div>
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
        manager: null
      }
    },
    async mounted() {
      this.username = JSON.parse(localStorage['user']).username.toLowerCase()
      this.manager = JSON.parse(localStorage['user']).manager
    },
    methods: {
      async addManagers() { 
        this.request = 'sending';
        let useradd = document.getElementById("username").value;

   fetch(`https://gaehivecloset.fizzyizzy.repl.co/db/managers/add`, {
          headers: {
            "Content-Type": "application/json"
          },
          method: "PUT",
          body: JSON.stringify({
            username: document.getElementById("username").value,
            token: localStorage['token']
          })
        })
        .then(res => res.json())
        .then((res) => {
          if (res.ok) {
            location.href = "/managers"
          }
          if (res.error) {
            this.request = "unauthorized"
          }
        })
      },
      async removeManagers() {
        this.request = 'sending';
        let username = document.getElementById("username").value;

        fetch(`https://gaehivecloset.fizzyizzy.repl.co/db/managers/remove`, {
          headers: {
            "Content-Type": "application/json"
          },
          method: "PUT",
          body: JSON.stringify({
            username: document.getElementById("username").value,
            token: localStorage['token']
          })
        })
        .then(res => res.json())
        .then((res) => {
          if (res.ok) {
            location.href = "/managers"
          }
          if (res.error) {
            this.request = "unauthorized"
          }
        })
      },
      async moveManagers() {
        this.request = 'sending';
        let username = document.getElementById("username").value;

        fetch(`https://gaehivecloset.fizzyizzy.repl.co/db/managers/edit`, {
          headers: {
            "Content-Type": "application/json"
          },
          method: "PUT",
          body: JSON.stringify({
            username: document.getElementById("username").value,
            position: document.getElementById("position").value,
            token: localStorage['token']
          })
        })
        .then(res => res.json())
        .then((res) => {
          if (res.ok) {
            location.href = "/managers"
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
#manage-area {
  background-color: var(--sb);
  border-radius: 20px;
}
</style>