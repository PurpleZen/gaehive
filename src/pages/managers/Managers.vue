<template>
  <div class="page" id="page">
    <div id="hostqueue" class="container">
      <div class="queue">
        <div v-if="loading" class="loader"></div>
        <h1 v-if=!loading class="greeting">Our Managers</h1>
        <span v-if=!loading>The Gaehive Scratch studio has around <b @click.right="this.secret()" style="font-family:serif">{{ this.active }}</b> active managers that help keep the studio a safe and welcoming place for all. Managers rotate the role of Studio Host daily, giving them all opportunities to edit the studio and have some fun!<br>Here you can see the host queue and meet our wonderful managers!<b v-if="username && manager == 'true' || admin == 'true'"><br>Managers: You can click the star button on users to make them show as the current host!</b></span>
        
        <router-link v-if="username && manager == 'true' || admin == 'true'" to="/managers/edit" class="button">Edit Managers</router-link>
        <div v-if=!loading class="break"></div>
        <TransitionGroup name="mng">
        <div v-for="(item, index) in this.hosts" :key="item.name">
          <div class="users" v-if="index == 0"><a :href="'https://scratch.mit.edu/users/' + item.name" ><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + item.id + '_500x500.png'"><span>{{ item.name }} is currently host</span></a></div>
      
          <div class="users" v-if="index == 1"><a :href="'https://scratch.mit.edu/users/' + item.name" ><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + item.id + '_500x500.png'"><span>{{ item.name }} will host next</span></a><div v-if="username && manager == 'true' || admin == 'true'" @click="moveManagers(item.name)" class="promote"><div class="material-symbols-rounded">stars</div></div></div>
        </div>
        </TransitionGroup>
    
        <div v-if=!loading class="nexthosts">
          <div class="title">These users will be host following {{ this.nexthost }}:</div>
          <div class="list">
            <TransitionGroup name="mng">
            <div v-for="(item, index) in this.list" :key="item.name">
              <div class="users"><a :href="'https://scratch.mit.edu/users/' + item.name"><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + item.id + '_500x500.png'"><span>#{{ index +3 }} {{ item.name }}</span></a><div v-if="username && manager == 'true' || admin == 'true'" @click="moveManagers(item.name)" class="promote"><div class="material-symbols-rounded">stars</div></div>
              </div>
            </div>
            </TransitionGroup>
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
        hosts: null,
        nexthost: null,
        list: null,
        active: null,
        username: null,
        admin: null,
        manager: null
      }
    },
    
    async mounted() {
      
      this.loading = true

      if (localStorage['user']) {
        this.username = JSON.parse(localStorage['user']).username.toLowerCase()
        this.manager = JSON.parse(localStorage['user']).manager
        this.admin = JSON.parse(localStorage['user']).admin
      }

      if (!localStorage["managers"]) {
        this.noManagerData()
      } else {
      this.getManagerData()
      }
    },
    
    methods: {
      async noManagerData() {
        const usersdata = await fetch('/gaehivecloset-legacy/managers.json')
        const managers = await usersdata.json()
        localStorage.setItem('managers', JSON.stringify(managers));
        this.getManagerData()
      },
      
      async getManagerData() {
        const managers = JSON.parse(localStorage["managers"])
        this.hosts = managers.slice(0, 2)
        this.list = managers.slice(2, managers.length)

        this.nexthost = this.hosts[1].name
        this.active = this.hosts.length + this.list.length;
        this.loading = false;
      
        this.refresh()
      },
      
      async moveManagers(user) {
        if (confirm("Are you sure you want to make " + user + " host?")) {
        this.$emit('load')

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
              this.$emit('load')
            }
            if (res.error) {
              this.$emit('load')
              this.$emit('error')
            }
          })
        })}
      },
      
      async refresh() {
        const usersdata = await fetch('https://gaehivecloset.fizzyizzy.repl.co/db/managers')
        const managers = await usersdata.json()
        localStorage.setItem('managers', JSON.stringify(managers))
        this.hosts = managers.slice(0, 2)
        this.list = managers.slice(2, managers.length)

        this.nexthost = this.hosts[1].name
        this.active = this.hosts.length + this.list.length;
      },
      secret() {
        var imgs = document.querySelectorAll("img");
imgs.forEach(function(img) {
   img.setAttribute('src', "/hambroger.jpg");
});
      }
    }
  }
</script>