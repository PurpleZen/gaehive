<template>
  <div class="page" id="page">
  <div id="hostqueue" class="container">
  <div class="queue">
    <div v-if="error"><h3>Error :/</h3></div>
    <div v-if="loading && !error" class="loader"></div>
    <h2 class="greeting">Host Queue</h2>
    
    <div v-show="!loading" id="currnext" class="currnext">
      <div v-show="!loading" id="host" class="host">
      </div>
      <div v-show="!loading" id="nexthost" class="nexthost">
      </div>
    </div>

  </div>
  </div>

  <div id="listqueue" class="container">
  <div class="queue">
    <div v-show="!loading" id="nextlist" class="nextlist">
    </div>
    
  </div>
  </div>

  <div v-show="username && manager == 'true'" class="queue" id="manage-area">
  <div class="manage" id="manage">
  <h2 class="greeting">Manage</h2>
  <input id="username" class="input" placeholder="username">
    <div>
      <span @click="makeHost()" id="add" class="button">Host</span>
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
      
      if (!this.val1) {
        this.loading = true

        const usersdata = await fetch('https://gaehivecloset.fizzyizzy.repl.co/db/managers')
        const managers = await usersdata.json()

        const cloud = await fetch('https://gaehivecloset.fizzyizzy.repl.co/db/queue');
        const queue = await cloud.json();

        for ( var i = 0; i < queue.data.length; i++ ) {
          var item = queue.data[i]
          const para = document.createElement("p");
          para.classList.add("user");
          const image = "<img src='https://uploads.scratch.mit.edu/get_image/user/" + managers[item].id + "_500x500.png'>";
          const username = "<a class='user' href='https://scratch.mit.edu/users/" + managers[item].name + "'>" + managers[item].name + '</a>';
          para.innerHTML = image + username;
          if (i == 0) {
            para.innerHTML = image + "<div class='hostinfo'>" + username + "<p class='status'>current host</p></div>"
            document.getElementById("host").appendChild(para);
          } else if (i == 1) {
            para.innerHTML = image + "<div class='hostinfo'>" + username + "<p class='status'>next host</p></div>"
          document.getElementById("nexthost").appendChild(para);
          } else {
            document.getElementById("nextlist").appendChild(para);
          }
        }

        this.loading = false

	    }
      this.username = JSON.parse(localStorage['user']).username.toLowerCase()
      this.manager = JSON.parse(localStorage['user']).manager

      if (this.manager == "true") {
        document.getElementById("page").style["grid-template-columns"] = "none"
      }
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
            location.href = "/host-queue"
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
            location.href = "/host-queue"
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
.page {
  display: grid;
  grid-template-areas:
    'currnext nextlist manage';
  grid-template-columns: repeat(2, 1fr);
}

#hostqueue {
  grid-area: currnext;
}

#listqueue {
  grid-area: nextlist;
}

#manage {
  width: min-content;
  grid-area: manage;
  text-align: center;
}

#manage-area {
  background-color: var(--sb);
  border-radius: 20px;
}

@media screen and (max-width: 800px) {
  .page {
    display: block;
  }
}
</style>