<template>
  <div class="page" id="page">
  <div id="hostqueue" class="container">
  <div class="queue">
    <div v-if="error"><h3>Error :/</h3></div>
    <div v-if="loading && !error" class="loader"></div>
    <h2 class="greeting">Our Managers</h2>
    <span v-if=!loading>The Gaehive Scratch studio has around <b style="font-family:serif">{{ this.active }}</b> active managers that help keep the studio a safe and welcoming place for all. Managers rotate the role of Studio Host daily, giving them all opportunities to edit the studio and have some fun!<br>Here you can see the host queue and meet our wonderful managers!</span>
    <router-link v-if="username && manager == 'true'" to="/managers/edit" class="button">Edit Managers</router-link>
    <div v-if=!loading class="break"></div>

    <div v-for="(item, index) in this.hosts">
      <a :href="'https://scratch.mit.edu/users/' + item.name" class="users" v-if="index == 0"><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + item.id + '_500x500.png'"><span>{{ item.name }} is currently the host</span></a>
      <a :href="'https://scratch.mit.edu/users/' + item.name" class="users" v-if="index == 1"><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + item.id + '_500x500.png'"><span>{{ item.name }} will be host next</span></a>
    </div>
    
    <div v-if=!loading class="nexthosts">
      <div class="title">These users will be host following {{ this.nexthost }}:</div>
      <div class="list">
    <div v-for="(item, index) in this.list">
      <a :href="'https://scratch.mit.edu/users/' + item.name" class="users"><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + item.id + '_500x500.png'">#{{ index +3 }} {{ item.name }}</a>
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
    }
  }
</script>

<style scoped>
a.users {
  color: var(--txt);
  text-decoration: none;
}
</style>