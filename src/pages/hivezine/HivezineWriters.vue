<template>
  <div class="page" id="page">
    <div id="hostqueue" class="container">
      <div class="queue">
        <h1 v-if=!loading class="greeting">Writers</h1>
    
        <div v-if="loading && !error" class="loader"></div>
        <div v-if=!loading>
          <div class="editList">
            <TransitionGroup name="mng">
            <div v-for="(item, index) in this.writers" :key="item.name">
              <span>
                <a @click="quickSelect(item.name )">{{ item.name }}</a>
              </span>
            </div>
            </TransitionGroup>
            <div class="break"></div>
          </div>
          <input id="usernamehz" class="input" placeholder="username">
        </div>
        <div v-if=!loading>
          <span @click="addWriters()" id="add" class="button">Add</span>
          <span @click="removeWriters()" id="remove" class="button">Remove</span>
        </div>
        
        <router-link to="/hivezine" class="button">View Hivezine</router-link>
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
        writers: null
      }
    },
    async mounted() {

      this.loading = true

      if (!localStorage["writers"]) {
        this.noWriterData()
      } else {
        this.getWriterData()

        this.loading = false
      }
    },
    methods: {
      async addWriters() { 
        this.$emit('load')
        let useradd = document.getElementById("usernamehz").value;

   fetch(`https://gaehivecloset.fizzyizzy.repl.co/db/managers/add`, {
          headers: {
            "Content-Type": "application/json"
          },
          method: "PUT",
          body: JSON.stringify({
            username: document.getElementById("usernamehz").value,
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
      async removeWriters() {
        this.$emit('load')
        let username = document.getElementById("usernamehz").value;

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

      async noWriterData() {
        const usersdata = await fetch('https://gaehivecloset.fizzyizzy.repl.co/hivezine/writers')
        const writers = await usersdata.json()
        localStorage.setItem('writers', JSON.stringify(writers));
        this.getWriterData()
      },
      
      async getWriterData() {
        this.writers = JSON.parse(localStorage["writers"])
        this.refresh()
      },
      
      quickSelect(user) {
        document.getElementById("usernamehz").value = user;
      },
      async refresh() {
        const usersdata = await fetch('https://gaehivecloset.fizzyizzy.repl.co/hivezine/writers')
        this.writers = await usersdata.json()
        localStorage.setItem('writers', JSON.stringify(this.writers))
        document.getElementById("usernamehz").value = ""
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