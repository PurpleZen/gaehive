<template>
  <div class="page" id="page">
  <div id="hostqueue" class="container">
  <div class="queue">
    <div v-if="error"><h3>Error :/</h3></div>
    <div v-if="loading && !error" class="loader"></div>
    <h2 v-if=!loading class="greeting">Our Managers</h2>
    <span v-if=!loading>The Gaehive Scratch studio has around <b style="font-family:serif">{{ this.active }}</b> active managers that help keep the studio a safe and welcoming place for all. Managers rotate the role of Studio Host daily, giving them all opportunities to edit the studio and have some fun!<br>Here you can see the host queue and meet our wonderful managers!</span>
    <router-link v-if="username && manager == 'true'" to="/managers/edit" class="button">Edit Managers</router-link>
    <div v-if=!loading class="break"></div>

    <div v-for="(item, index) in this.hosts">
      
      <div class="users" v-if="index == 0"><a :href="'https://scratch.mit.edu/users/' + item.name" ><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + item.id + '_500x500.png'"><span>{{ item.name }} is currently the host</span></a></div>
      
      <div class="users" v-if="index == 1"><a :href="'https://scratch.mit.edu/users/' + item.name" ><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + item.id + '_500x500.png'"><span>{{ item.name }} will be host next</span></a><div v-if="username && manager == 'true'" @click="moveManagers(item.name)" class="promote"><div class="material-symbols-rounded">stars</div></div></div>
    </div>
    
    <div v-if=!loading class="nexthosts">
      <div class="title">These users will be host following {{ this.nexthost }}:</div>
      <div class="list">
    <div v-for="(item, index) in this.list">
      <div class="users"><a :href="'https://scratch.mit.edu/users/' + item.name"><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + item.id + '_500x500.png'">#{{ index +3 }} {{ item.name }}</a><div v-if="username && manager == 'true'" @click="moveManagers(item.name)" class="promote"><div class="material-symbols-rounded">stars</div></div></div>
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
        error: null,
        hosts: null,
        nexthost: null,
        list: null,
        active: null,
        username: null,
        manager: null
      }
    },
    async mounted() {
      
      this.loading = true

      const usersdata = await fetch('https://gaehivecloset.fizzyizzy.repl.co/db/managers')
      const managers = await usersdata.json()
      this.hosts = managers.slice(0, 2)
      this.list = managers.slice(2, managers.length)

      this.nexthost = this.hosts[1].name
      this.active = this.hosts.length + this.list.length;
      this.loading = false;

      this.username = JSON.parse(localStorage['user']).username.toLowerCase()
      this.manager = JSON.parse(localStorage['user']).manager
    },
    methods: {
      async moveManagers(user) {
        if (confirm("Are you sure you want to make " + user + " host?")) {
        this.request = 'sending';

        fetch(`https://gaehivecloset.fizzyizzy.repl.co/db/managers/edit`, {
          headers: {
            "Content-Type": "application/json"
          },
          method: "PUT",
          body: JSON.stringify({
            username: this.hosts[0].name,
            position: this.active,
            token: localStorage['token']
          })
        })
        .then(res => res.json())
        .then((res) => {

        fetch(`https://gaehivecloset.fizzyizzy.repl.co/db/managers/edit`, {
          headers: {
            "Content-Type": "application/json"
          },
          method: "PUT",
          body: JSON.stringify({
            username: user,
            position: 0,
            token: localStorage['token']
          })
        })
        .then(res => res.json())
        .then((res) => {
          if (res.ok) {
            this.refresh()
            this.request = null
          }
          if (res.error) {
            this.request = "unauthorized"
          }
        })
        })
        }
      },
      async refresh() {
        const usersdata = await fetch('https://gaehivecloset.fizzyizzy.repl.co/db/managers')
        const managers = await usersdata.json()
      this.hosts = managers.slice(0, 2)
      this.list = managers.slice(2, managers.length)

      this.nexthost = this.hosts[1].name
      this.active = this.hosts.length + this.list.length;
      }
    }
  }
</script>

<style scoped>
.users a {
  width: 100%;
  color: var(--txt);
  text-decoration: none;
  align-items: center;
  display: flex;
  padding: 10px;
}
</style>