<template>
  <div class="page">
  <div id="hostqueue" class="container">
  <div id="q" class="queue">
    
    <div v-show="!loading" id="currnext" class="currnext">
      <div v-show="!loading" id="host" class="host">
      </div>
      <div v-show="!loading" id="nexthost" class="nexthost">
      </div>
    </div>
    <div v-if="error"><h3>Error :/</h3></div>
    <div v-if="loading && !error" class="loader"></div>
  </div>
  </div>

  <div id="listqueue" class="container">
  <div id="q" class="queue">
    <div v-show="!loading" id="nextlist" class="nextlist">
    </div>
    <div v-if="error"><h3>Error :/</h3></div>
    <div v-if="loading && !error" class="loader"></div>
    
  </div>
  </div>
  </div>


<div v-show="username && manager == 'true'" class="login">
      <div class="row center-align">
        <h5>Add Managers</h5>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="username" name="username" type="text" class="validate">
          <label for="username" id="username">Username</label>
        </div>
        <div class="input-field col s12">
          <a @click="addManagers()" id="add" class="waves-effect waves-light btn">Add</a>
          <a @click="removeManagers()" id="remove" type="submit" value="remove" class="waves-effect waves-light btn">Remove</a>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: null,
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
          const image = "<img src='https://uploads.scratch.mit.edu/get_image/user/" + managers[item].id + "_500x500.png' alt='" + managers[item].name + "&#39;s profile picture'>";
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
    },
    methods: {
      async addManagers() { 
                let useradd = document.getElementById("username").value;

        
      const userinfo = await fetch('https://scratchdb.lefty.one/v3/user/info/' + useradd);

        const data = await userinfo.json();

          const id = data.id;


   fetch(`https://gaehivecloset.fizzyizzy.repl.co/db/managers/add`, {
          headers: {
            "Content-Type": "application/json"
          },
          method: "PUT",
          body: JSON.stringify({
            username: document.getElementById("username").value,
            id: id
          })
        })
        .then(res => res.json())
        .then((res) => {
          if (res.ok) {
            location.href = "/host-queue"
          }
        })
      },
      async removeManagers() {
        let username = document.getElementById("username").value;

        fetch(`https://gaehivecloset.fizzyizzy.repl.co/db/managers/remove`, {
          headers: {
            "Content-Type": "application/json"
          },
          method: "PUT",
          body: JSON.stringify({
            username: document.getElementById("username").value,
          })
        })
        .then(res => res.json())
        .then((res) => {
          if (res.ok) {
            location.href = "/host-queue"
          }
        })
      }
    }
  }
</script>

<style scoped>
.page {
  display: grid;
  grid-template:
    'currnext nextlist';
  grid-template-columns: repeat(2, 1fr);
}

#hostqueue {
  grid-area: currnext;
}

#listqueue {
  grid-area: nextlist;
}

@media screen and (max-width: 800px) {
  .page {
    display: block;
  }
}
</style>