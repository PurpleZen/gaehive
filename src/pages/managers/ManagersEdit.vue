<template>
  <div class="page" id="page">
    <div id="hostqueue" class="container">
      <div class="queue">
        <h1 v-if=!loading class="greeting">Manage</h1>
    
        <div v-if="loading && !error" class="loader"></div>
        <div v-if=!loading>
          <div class="editList">
            <TransitionGroup name="mng">
            <div v-for="(item, index) in this.managers" :key="item.name">
              <span>
                <a @click="quickSelect(item.name )">{{ item.name }}</a> is at position <b style="font-family:serif">{{ index }}</b>
              </span>
            </div>
            </TransitionGroup>
            <div class="break"></div>
          </div>
          <input id="username" class="input" placeholder="username">
          <input id="position" class="input" placeholder="position">
        </div>
        <div v-if=!loading>
          <span @click="moveManagers()" id="add" class="button">Move</span>
          <span @click="addManagers()" id="add" class="button">Add</span>
          <span @click="removeManagers()" id="remove" class="button">Remove</span>
        </div>
        
        <router-link to="/managers" class="button">View Managers</router-link>
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
        manager: null,
        managers: null
      }
    },
    async mounted() {

      this.loading = true

      if (!localStorage["managers"]) {
        this.noManagerData()
      } else {
        this.getManagerData()

        this.loading = false
      }
    },
    methods: {
      async addManagers() { 
        this.$emit('load')
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
            this.refresh()
            this.$emit('load')
          }
          if (res.error) {
            this.$emit('load')
            this.$emit('error')
          }
        })
      },
      async removeManagers() {
        this.$emit('load')
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
            this.refresh()
            this.$emit('load')
          }
          if (res.error) {
            this.$emit('load')
            this.$emit('error')
          }
        })
      },
      async moveManagers() {
        this.$emit('load')
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
            this.refresh()
            this.$emit('load')
          }
          if (res.error) {
            this.$emit('load')
            this.$emit('error')
          }
        })
      },

      async noManagerData() {
        const usersdata = await fetch('https://gaehivecloset.fizzyizzy.repl.co/db/managers')
        const managers = await usersdata.json()
        localStorage.setItem('managers', JSON.stringify(managers));
        this.getManagerData()
      },
      
      async getManagerData() {
        this.managers = JSON.parse(localStorage["managers"])
        this.refresh()
      },
      
      quickSelect(user) {
        document.getElementById("username").value = user;
        document.getElementById("position").select()
      },
      async refresh() {
        const usersdata = await fetch('https://gaehivecloset.fizzyizzy.repl.co/db/managers')
        this.managers = await usersdata.json()
        localStorage.setItem('managers', JSON.stringify(this.managers))
        document.getElementById("username").value = ""
        document.getElementById("position").value = ""
      }
    }
  }
</script>

<style scoped>
#username {
  border-radius: 20px 0 0 20px;
}

#position {
  border-radius: 0 20px 20px 0;
  width: 80px;
}
</style>