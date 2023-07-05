<template>
  <div class="page" id="page">
    <div id="hostqueue" class="container">
      <div class="queue">
<div  class="queue" id="manage-area">
  <div class="manage" id="manage">
  <h2 class="greeting">Manage</h2>
  <input id="username" class="input" placeholder="username">
    <div>
      <span @click="addManagers()" id="add" class="button">Add</span>
      
    </div>
    <div v-if="request == 'sending'" class="loader"></div>
    <div v-if="request == null" class="loader-placehold"></div>
    <div v-if="request == 'unauthorized'">
      <h4>Uh oh!</h4>
      <span>Looks like you don't have permission to do that.</span>
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
    methods: {
      async addManagers() { 
        this.request = 'sending';
        let useradd = document.getElementById("username").value;


   fetch(`https://gaehivecloset.fizzyizzy.repl.co/hivezine/add`, {
          headers: {
            "Content-Type": "application/json"
          },
          method: "PUT",
          body: JSON.stringify({
            content: document.getElementById("username").value,
            token: localStorage['token']
          })
        })
        .then(res => res.json())
        .then((res) => {
          if (res.ok) {
            location.href = "/hivezine"
          }
          if (res.error) {
            this.request = "unauthorized"
          }
        })
      }
    }
  }
</script>